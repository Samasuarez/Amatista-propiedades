export const dynamic = 'force-dynamic'

import { connectDB } from '@/lib/mongodb'
import { Property } from '@/lib/models/Property'
import PropiedadesClient from './PropiedadesClient'

async function getProperties() {
  await connectDB()
  const props = await Property.find().sort({ createdAt: 1 }).lean()
  return JSON.parse(JSON.stringify(props))
}

export default async function PropiedadesPage() {
  const properties = await getProperties()
  return <PropiedadesClient initialProperties={properties} />
}
