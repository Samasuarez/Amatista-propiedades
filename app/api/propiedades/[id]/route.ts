import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Property } from '@/lib/models/Property'

export async function PATCH(req: NextRequest, ctx: RouteContext<'/api/propiedades/[id]'>) {
  try {
    const { id } = await ctx.params
    const body = await req.json()

    await connectDB()
    const updated = await Property.findByIdAndUpdate(id, body, { new: true })
    if (!updated) return Response.json({ error: 'Propiedad no encontrada' }, { status: 404 })

    return Response.json(updated)
  } catch (err) {
    console.error('Error al actualizar propiedad:', err)
    return Response.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<'/api/propiedades/[id]'>) {
  try {
    const { id } = await ctx.params

    await connectDB()
    const deleted = await Property.findByIdAndDelete(id)
    if (!deleted) return Response.json({ error: 'Propiedad no encontrada' }, { status: 404 })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Error al eliminar propiedad:', err)
    return Response.json({ error: 'Error interno' }, { status: 500 })
  }
}
