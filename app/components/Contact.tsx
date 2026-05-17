'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const data = {
      name:     (form.elements.namedItem('name') as HTMLInputElement).value,
      email:    (form.elements.namedItem('email') as HTMLInputElement).value,
      phone:    (form.elements.namedItem('phone') as HTMLInputElement).value,
      interest: (form.elements.namedItem('interest') as HTMLSelectElement).value,
      message:  (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSent(true)
    } catch {
      setError('Hubo un problema al enviar. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" ref={ref} className="py-28 px-6 bg-charcoal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amatista/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-amatista-light text-sm font-semibold tracking-[0.25em] uppercase mb-4">
              Hablemos
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
              Hagamos tu sueño<br />realidad
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              Completá el formulario y un asesor te contactará en menos de 24 horas
              con toda la información sobre disponibilidad y precios.
            </p>

            <div className="space-y-5">
              <ContactItem icon="📍" label="Ubicación" value="Provincia de Córdoba, Argentina" />
              <ContactItem icon="📞" label="Teléfono" value="+54 (351) 000-0000" />
              <ContactItem icon="✉️" label="Email" value="info@amatista.com.ar" />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <span className="text-5xl mb-4">✅</span>
                <h3 className="text-white text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
                <p className="text-white/50">Te contactaremos pronto.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id="name" label="Nombre" type="text" placeholder="Tu nombre" required />
                  <Field id="email" label="Email" type="email" placeholder="tu@email.com" required />
                </div>
                <Field id="phone" label="Teléfono" type="tel" placeholder="+54 9 ..." />
                <div>
                  <label htmlFor="interest" className="block text-white/70 text-sm font-medium mb-2">
                    Interés
                  </label>
                  <select
                    id="interest"
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amatista-light transition-colors"
                  >
                    <option value="" className="bg-charcoal">Seleccioná un lote</option>
                    <option value="cima" className="bg-charcoal">Lote Cima</option>
                    <option value="valle" className="bg-charcoal">Lote Valle</option>
                    <option value="bosque" className="bg-charcoal">Lote Bosque</option>
                    <option value="otro" className="bg-charcoal">Otro / Consulta general</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-white/70 text-sm font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="¿Qué querés saber?"
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amatista-light transition-colors resize-none"
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amatista hover:bg-amatista-dark disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors tracking-wide"
                >
                  {loading ? 'Enviando...' : 'Enviar consulta'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-20 pt-8 border-t border-white/10 text-center">
        <p className="text-white/30 text-sm">
          © 2026 Amatista Propiedades · Todos los derechos reservados
        </p>
      </div>
    </section>
  )
}

function ContactItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-xl mt-0.5">{icon}</span>
      <div>
        <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-white/80 text-sm">{value}</p>
      </div>
    </div>
  )
}

function Field({
  id, label, type, placeholder, required,
}: {
  id: string; label: string; type: string; placeholder: string; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-white/70 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amatista-light transition-colors"
      />
    </div>
  )
}
