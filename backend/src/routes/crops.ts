import { Router } from 'express'
import { Request, Response } from 'express'

const router = Router()

// Mock data
const crops = [
  {
    id: 1,
    name: 'Corn',
    variety: 'Sweet Corn Hybrid',
    fieldId: 1,
    fieldName: 'North Field A',
    farmName: 'Green Valley Farm',
    plantingDate: '2024-04-15',
    expectedHarvestDate: '2024-08-15',
    area: 25,
    unit: 'acres',
    growthStage: 'Vegetative',
    healthStatus: 'Good',
    expectedYield: 200,
    yieldUnit: 'bushels/acre',
    notes: 'Regular irrigation schedule maintained',
    irrigationSchedule: 'Every 3 days, 2 inches',
    fertilizationPlan: 'NPK 20-10-10 applied monthly',
    pestManagement: 'Integrated pest management approach',
    cost: 2500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Wheat',
    variety: 'Winter Wheat',
    fieldId: 2,
    fieldName: 'South Field B',
    farmName: 'Green Valley Farm',
    plantingDate: '2023-10-01',
    expectedHarvestDate: '2024-07-01',
    actualHarvestDate: '2024-06-28',
    area: 30,
    unit: 'acres',
    growthStage: 'Harvested',
    healthStatus: 'Excellent',
    expectedYield: 45,
    actualYield: 48,
    yieldUnit: 'bushels/acre',
    notes: 'Excellent harvest, exceeded expectations',
    irrigationSchedule: 'Rainfall dependent',
    fertilizationPlan: 'Organic compost and nitrogen supplement',
    pestManagement: 'Minimal intervention needed',
    cost: 1800,
    revenue: 4320,
    profit: 2520,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Soybeans',
    variety: 'Non-GMO Soybeans',
    fieldId: 1,
    fieldName: 'North Field A',
    farmName: 'Green Valley Farm',
    plantingDate: '2024-05-20',
    expectedHarvestDate: '2024-09-20',
    area: 20,
    unit: 'acres',
    growthStage: 'Flowering',
    healthStatus: 'Good',
    expectedYield: 50,
    yieldUnit: 'bushels/acre',
    notes: 'Monitoring for aphid activity',
    irrigationSchedule: 'As needed based on rainfall',
    fertilizationPlan: 'Nitrogen-fixing, minimal fertilizer needed',
    pestManagement: 'Organic pest control methods',
    cost: 1200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Cotton',
    variety: 'Upland Cotton',
    fieldId: 3,
    fieldName: 'East Field C',
    farmName: 'Sunrise Agriculture',
    plantingDate: '2024-04-01',
    expectedHarvestDate: '2024-10-01',
    area: 20,
    unit: 'acres',
    growthStage: 'Maturity',
    healthStatus: 'Fair',
    expectedYield: 800,
    yieldUnit: 'lbs/acre',
    notes: 'Some pest pressure, monitoring closely',
    irrigationSchedule: 'Drip irrigation, twice weekly',
    fertilizationPlan: 'Balanced NPK with micronutrients',
    pestManagement: 'IPM with targeted treatments',
    cost: 3200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Tomatoes',
    variety: 'Roma Tomatoes',
    fieldId: 2,
    fieldName: 'South Field B',
    farmName: 'Green Valley Farm',
    plantingDate: '2024-03-15',
    expectedHarvestDate: '2024-07-15',
    area: 5,
    unit: 'acres',
    growthStage: 'Planted',
    healthStatus: 'Excellent',
    expectedYield: 25,
    yieldUnit: 'tons/acre',
    notes: 'Greenhouse started, recently transplanted',
    irrigationSchedule: 'Daily drip irrigation',
    fertilizationPlan: 'High potassium fertilizer program',
    pestManagement: 'Preventive spray schedule',
    cost: 4500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// GET /api/crops
router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: crops
  })
})

// GET /api/crops/:id
router.get('/:id', (req: Request, res: Response) => {
  const crop = crops.find(c => c.id === parseInt(req.params.id))

  if (!crop) {
    return res.status(404).json({
      success: false,
      error: { message: 'Crop not found' }
    })
  }

  res.json({
    success: true,
    data: crop
  })
})

// POST /api/crops
router.post('/', (req: Request, res: Response) => {
  const {
    name, variety, fieldId, plantingDate, expectedHarvestDate, area, unit,
    growthStage, healthStatus, expectedYield, yieldUnit, notes,
    irrigationSchedule, fertilizationPlan, pestManagement, cost
  } = req.body

  if (!name || !variety || !fieldId || !plantingDate || !expectedHarvestDate || !area || !expectedYield) {
    return res.status(400).json({
      success: false,
      error: { message: 'Name, variety, fieldId, plantingDate, expectedHarvestDate, area, and expectedYield are required' }
    })
  }

  const newCrop = {
    id: crops.length + 1,
    name,
    variety,
    fieldId: parseInt(fieldId),
    fieldName: 'Field Name', // In real app, fetch from fields table
    farmName: 'Farm Name', // In real app, fetch from farms table
    plantingDate,
    expectedHarvestDate,
    area: parseFloat(area),
    unit: unit || 'acres',
    growthStage: growthStage || 'Planted',
    healthStatus: healthStatus || 'Good',
    expectedYield: parseFloat(expectedYield),
    yieldUnit: yieldUnit || 'tons/acre',
    notes: notes || '',
    irrigationSchedule: irrigationSchedule || '',
    fertilizationPlan: fertilizationPlan || '',
    pestManagement: pestManagement || '',
    cost: parseFloat(cost) || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  crops.push(newCrop)

  res.status(201).json({
    success: true,
    data: newCrop
  })
})

// PUT /api/crops/:id
router.put('/:id', (req: Request, res: Response) => {
  const cropIndex = crops.findIndex(c => c.id === parseInt(req.params.id))

  if (cropIndex === -1) {
    return res.status(404).json({
      success: false,
      error: { message: 'Crop not found' }
    })
  }

  const updatedCrop = {
    ...crops[cropIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  }

  // Calculate profit if revenue is provided
  if (updatedCrop.revenue && updatedCrop.cost) {
    updatedCrop.profit = updatedCrop.revenue - updatedCrop.cost
  }

  crops[cropIndex] = updatedCrop

  res.json({
    success: true,
    data: updatedCrop
  })
})

// DELETE /api/crops/:id
router.delete('/:id', (req: Request, res: Response) => {
  const cropIndex = crops.findIndex(c => c.id === parseInt(req.params.id))

  if (cropIndex === -1) {
    return res.status(404).json({
      success: false,
      error: { message: 'Crop not found' }
    })
  }

  crops.splice(cropIndex, 1)

  res.json({
    success: true,
    message: 'Crop deleted successfully'
  })
})

export default router
