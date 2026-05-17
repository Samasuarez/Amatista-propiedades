import mongoose, { Schema, model, models } from 'mongoose'

export interface ILead {
  name: string
  email: string
  phone?: string
  interest?: string
  message?: string
  createdAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, trim: true, lowercase: true },
    phone:    { type: String, trim: true },
    interest: { type: String },
    message:  { type: String, trim: true },
  },
  { timestamps: true }
)

export const Lead = models.Lead || model<ILead>('Lead', LeadSchema)
