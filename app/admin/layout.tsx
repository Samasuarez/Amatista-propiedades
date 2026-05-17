import type { Metadata } from 'next'
import AdminSidebar from './components/AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin — Amatista',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f0f1a] flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
