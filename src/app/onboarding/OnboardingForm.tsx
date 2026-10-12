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
      setErrorMsg('O nome da empresa deve ter pelo menos 2 caracteres.')
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
        setErrorMsg('Já existe uma empresa com esse nome. Tente um nome diferente.')
      } else {
        setErrorMsg('Não foi possível criar a organização. Tente novamente.')
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
          <CardTitle className="text-2xl text-white">Bem-vindo ao GetDashia</CardTitle>
          <CardDescription className="text-zinc-400">
            Para começar, informe o nome da empresa ou cliente que você vai gerenciar.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-zinc-300 mb-1 block">
                Nome da empresa
              </label>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="Ex.: Loja da Maria"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
              />
              {slug && (
                <p className="text-zinc-500 text-xs mt-1">
                  Identificador: <span className="text-zinc-400">{slug}</span>
                </p>
              )}
            </div>

            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

            <Button
              type="submit"
              disabled={loading || companyName.trim().length < 2}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
            >
              {loading ? 'Criando...' : 'Criar e ir para o painel'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
