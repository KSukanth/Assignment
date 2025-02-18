'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true); // New loading state for session checking

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    setSessionLoading(true); // Set session loading to true
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        router.push('/auth/login');
        return;
      }
      getProfile(data.session.user.id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSessionLoading(false); // End session loading
    }
  }

  async function getProfile(userId: string) {
    setLoading(true); // Set profile loading to true
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false); // End profile loading
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/auth/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>Sign out</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal information and profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback>{profile?.full_name?.[0] || profile?.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{profile?.full_name || 'No name set'}</h2>
                <p className="text-muted-foreground">{profile?.email}</p>
              </div>
            </div>
            <Button onClick={() => router.push('/settings')}>Edit Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
