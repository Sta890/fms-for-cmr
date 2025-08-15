import mongoose, { Document, Schema } from 'mongoose'

export interface IActivity extends Document {
  farmId: mongoose.Types.ObjectId
  name: string
  description: string
  type: 'Planting' | 'Irrigation' | 'Fertilizing' | 'Pest Control' | 'Harvesting' | 'Maintenance' | 'Other'
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
  priority: 'Low' | 'Medium' | 'High'
  assignedTo: string
  field: string
  scheduledDate: Date
  completedDate?: Date
  estimatedDuration: number // in hours
  actualDuration?: number // in hours
  notes: string
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ActivitySchema = new Schema<IActivity>({
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
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['Planting', 'Irrigation', 'Fertilizing', 'Pest Control', 'Harvesting', 'Maintenance', 'Other'],
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  assignedTo: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  completedDate: {
    type: Date
  },
  estimatedDuration: {
    type: Number,
    required: true,
    min: 0.5
  },
  actualDuration: {
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
ActivitySchema.index({ farmId: 1 })
ActivitySchema.index({ status: 1 })
ActivitySchema.index({ scheduledDate: 1 })
ActivitySchema.index({ type: 1 })
ActivitySchema.index({ priority: 1 })

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema)
