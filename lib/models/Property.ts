import { Schema, model, models } from 'mongoose'

export interface IProperty {
  name: string
  area: string
  altitude: string
  features: string[]
  tag: string
  theme: 'cima' | 'valle' | 'bosque'
  available: boolean
  price?: string
  description?: string
}

const PropertySchema = new Schema<IProperty>(
  {
    name:        { type: String, required: true, trim: true },
    area:        { type: String, required: true },
    altitude:    { type: String, required: true },
    features:    { type: [String], default: [] },
    tag:         { type: String, default: 'Disponible' },
    theme:       { type: String, enum: ['cima', 'valle', 'bosque'], default: 'cima' },
    available:   { type: Boolean, default: true },
    price:       { type: String },
    description: { type: String },
  },
  { timestamps: true }
)

export const Property = models.Property || model<IProperty>('Property', PropertySchema)
