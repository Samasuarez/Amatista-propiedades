export const dynamic = 'force-dynamic'

import { connectDB } from '@/lib/mongodb'
import { Lead } from '@/lib/models/Lead'

async function getLeads() {
  await connectDB()
  const leads = await Lead.find().sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(leads))
}

export default async function LeadsPage() {
  const leads = await getLeads()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">Consultas recibidas</h1>
        <p className="text-white/40 text-sm mt-1">{leads.length} consulta{leads.length !== 1 ? 's' : ''} en total</p>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-white/30 text-lg">Aún no hay consultas</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead: any) => (
            <div
              key={lead._id}
              className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-white font-semibold">{lead.name}</span>
                    {lead.interest && (
                      <span className="bg-amatista/20 text-amatista-light text-xs px-2.5 py-1 rounded-full">
                        {lead.interest}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 text-white/50 text-sm flex-wrap">
                    <span>✉️ {lead.email}</span>
                    {lead.phone && <span>📞 {lead.phone}</span>}
                  </div>
                  {lead.message && (
                    <p className="text-white/40 text-sm mt-3 border-t border-white/8 pt-3">
                      {lead.message}
                    </p>
                  )}
                </div>
                <time className="text-white/30 text-xs whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
