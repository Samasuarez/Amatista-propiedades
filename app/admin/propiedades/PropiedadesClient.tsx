'use client'

import { useState } from 'react'
import { type PropertyData } from '@/app/components/Properties'

const THEMES = ['cima', 'valle', 'bosque'] as const
const TAGS = ['Disponible', 'Destacado', 'Último', 'Vendido']

const emptyForm = {
  name: '',
  area: '',
  altitude: '',
  features: '',
  tag: 'Disponible',
  theme: 'cima' as PropertyData['theme'],
  price: '',
}

export default function PropiedadesClient({ initialProperties }: { initialProperties: PropertyData[] }) {
  const [properties, setProperties] = useState<PropertyData[]>(initialProperties)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/propiedades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
        available: true,
      }),
    })
    if (res.ok) {
      const created = await res.json()
      setProperties((prev) => [...prev, created])
      setForm(emptyForm)
      setShowForm(false)
    }
    setSaving(false)
  }

  async function toggleAvailability(id: string, available: boolean) {
    const res = await fetch(`/api/propiedades/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available: !available }),
    })
    if (res.ok) {
      setProperties((prev) =>
        prev.map((p) => (p._id === id ? { ...p, available: !available } : p))
      )
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Seguro que querés eliminar este lote?')) return
    const res = await fetch(`/api/propiedades/${id}`, { method: 'DELETE' })
    if (res.ok) setProperties((prev) => prev.filter((p) => p._id !== id))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold">Propiedades</h1>
          <p className="text-white/40 text-sm mt-1">{properties.length} lote{properties.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-amatista hover:bg-amatista-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          {showForm ? 'Cancelar' : '+ Nuevo lote'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 grid md:grid-cols-2 gap-4">
          <h2 className="text-white font-semibold md:col-span-2 mb-2">Nuevo lote</h2>

          <FormField label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <FormField label="Área (ej: 800 m²)" value={form.area} onChange={(v) => setForm({ ...form, area: v })} required />
          <FormField label="Altitud (ej: 2.450 msnm)" value={form.altitude} onChange={(v) => setForm({ ...form, altitude: v })} required />
          <FormField label="Precio (opcional)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
          <div className="md:col-span-2">
            <FormField
              label="Características (separadas por coma)"
              value={form.features}
              onChange={(v) => setForm({ ...form, features: v })}
              placeholder="Vista 360°, Bosque colindante, Acceso privado"
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs font-medium mb-1.5">Etiqueta</label>
            <select
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              className="w-full bg-white/8 border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amatista-light"
            >
              {TAGS.map((t) => <option key={t} value={t} className="bg-charcoal">{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-white/60 text-xs font-medium mb-1.5">Tema visual</label>
            <select
              value={form.theme}
              onChange={(e) => setForm({ ...form, theme: e.target.value as PropertyData['theme'] })}
              className="w-full bg-white/8 border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amatista-light"
            >
              {THEMES.map((t) => <option key={t} value={t} className="bg-charcoal">{t}</option>)}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-amatista hover:bg-amatista-dark disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              {saving ? 'Guardando...' : 'Guardar lote'}
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {properties.map((p) => (
          <div
            key={p._id}
            className={`bg-white/5 border rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap transition-colors ${
              p.available ? 'border-white/10' : 'border-white/5 opacity-50'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-semibold">{p.name}</span>
                <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full">{p.tag}</span>
                <span className="text-xs text-white/30">{p.theme}</span>
              </div>
              <p className="text-white/40 text-sm">{p.area} · {p.altitude}{p.price ? ` · ${p.price}` : ''}</p>
              <p className="text-white/30 text-xs mt-1">{(p.features ?? []).join(' · ')}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAvailability(p._id, p.available)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  p.available
                    ? 'bg-mountain/20 text-green-400 hover:bg-mountain/30'
                    : 'bg-white/10 text-white/40 hover:bg-white/15'
                }`}
              >
                {p.available ? 'Disponible' : 'No disponible'}
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FormField({
  label, value, onChange, required, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-white/60 text-xs font-medium mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/8 border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-amatista-light transition-colors"
      />
    </div>
  )
}
