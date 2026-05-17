'use client'

import { usePathname, useRouter } from 'next/navigation'

const links = [
  { href: '/admin/leads', label: 'Consultas', icon: '📩' },
  { href: '/admin/propiedades', label: 'Propiedades', icon: '🏔️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-60 bg-charcoal border-r border-white/8 flex flex-col min-h-screen">
      <div className="px-6 py-7 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <span className="text-amatista-light text-2xl">◈</span>
          <div>
            <p className="text-white font-bold text-sm">Amatista</p>
            <p className="text-white/40 text-xs">Panel admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((l) => {
          const active = pathname.startsWith(l.href)
          return (
            <a
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-amatista text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{l.icon}</span>
              {l.label}
            </a>
          )
        })}
      </nav>

      <div className="px-3 pb-6">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors mb-1"
        >
          <span>🌐</span> Ver sitio
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors"
        >
          <span>🚪</span> Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
