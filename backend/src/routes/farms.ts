import { Router } from 'express'
import { Request, Response } from 'express'
import { Farm } from '../models/Farm'
import { Activity } from '../models/Activity'
import { Crop } from '../models/Crop'

const router = Router()

// Mock data
const farms = [
  {
    id: 1,
    name: 'Ferme Agricole Bamenda',
    location: 'Bamenda, North West Region, Cameroon',
    size: '180 hectares',
    fields: 8,
    crops: ['Maize', 'Cassava', 'Plantain', 'Irish Potato'],
    status: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Plantation Kribi',
    location: 'Kribi, South Region, Cameroon',
    size: '250 hectares',
    fields: 12,
    crops: ['Cocoa', 'Rubber', 'Palm Oil', 'Tropical Fruits'],
    status: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Ferme Maroua',
    location: 'Maroua, Far North Region, Cameroon',
    size: '120 hectares',
    fields: 6,
    crops: ['Millet', 'Sorghum', 'Cotton', 'Groundnuts'],
    status: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// GET /api/farms
router.get('/', async (req: Request, res: Response) => {
  try {
    const farms = await Farm.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      data: farms
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching farms',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET /api/farms/:id
router.get('/:id', (req: Request, res: Response) => {
  const farm = farms.find(f => f.id === parseInt(req.params.id))
  
  if (!farm) {
    return res.status(404).json({
      success: false,
      error: { message: 'Farm not found' }
    })
  }

  res.json({
    success: true,
    data: farm
  })
})

// POST /api/farms
router.post('/', (req: Request, res: Response) => {
  const { name, location, size } = req.body

  if (!name || !location || !size) {
    return res.status(400).json({
      success: false,
      error: { message: 'Name, location, and size are required' }
    })
  }

  const newFarm = {
    id: farms.length + 1,
    name,
    location,
    size,
    fields: 0,
    crops: [],
    status: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  farms.push(newFarm)

  res.status(201).json({
    success: true,
    data: newFarm
  })
})

// PUT /api/farms/:id
router.put('/:id', (req: Request, res: Response) => {
  const farmIndex = farms.findIndex(f => f.id === parseInt(req.params.id))
  
  if (farmIndex === -1) {
    return res.status(404).json({
      success: false,
      error: { message: 'Farm not found' }
    })
  }

  const updatedFarm = {
    ...farms[farmIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  }

  farms[farmIndex] = updatedFarm

  res.json({
    success: true,
    data: updatedFarm
  })
})

// DELETE /api/farms/:id
router.delete('/:id', (req: Request, res: Response) => {
  const farmIndex = farms.findIndex(f => f.id === parseInt(req.params.id))
  
  if (farmIndex === -1) {
    return res.status(404).json({
      success: false,
      error: { message: 'Farm not found' }
    })
  }

  farms.splice(farmIndex, 1)

  res.json({
    success: true,
    message: 'Farm deleted successfully'
  })
})

export default router
