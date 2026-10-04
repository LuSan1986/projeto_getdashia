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
      className="mt-4 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-400 hover:opacity-90 px-5 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
    >
      {loading ? 'Saving…' : 'Save changes'}
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
        setNameMsg(json.error ?? 'Unknown error')
      } else {
        setNameOk(true)
        setNameMsg('Profile updated successfully.')
      }
    } catch {
      setNameOk(false)
      setNameMsg('Connection error. Please try again.')
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
        setOrgMsg(json.error ?? 'Unknown error')
      } else {
        setOrgOk(true)
        setOrgMsg('Organization updated successfully.')
      }
    } catch {
      setOrgOk(false)
      setOrgMsg('Connection error. Please try again.')
    } finally {
      setOrgLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage your personal and organization details</p>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-zinc-100">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">Full name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-zinc-950 border-zinc-700 text-zinc-100 placeholder-zinc-600 focus-visible:ring-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">Email</label>
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

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-zinc-100">Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOrgSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">Company name</label>
                <Input
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="Your company name"
                  className="bg-zinc-950 border-zinc-700 text-zinc-100 placeholder-zinc-600 focus-visible:ring-cyan-500"
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
