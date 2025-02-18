import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Force the route to render dynamically
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      // Attempt to exchange the code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error; // Throw error if there is an issue
    } catch (error: any) {
      console.error('Error exchanging code for session:', error.message);
      // Optionally, redirect to an error page or show a message
      return NextResponse.redirect(new URL('/auth/error', request.url));
    }
  }

  // Redirect to the dashboard after successful session exchange
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
