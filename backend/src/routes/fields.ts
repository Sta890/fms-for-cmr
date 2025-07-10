import { Router } from 'express'
import { Request, Response } from 'express'

const router = Router()

// Mock data
const fields = [
  {
    id: 1,
    name: 'North Field A',
    farmId: 1,
    farmName: 'Green Valley Farm',
    size: '25 acres',
    soilType: 'Clay Loam',
    cropType: 'Corn',
    status: 'Active',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'South Field B',
    farmId: 1,
    farmName: 'Green Valley Farm',
    size: '30 acres',
    soilType: 'Sandy Loam',
    cropType: 'Wheat',
    status: 'Active',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'East Field C',
    farmId: 2,
    farmName: 'Sunrise Agriculture',
    size: '20 acres',
    soilType: 'Silt Loam',
    cropType: 'Cotton',
    status: 'Preparation',
    coordinates: { lat: 40.6892, lng: -74.0445 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// GET /api/fields
router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: fields
  })
})

// GET /api/fields/:id
router.get('/:id', (req: Request, res: Response) => {
  const field = fields.find(f => f.id === parseInt(req.params.id))

  if (!field) {
    return res.status(404).json({
      success: false,
      error: { message: 'Field not found' }
    })
  }

  res.json({
    success: true,
    data: field
  })
})

// POST /api/fields
router.post('/', (req: Request, res: Response) => {
  const { name, farmId, size, soilType, cropType, status } = req.body

  if (!name || !farmId || !size || !soilType) {
    return res.status(400).json({
      success: false,
      error: { message: 'Name, farmId, size, and soilType are required' }
    })
  }

  const newField = {
    id: fields.length + 1,
    name,
    farmId: parseInt(farmId),
    farmName: 'Farm Name', // In real app, fetch from farms table
    size,
    soilType,
    cropType: cropType || '',
    status: status || 'Active',
    coordinates: { lat: 40.7128, lng: -74.0060 }, // Default coordinates
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  fields.push(newField)

  res.status(201).json({
    success: true,
    data: newField
  })
})

// PUT /api/fields/:id
router.put('/:id', (req: Request, res: Response) => {
  const fieldIndex = fields.findIndex(f => f.id === parseInt(req.params.id))

  if (fieldIndex === -1) {
    return res.status(404).json({
      success: false,
      error: { message: 'Field not found' }
    })
  }

  const updatedField = {
    ...fields[fieldIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  }

  fields[fieldIndex] = updatedField

  res.json({
    success: true,
    data: updatedField
  })
})

// DELETE /api/fields/:id
router.delete('/:id', (req: Request, res: Response) => {
  const fieldIndex = fields.findIndex(f => f.id === parseInt(req.params.id))

  if (fieldIndex === -1) {
    return res.status(404).json({
      success: false,
      error: { message: 'Field not found' }
    })
  }

  fields.splice(fieldIndex, 1)

  res.json({
    success: true,
    message: 'Field deleted successfully'
  })
})

export default router
