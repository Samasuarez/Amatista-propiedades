import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Property } from '@/lib/models/Property'

export async function GET() {
  try {
    await connectDB()
    const properties = await Property.find({ available: true }).sort({ createdAt: -1 })
    return Response.json(properties)
  } catch (err) {
    console.error('Error al obtener propiedades:', err)
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, area, altitude, features, tag, price, description } = body

    if (!name || !area || !altitude) {
      return Response.json({ error: 'Nombre, área y altitud son requeridos' }, { status: 400 })
    }

    await connectDB()
    const property = await Property.create({ name, area, altitude, features, tag, price, description })

    return Response.json(JSON.parse(JSON.stringify(property)), { status: 201 })
  } catch (err) {
    console.error('Error al crear propiedad:', err)
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
