'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

type Estado = 'carregando' | 'valido' | 'invalido'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [estado, setEstado] = useState<Estado>('carregando')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (!code) {
      setEstado('invalido')
      return
    }

    const supabase = createClient()
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        setEstado('invalido')
      } else {
        setEstado('valido')
        // Remove o code da URL sem recarregar a página
        window.history.replaceState({}, '', '/auth/reset-password')
      }
    })
  }, [])

  async function handleRedefinir(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    setCarregando(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: senha })

    if (error) {
      setErro('Não foi possível redefinir a senha. Tente solicitar um novo link.')
      setCarregando(false)
      return
    }

    router.push('/login')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Criar nova senha</CardTitle>
          <CardDescription className="text-zinc-400">
            {estado === 'carregando' && 'Verificando link...'}
            {estado === 'valido' && 'Escolha uma senha segura para sua conta GetDashia.'}
            {estado === 'invalido' && 'Link inválido ou expirado.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {estado === 'carregando' && (
            <p className="text-zinc-400 text-sm">Aguarde...</p>
          )}

          {estado === 'invalido' && (
            <div className="flex flex-col gap-4">
              <p className="text-zinc-300 text-sm">
                Este link de redefinição não é válido ou já expirou. Solicite um novo link para continuar.
              </p>
              <Button
                onClick={() => router.push('/esqueci-senha')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              >
                Solicitar novo link
              </Button>
            </div>
          )}

          {estado === 'valido' && (
            <form onSubmit={handleRedefinir} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-zinc-300 mb-1 block">Nova senha</label>
                <Input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  placeholder="Mínimo 6 caracteres"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-300 mb-1 block">Confirmar nova senha</label>
                <Input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                  placeholder="Repita a senha"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                />
              </div>

              {erro && <p className="text-red-400 text-sm">{erro}</p>}

              <Button
                type="submit"
                disabled={carregando}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              >
                {carregando ? 'Salvando...' : 'Salvar nova senha'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
