'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function EsqueciSenhaPage() {
  const [email,    setEmail]    = useState('')
  const [sent,     setSent]     = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.NEXT_PUBLIC_SITE_URL + '/auth/reset-password',
    })

    if (authError) {
      setErrorMsg('Could not send the email. Please check the address and try again.')
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Forgot my password</CardTitle>
          <CardDescription className="text-zinc-400">
            {sent
              ? 'Check your email to continue.'
              : 'Enter your email to receive the reset link.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {sent ? (
            <div className="flex flex-col gap-4">
              <p className="text-zinc-300 text-sm">
                We sent a password reset link to{' '}
                <span className="text-indigo-400 font-medium">{email}</span>. Access your email and
                click the link to create a new password.
              </p>
              <p className="text-zinc-500 text-xs">
                Didn&apos;t receive it? Check your spam folder or{' '}
                <button
                  onClick={() => setSent(false)}
                  className="text-indigo-400 hover:underline"
                >
                  try again
                </button>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-zinc-300 mb-1 block">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                />
              </div>

              {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              >
                {loading ? 'Sending...' : 'Send reset link'}
              </Button>
            </form>
          )}

          <p className="text-zinc-500 text-sm mt-6 text-center">
            Remembered your password?{' '}
            <Link href="/login" className="text-indigo-400 hover:underline">
              Back to sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
