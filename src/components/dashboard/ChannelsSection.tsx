import type { IconType } from 'react-icons'
import { SiGoogleads, SiMeta, SiFacebook, SiInstagram, SiTiktok } from 'react-icons/si'

interface Channel {
  name: string
  icon: IconType
  color: string
  active: boolean
}

const channels: Channel[] = [
  { name: 'Google Ads', icon: SiGoogleads, color: '#4285F4', active: true },
  { name: 'Meta Ads',   icon: SiMeta,      color: '#0082FB', active: false },
  { name: 'Facebook',   icon: SiFacebook,  color: '#1877F2', active: false },
  { name: 'Instagram',  icon: SiInstagram, color: '#E1306C', active: false },
  { name: 'TikTok',     icon: SiTiktok,    color: '#FF0050', active: false },
]

export default function ChannelsSection() {
  return (
    <div className="mt-6">
      <p className="text-sm font-medium text-zinc-300 mb-3">Canais</p>
      <div className="flex flex-wrap gap-3">
        {channels.map(({ name, icon: Icon, color, active }) => (
          <div
            key={name}
            className={`flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 transition ${
              active ? '' : 'opacity-40'
            }`}
          >
            <Icon color={active ? color : '#71717a'} size={20} />
            <span className="text-sm font-medium text-zinc-200">{name}</span>
            {active ? (
              <span className="text-xs font-semibold bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full">
                Ativo
              </span>
            ) : (
              <span className="text-xs font-semibold bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">
                Em breve
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
