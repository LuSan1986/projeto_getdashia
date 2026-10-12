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
      setErrorMsg('Não foi possível enviar o e-mail. Verifique o endereço e tente novamente.')
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
          <CardTitle className="text-2xl text-white">Esqueci minha senha</CardTitle>
          <CardDescription className="text-zinc-400">
            {sent
              ? 'Verifique seu e-mail para continuar.'
              : 'Informe seu e-mail para receber o link de redefinição.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {sent ? (
            <div className="flex flex-col gap-4">
              <p className="text-zinc-300 text-sm">
                Enviamos um link de redefinição de senha para{' '}
                <span className="text-indigo-400 font-medium">{email}</span>. Acesse seu e-mail e
                clique no link para criar uma nova senha.
              </p>
              <p className="text-zinc-500 text-xs">
                Não recebeu? Verifique sua pasta de spam ou{' '}
                <button
                  onClick={() => setSent(false)}
                  className="text-indigo-400 hover:underline"
                >
                  tente novamente
                </button>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-zinc-300 mb-1 block">E-mail</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                />
              </div>

              {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              >
                {loading ? 'Enviando...' : 'Enviar link de redefinição'}
              </Button>
            </form>
          )}

          <p className="text-zinc-500 text-sm mt-6 text-center">
            Lembrou sua senha?{' '}
            <Link href="/login" className="text-indigo-400 hover:underline">
              Voltar para o login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
