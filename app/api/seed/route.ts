import { connectDB } from '@/lib/mongodb'
import { Property } from '@/lib/models/Property'

const initialProperties = [
  {
    name: 'Lote Cima',
    area: '800 m²',
    altitude: '2.450 msnm',
    features: ['Vista 360°', 'Bosque colindante', 'Acceso privado', 'Orientación norte'],
    tag: 'Destacado',
    theme: 'cima',
    available: true,
  },
  {
    name: 'Lote Valle',
    area: '600 m²',
    altitude: '2.380 msnm',
    features: ['Vista al valle', 'Arroyo cercano', 'Topografía suave', 'Ideal construcción'],
    tag: 'Disponible',
    theme: 'valle',
    available: true,
  },
  {
    name: 'Lote Bosque',
    area: '1.200 m²',
    altitude: '2.420 msnm',
    features: ['Árboles nativos', 'Alta privacidad', 'Sendero propio', 'Vista a picos'],
    tag: 'Último',
    theme: 'bosque',
    available: true,
  },
]

export async function GET() {
  try {
    await connectDB()

    const count = await Property.countDocuments()
    if (count > 0) {
      return Response.json({ message: `Ya existen ${count} propiedades. Seed omitido.` })
    }

    await Property.insertMany(initialProperties)
    return Response.json({ ok: true, message: '3 propiedades insertadas correctamente.' })
  } catch (err) {
    console.error('Error en seed:', err)
    return Response.json({ error: 'Error al ejecutar seed' }, { status: 500 })
  }
}
