import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { sendWelcomeEmail } from '@/lib/emails/welcome'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  if (token_hash && type) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.verifyOtp({ type, token_hash })

    // DIAG 1: verifyOtp result
    console.log('[auth/confirm] verifyOtp — type:', type, '| error:', error ?? 'null')

    if (!error) {
      // Send welcome email only on new account confirmation, not on password recovery
      if (type === 'signup') {
        const { data: { user } } = await supabase.auth.getUser()

        // DIAG 2: getUser result
        console.log('[auth/confirm] getUser — user exists:', !!user, '| email:', user?.email ?? 'undefined')

        if (user?.email) {
          // DIAG 3: about to call Resend
          console.log('[auth/confirm] Prestes a enviar welcome email para:', user.email)

          sendWelcomeEmail(user.email).catch((err) => {
            // DIAG 4: catch block reached
            console.log('[auth/confirm] catch executado')
            console.error('[auth/confirm] welcome email failed:', err)
          })
        }
      }

      const redirectTo = type === 'recovery' ? '/auth/reset-password' : '/dashboard'
      return NextResponse.redirect(`${origin}${redirectTo}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?erro=confirmacao`)
}