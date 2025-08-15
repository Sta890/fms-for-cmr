import mongoose, { Document, Schema } from 'mongoose'

// Interfaces
export interface ICoordinates {
  latitude: number
  longitude: number
}

export interface IOwner {
  name: string
  email: string
  phone: string
}

export interface IBuilding {
  type: string
  count: number
}

export interface IInsurance {
  provider: string
  policyNumber: string
  expiryDate: string
}

export interface IFarm extends Document {
  name: string
  location: string
  address: string
  coordinates: ICoordinates
  size: number
  sizeUnit: string
  fields: number
  crops: string[]
  status: 'Active' | 'Inactive' | 'Seasonal'
  farmType: string
  soilType: string
  climate: string
  waterSource: string[]
  irrigation: boolean
  certifications: string[]
  owner: IOwner
  manager: IOwner
  established: Date
  totalRevenue: number
  totalExpenses: number
  employees: number
  equipment: string[]
  buildings: IBuilding[]
  insurance: IInsurance
  notes: string
  createdAt: Date
  updatedAt: Date
}

// Schemas
const CoordinatesSchema = new Schema<ICoordinates>({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
})

const OwnerSchema = new Schema<IOwner>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
})

const BuildingSchema = new Schema<IBuilding>({
  type: { type: String, required: true },
  count: { type: Number, required: true }
})

const InsuranceSchema = new Schema<IInsurance>({
  provider: { type: String, required: true },
  policyNumber: { type: String, required: true },
  expiryDate: { type: String, required: true }
})

const FarmSchema = new Schema<IFarm>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: { type: CoordinatesSchema, required: true },
  size: { type: Number, required: true },
  sizeUnit: { type: String, required: true, default: 'hectares' },
  fields: { type: Number, required: true },
  crops: [{ type: String }],
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Seasonal'], 
    default: 'Active' 
  },
  farmType: { type: String, required: true },
  soilType: { type: String, required: true },
  climate: { type: String, required: true },
  waterSource: [{ type: String }],
  irrigation: { type: Boolean, default: false },
  certifications: [{ type: String }],
  owner: { type: OwnerSchema, required: true },
  manager: { type: OwnerSchema, required: true },
  established: { type: Date, required: true },
  totalRevenue: { type: Number, default: 0 },
  totalExpenses: { type: Number, default: 0 },
  employees: { type: Number, default: 0 },
  equipment: [{ type: String }],
  buildings: [BuildingSchema],
  insurance: { type: InsuranceSchema, required: true },
  notes: { type: String, default: '' }
}, {
  timestamps: true
})

// Indexes for better performance
FarmSchema.index({ name: 1 })
FarmSchema.index({ location: 1 })
FarmSchema.index({ status: 1 })
FarmSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 })

export const Farm = mongoose.model<IFarm>('Farm', FarmSchema)
