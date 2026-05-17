import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Lead } from '@/lib/models/Lead'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, interest, message } = body

    if (!name || !email) {
      return Response.json({ error: 'Nombre y email son requeridos' }, { status: 400 })
    }

    await connectDB()
    const lead = await Lead.create({ name, email, phone, interest, message })

    return Response.json({ ok: true, id: lead._id }, { status: 201 })
  } catch (err) {
    console.error('Error al guardar lead:', err)
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const leads = await Lead.find().sort({ createdAt: -1 })
    return Response.json(leads)
  } catch (err) {
    console.error('Error al obtener leads:', err)
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
