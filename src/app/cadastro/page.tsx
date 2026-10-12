'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import Link from 'next/link'

export default function CadastroPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [success,  setSuccess]  = useState(false)
  const [loading,  setLoading]  = useState(false)

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `https://www.getdashia.com.br/auth/callback`,
      },
    })

    if (authError) {
      setErrorMsg(authError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
        <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 border border-zinc-800 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Verifique seu e-mail</h1>
          <p className="text-zinc-400 text-sm">
            Enviamos um link de confirmação para <span className="text-white">{email}</span>. Clique nele para ativar sua conta.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
        <h1 className="text-2xl font-bold text-white mb-2">Criar conta</h1>
        <p className="text-zinc-400 mb-6 text-sm">Comece a usar o GetDashia gratuitamente</p>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-zinc-300 mb-1 block">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300 mb-1 block">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="text-zinc-500 text-sm mt-6 text-center">
          Já tem conta?{' '}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  )
}
