'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Props {
  fullName: string
  email: string
  orgName: string
}

function SaveButton({ loading, disabled }: { loading: boolean; disabled: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="mt-4 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
    >
      {loading ? 'Salvando…' : 'Salvar alterações'}
    </button>
  )
}

function Feedback({ msg, ok }: { msg: string; ok: boolean }) {
  if (!msg) return null
  return (
    <p className={`mt-2 text-xs ${ok ? 'text-green-400' : 'text-red-400'}`}>{msg}</p>
  )
}

export default function ConfiguracoesClient({ fullName, email, orgName }: Props) {
  const [name,        setName]        = useState(fullName)
  const [nameLoading, setNameLoading] = useState(false)
  const [nameMsg,     setNameMsg]     = useState('')
  const [nameOk,      setNameOk]      = useState(false)

  const [org,        setOrg]        = useState(orgName)
  const [orgLoading, setOrgLoading] = useState(false)
  const [orgMsg,     setOrgMsg]     = useState('')
  const [orgOk,      setOrgOk]      = useState(false)

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault()
    setNameMsg('')
    setNameLoading(true)
    try {
      const res  = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name }),
      })
      const json = await res.json()
      if (!res.ok) {
        setNameOk(false)
        setNameMsg(json.error ?? 'Erro desconhecido')
      } else {
        setNameOk(true)
        setNameMsg('Perfil atualizado com sucesso.')
      }
    } catch {
      setNameOk(false)
      setNameMsg('Erro de conexão. Tente novamente.')
    } finally {
      setNameLoading(false)
    }
  }

  async function handleOrgSave(e: React.FormEvent) {
    e.preventDefault()
    setOrgMsg('')
    setOrgLoading(true)
    try {
      const res  = await fetch('/api/organization/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: org }),
      })
      const json = await res.json()
      if (!res.ok) {
        setOrgOk(false)
        setOrgMsg(json.error ?? 'Erro desconhecido')
      } else {
        setOrgOk(true)
        setOrgMsg('Organização atualizada com sucesso.')
      }
    } catch {
      setOrgOk(false)
      setOrgMsg('Erro de conexão. Tente novamente.')
    } finally {
      setOrgLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <p className="text-zinc-500 text-sm mt-1">Gerencie seus dados pessoais e da empresa</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Perfil */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-zinc-100">Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">Nome completo</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="bg-zinc-950 border-zinc-700 text-zinc-100 placeholder-zinc-600 focus-visible:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">E-mail</label>
                <Input
                  value={email}
                  disabled
                  className="bg-zinc-950 border-zinc-700 text-zinc-500 cursor-not-allowed"
                />
              </div>
              <SaveButton loading={nameLoading} disabled={!name.trim()} />
              <Feedback msg={nameMsg} ok={nameOk} />
            </form>
          </CardContent>
        </Card>

        {/* Organização */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-zinc-100">Organização</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOrgSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">Nome da empresa</label>
                <Input
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="Nome da sua empresa"
                  className="bg-zinc-950 border-zinc-700 text-zinc-100 placeholder-zinc-600 focus-visible:ring-indigo-500"
                />
              </div>
              <SaveButton loading={orgLoading} disabled={!org.trim()} />
              <Feedback msg={orgMsg} ok={orgOk} />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
