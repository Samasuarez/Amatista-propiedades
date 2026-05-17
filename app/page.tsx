import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Properties, { type PropertyData } from './components/Properties'
import Contact from './components/Contact'
import { connectDB } from '@/lib/mongodb'
import { Property } from '@/lib/models/Property'

async function getProperties(): Promise<PropertyData[]> {
  try {
    await connectDB()
    const props = await Property.find({ available: true }).sort({ createdAt: 1 }).lean()
    return JSON.parse(JSON.stringify(props))
  } catch {
    return [] as PropertyData[]
  }
}

export default async function Home() {
  const properties = await getProperties()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Properties properties={properties} />
        <Contact />
      </main>
    </>
  )
}
