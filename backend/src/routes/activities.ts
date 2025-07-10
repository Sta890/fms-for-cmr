import { Router } from 'express'
import { Request, Response } from 'express'

const router = Router()

// Mock data
const activities = [
  {
    id: 1,
    title: 'Corn Planting',
    description: 'Plant corn seeds in North Field A',
    type: 'Planting',
    fieldId: 1,
    fieldName: 'North Field A',
    farmName: 'Green Valley Farm',
    status: 'Completed',
    priority: 'High',
    scheduledDate: '2024-03-15T08:00:00Z',
    completedDate: '2024-03-15T16:00:00Z',
    assignedTo: 'John Smith',
    estimatedHours: 8,
    actualHours: 8,
    cost: 500,
    notes: 'Weather conditions were perfect',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Irrigation System Check',
    description: 'Check and maintain irrigation system',
    type: 'Irrigation',
    fieldId: 2,
    fieldName: 'South Field B',
    farmName: 'Green Valley Farm',
    status: 'In Progress',
    priority: 'Medium',
    scheduledDate: '2024-03-20T09:00:00Z',
    assignedTo: 'Mike Johnson',
    estimatedHours: 4,
    cost: 200,
    notes: 'Need to replace some sprinkler heads',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Fertilizer Application',
    description: 'Apply nitrogen fertilizer to wheat field',
    type: 'Fertilization',
    fieldId: 2,
    fieldName: 'South Field B',
    farmName: 'Green Valley Farm',
    status: 'Scheduled',
    priority: 'High',
    scheduledDate: '2024-03-25T07:00:00Z',
    assignedTo: 'Sarah Davis',
    estimatedHours: 6,
    cost: 800,
    notes: 'Use organic fertilizer as requested',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'Pest Control Inspection',
    description: 'Inspect cotton field for pest damage',
    type: 'Pest Control',
    fieldId: 3,
    fieldName: 'East Field C',
    farmName: 'Sunrise Agriculture',
    status: 'Scheduled',
    priority: 'Medium',
    scheduledDate: '2024-03-22T10:00:00Z',
    assignedTo: 'Tom Wilson',
    estimatedHours: 3,
    cost: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// GET /api/activities
router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: activities
  })
})

// GET /api/activities/:id
router.get('/:id', (req: Request, res: Response) => {
  const activity = activities.find(a => a.id === parseInt(req.params.id))

  if (!activity) {
    return res.status(404).json({
      success: false,
      error: { message: 'Activity not found' }
    })
  }

  res.json({
    success: true,
    data: activity
  })
})

// POST /api/activities
router.post('/', (req: Request, res: Response) => {
  const { title, description, type, fieldId, status, priority, scheduledDate, assignedTo, estimatedHours, cost, notes } = req.body

  if (!title || !description || !type || !fieldId || !scheduledDate) {
    return res.status(400).json({
      success: false,
      error: { message: 'Title, description, type, fieldId, and scheduledDate are required' }
    })
  }

  const newActivity = {
    id: activities.length + 1,
    title,
    description,
    type,
    fieldId: parseInt(fieldId),
    fieldName: 'Field Name', // In real app, fetch from fields table
    farmName: 'Farm Name', // In real app, fetch from farms table
    status: status || 'Scheduled',
    priority: priority || 'Medium',
    scheduledDate,
    assignedTo: assignedTo || '',
    estimatedHours: estimatedHours || 0,
    cost: cost || 0,
    notes: notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  activities.push(newActivity)

  res.status(201).json({
    success: true,
    data: newActivity
  })
})

// PUT /api/activities/:id
router.put('/:id', (req: Request, res: Response) => {
  const activityIndex = activities.findIndex(a => a.id === parseInt(req.params.id))

  if (activityIndex === -1) {
    return res.status(404).json({
      success: false,
      error: { message: 'Activity not found' }
    })
  }

  const updatedActivity = {
    ...activities[activityIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  }

  activities[activityIndex] = updatedActivity

  res.json({
    success: true,
    data: updatedActivity
  })
})

// DELETE /api/activities/:id
router.delete('/:id', (req: Request, res: Response) => {
  const activityIndex = activities.findIndex(a => a.id === parseInt(req.params.id))

  if (activityIndex === -1) {
    return res.status(404).json({
      success: false,
      error: { message: 'Activity not found' }
    })
  }

  activities.splice(activityIndex, 1)

  res.json({
    success: true,
    message: 'Activity deleted successfully'
  })
})

export default router
