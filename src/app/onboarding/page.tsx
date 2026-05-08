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

export default function OnboardingPage() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const slug = gerarSlug(nome)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    if (nome.trim().length < 2) {
      setErro('O nome da empresa deve ter pelo menos 2 caracteres.')
      return
    }

    setCarregando(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { error } = await supabase
      .from('organizations')
      .insert({ name: nome.trim(), slug, owner_id: user.id })

    if (error) {
      if (error.code === '23505') {
        setErro('Já existe uma empresa com esse nome. Tente um nome diferente.')
      } else {
        setErro('Não foi possível criar a empresa. Tente novamente.')
      }
      setCarregando(false)
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
            Para começar, diga o nome da empresa ou cliente que você vai gerenciar.
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
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Ex: Loja da Maria"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
              />
              {slug && (
                <p className="text-zinc-500 text-xs mt-1">
                  Identificador: <span className="text-zinc-400">{slug}</span>
                </p>
              )}
            </div>

            {erro && <p className="text-red-400 text-sm">{erro}</p>}

            <Button
              type="submit"
              disabled={carregando || nome.trim().length < 2}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
            >
              {carregando ? 'Criando...' : 'Criar e entrar no painel'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
