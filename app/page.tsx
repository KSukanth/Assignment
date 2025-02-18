import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, UserPlus, Key } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            Secure Authentication System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A robust and secure authentication system built with Next.js and Supabase,
            featuring JWT tokens, secure password handling, and protected routes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/auth/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Shield className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Secure by Design</CardTitle>
              <CardDescription>
                Built with security best practices including JWT tokens, HTTP-only cookies,
                and protected routes.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <UserPlus className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Easy Registration</CardTitle>
              <CardDescription>
                Simple and intuitive registration process with email verification
                and password recovery.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Key className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Protected Resources</CardTitle>
              <CardDescription>
                Secure access to protected routes and resources with middleware
                and role-based permissions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}