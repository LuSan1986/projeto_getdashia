import { SiGoogleads, SiFacebook, SiTiktok } from 'react-icons/si'
import type { ReactNode } from 'react'

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-bg" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor="#f09433" />
          <stop offset="25%"  stopColor="#e6683c" />
          <stop offset="50%"  stopColor="#dc2743" />
          <stop offset="75%"  stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#ig-bg)" />
      <rect x="7" y="7" width="10" height="10" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2.5" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="white" />
    </svg>
  )
}

interface Channel {
  name: string
  renderIcon: () => ReactNode
  active: boolean
}

const channels: Channel[] = [
  { name: 'Google Ads', renderIcon: () => <SiGoogleads color="#4285F4" size={20} />, active: true  },
  { name: 'Instagram',  renderIcon: () => <InstagramIcon />,                          active: false },
  { name: 'Facebook',   renderIcon: () => <SiFacebook  color="#1877F2" size={20} />, active: false },
  { name: 'TikTok',     renderIcon: () => <SiTiktok    color="#FF0050" size={20} />, active: false },
]

export default function ChannelsSection() {
  return (
    <div className="mt-6">
      <p className="text-sm font-medium text-zinc-300 mb-3">Canais</p>
      <div className="flex flex-wrap gap-3">
        {channels.map(({ name, renderIcon, active }) => (
          <div
            key={name}
            className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 transition"
          >
            {renderIcon()}
            <span className="text-sm font-medium text-zinc-200">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
