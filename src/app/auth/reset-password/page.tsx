'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

type State = 'loading' | 'valid' | 'invalid'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [state,           setState]           = useState<State>('loading')
  const [password,        setPassword]        = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg,        setErrorMsg]        = useState('')
  const [loading,         setLoading]         = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('session:', JSON.stringify(session))
      setState(session ? 'valid' : 'invalid')
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.updateUser({ password })

    if (authError) {
      console.error('updateUser error:', JSON.stringify(authError))
      setErrorMsg('Could not reset password. Please request a new link.')
      setLoading(false)
      return
    }

    router.push('/login')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Create new password</CardTitle>
          <CardDescription className="text-zinc-400">
            {state === 'loading' && 'Checking session...'}
            {state === 'valid'   && 'Choose a secure password for your GetDashia account.'}
            {state === 'invalid' && 'Invalid or expired link.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {state === 'loading' && (
            <p className="text-zinc-400 text-sm">Please wait...</p>
          )}

          {state === 'invalid' && (
            <div className="flex flex-col gap-4">
              <p className="text-zinc-300 text-sm">
                This reset link is invalid or has expired. Request a new link to continue.
              </p>
              <Button
                onClick={() => router.push('/esqueci-senha')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              >
                Request new link
              </Button>
            </div>
          )}

          {state === 'valid' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-zinc-300 mb-1 block">New password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimum 6 characters"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-300 mb-1 block">Confirm new password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat password"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                />
              </div>

              {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              >
                {loading ? 'Saving...' : 'Save new password'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
