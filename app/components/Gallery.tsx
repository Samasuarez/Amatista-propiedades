'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const shots = [
  {
    label: 'Amanecer sobre el valle',
    css: 'bg-gradient-to-br from-[#FF6B6B] via-[#7B5EA7] to-[#2E5038]',
    span: 'md:col-span-2',
  },
  {
    label: 'Bosque nativo',
    css: 'bg-gradient-to-b from-[#4A7C59] to-[#2E5038]',
    span: '',
  },
  {
    label: 'Cima en la niebla',
    css: 'bg-gradient-to-br from-[#C9B8E8] via-[#7B5EA7] to-[#3D2B5F]',
    span: '',
  },
  {
    label: 'Ruta de acceso',
    css: 'bg-gradient-to-b from-[#8B7355] via-[#4A7C59] to-[#2E5038]',
    span: '',
  },
  {
    label: 'Panorámica al atardecer',
    css: 'bg-gradient-to-br from-[#F5A623] via-[#8B7355] to-[#1A1A2E]',
    span: 'md:col-span-2',
  },
]

export default function Gallery() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="galeria" ref={ref} className="py-28 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-amatista-light text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Vistas desde el dron
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-bold">La montaña en cada ángulo</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {shots.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group ${s.span}`}
              onClick={() => setActive(i)}
            >
              <div className={`absolute inset-0 ${s.css} transition-transform duration-700 group-hover:scale-105`} />
              {/* Simulated drone overlay — altitude lines */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white/60 text-xs tracking-widest uppercase block mb-1">Dron — {i + 1}/5</span>
                <p className="text-white font-medium">{s.label}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden ${shots[active].css}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)',
                }}
              />
              <div className="absolute bottom-6 left-6">
                <p className="text-white text-xl font-semibold">{shots[active].label}</p>
                <p className="text-white/50 text-sm">Vista aérea — Amatista</p>
              </div>
              <button
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                onClick={() => setActive(null)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
