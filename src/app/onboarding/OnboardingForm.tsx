'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

function gerarSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function OnboardingForm() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState('')
  const [errorMsg,    setErrorMsg]    = useState('')
  const [loading,     setLoading]     = useState(false)

  const slug = gerarSlug(companyName)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (companyName.trim().length < 2) {
      setErrorMsg('Company name must be at least 2 characters.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { error: dbError } = await supabase
      .from('organizations')
      .insert({ name: companyName.trim(), slug, owner_id: user.id })

    if (dbError) {
      if (dbError.code === '23505') {
        setErrorMsg('A company with this name already exists. Please try a different name.')
      } else {
        setErrorMsg('Could not create the organization. Please try again.')
      }
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Welcome to GetDashia</CardTitle>
          <CardDescription className="text-zinc-400">
            To get started, enter the name of the company or client you&apos;ll manage.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-zinc-300 mb-1 block">
                Company name
              </label>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="E.g.: Maria's Store"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
              />
              {slug && (
                <p className="text-zinc-500 text-xs mt-1">
                  Identifier: <span className="text-zinc-400">{slug}</span>
                </p>
              )}
            </div>

            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

            <Button
              type="submit"
              disabled={loading || companyName.trim().length < 2}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
            >
              {loading ? 'Creating...' : 'Create and go to dashboard'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
