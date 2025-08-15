import mongoose, { Document, Schema } from 'mongoose'

export interface ICrop extends Document {
  farmId: mongoose.Types.ObjectId
  name: string
  variety: string
  field: string
  area: number // in hectares
  plantingDate: Date
  expectedHarvestDate: Date
  actualHarvestDate?: Date
  status: 'Planted' | 'Growing' | 'Flowering' | 'Harvested' | 'Failed'
  health: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  expectedYield: number // in tons
  actualYield?: number // in tons
  notes: string
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const CropSchema = new Schema<ICrop>({
  farmId: {
    type: Schema.Types.ObjectId,
    ref: 'Farm',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  variety: {
    type: String,
    required: true,
    trim: true
  },
  field: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true,
    min: 0.1
  },
  plantingDate: {
    type: Date,
    required: true
  },
  expectedHarvestDate: {
    type: Date,
    required: true
  },
  actualHarvestDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Planted', 'Growing', 'Flowering', 'Harvested', 'Failed'],
    default: 'Planted'
  },
  health: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor'],
    default: 'Good'
  },
  expectedYield: {
    type: Number,
    required: true,
    min: 0
  },
  actualYield: {
    type: Number,
    min: 0
  },
  notes: {
    type: String,
    default: ''
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// Indexes
CropSchema.index({ farmId: 1 })
CropSchema.index({ name: 1 })
CropSchema.index({ status: 1 })
CropSchema.index({ health: 1 })
CropSchema.index({ plantingDate: 1 })
CropSchema.index({ expectedHarvestDate: 1 })

export const Crop = mongoose.model<ICrop>('Crop', CropSchema)
