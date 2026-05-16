'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '120+', label: 'Hectáreas' },
  { value: '48', label: 'Lotes disponibles' },
  { value: '2.400m', label: 'Altura sobre el mar' },
]

const features = [
  {
    icon: '⛰️',
    title: 'Vista panorámica',
    desc: 'Cada lote fue trazado para maximizar las vistas a la cordillera y los valles circundantes.',
  },
  {
    icon: '🌿',
    title: 'Ecosistema nativo',
    desc: 'Reserva de bosque autóctono integrada al proyecto que garantiza biodiversidad y paisaje permanente.',
  },
  {
    icon: '🚰',
    title: 'Infraestructura completa',
    desc: 'Agua potable, electricidad, caminos internos pavimentados y seguridad perimetral las 24 hs.',
  },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="nosotros" ref={ref} className="py-28 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Placeholder image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 mountain-dawn-bg" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-white/60 text-xs tracking-widest uppercase">Vista aérea — dron</span>
            </div>
            {/* Decorative border */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          >
            <p className="text-amatista text-sm font-semibold tracking-[0.25em] uppercase mb-4">
              Sobre el proyecto
            </p>
            <h2 className="text-charcoal text-4xl md:text-5xl font-bold leading-tight mb-6">
              Vivir entre nubes<br />y naturaleza
            </h2>
            <p className="text-charcoal/60 text-lg leading-relaxed mb-6">
              Amatista es un desarrollo inmobiliario de montaña diseñado para quienes buscan
              escapar del ritmo urbano sin renunciar a la comodidad. Ubicado a menos de dos
              horas de la ciudad, el proyecto ofrece lotes y viviendas rodeados de bosque
              nativo con acceso a miradores exclusivos.
            </p>
            <p className="text-charcoal/60 text-lg leading-relaxed">
              Cada parcela fue planeada respetando la topografía original, logrando que
              la arquitectura dialogue con el paisaje en lugar de imponerse sobre él.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-3 gap-6 mb-20 p-8 bg-charcoal rounded-2xl"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-amatista-light text-4xl font-bold mb-1">{s.value}</p>
              <p className="text-white/50 text-sm tracking-wide">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
              className="bg-white rounded-2xl p-7 shadow-sm border border-charcoal/5"
            >
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="text-charcoal font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-charcoal/55 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
