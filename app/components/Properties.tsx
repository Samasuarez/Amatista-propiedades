'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const properties = [
  {
    name: 'Lote Cima',
    area: '800 m²',
    altitude: '2.450 msnm',
    features: ['Vista 360°', 'Bosque colindante', 'Acceso privado', 'Orientación norte'],
    css: 'bg-gradient-to-br from-[#3D2B5F] via-[#7B5EA7] to-[#4A7C59]',
    tag: 'Destacado',
    tagColor: 'bg-amatista',
  },
  {
    name: 'Lote Valle',
    area: '600 m²',
    altitude: '2.380 msnm',
    features: ['Vista al valle', 'Arroyo cercano', 'Topografía suave', 'Ideal construcción'],
    css: 'bg-gradient-to-b from-[#4A7C59] via-[#2E5038] to-[#1A1A2E]',
    tag: 'Disponible',
    tagColor: 'bg-mountain',
  },
  {
    name: 'Lote Bosque',
    area: '1.200 m²',
    altitude: '2.420 msnm',
    features: ['Árboles nativos', 'Alta privacidad', 'Sendero propio', 'Vista a picos'],
    css: 'bg-gradient-to-br from-[#8B7355] via-[#4A7C59] to-[#2E5038]',
    tag: 'Último',
    tagColor: 'bg-earth',
  },
]

export default function Properties() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="propiedades" ref={ref} className="py-28 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-amatista text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Disponibilidad
          </p>
          <h2 className="text-charcoal text-4xl md:text-5xl font-bold mb-4">Nuestros lotes</h2>
          <p className="text-charcoal/55 text-lg max-w-xl mx-auto">
            Cada lote fue seleccionado a mano por su orientación, vistas y acceso al entorno natural.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-charcoal/5 hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image placeholder */}
              <div className="relative h-52 overflow-hidden">
                <div className={`absolute inset-0 ${p.css} transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px)',
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className={`${p.tagColor} text-white text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide`}>
                    {p.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/30 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                    {p.altitude}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-charcoal text-xl font-bold mb-1">{p.name}</h3>
                <p className="text-charcoal/40 text-sm mb-5">{p.area} · montaña</p>

                <ul className="space-y-2 mb-7">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-charcoal/65 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-amatista flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-charcoal/8 pt-5 flex items-center justify-between">
                  <div>
                    <p className="text-charcoal/40 text-xs uppercase tracking-wide mb-0.5">Precio</p>
                    <p className="text-charcoal font-semibold">Consultar</p>
                  </div>
                  <a
                    href="#contacto"
                    className="bg-amatista hover:bg-amatista-dark text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
                  >
                    Me interesa
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
