import { Router } from 'express'
import { Request, Response } from 'express'

const router = Router()

// Mock data
const inventory = [
  {
    id: 1,
    name: 'Corn Seeds - Hybrid Variety',
    category: 'Seeds',
    description: 'High-yield hybrid corn seeds suitable for temperate climate',
    quantity: 500,
    unit: 'kg',
    minStockLevel: 100,
    maxStockLevel: 1000,
    unitPrice: 12.50,
    totalValue: 6250,
    supplier: 'AgriSeeds Inc.',
    location: 'Warehouse A - Section 1',
    expiryDate: '2025-12-31',
    lastRestocked: '2024-02-15',
    status: 'In Stock',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Nitrogen Fertilizer (NPK 20-10-10)',
    category: 'Fertilizers',
    description: 'Balanced NPK fertilizer for general crop nutrition',
    quantity: 50,
    unit: 'bags (50kg)',
    minStockLevel: 20,
    maxStockLevel: 200,
    unitPrice: 45.00,
    totalValue: 2250,
    supplier: 'FertilizerCorp',
    location: 'Warehouse B - Section 2',
    expiryDate: '2026-06-30',
    lastRestocked: '2024-03-01',
    status: 'Low Stock',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Glyphosate Herbicide',
    category: 'Pesticides',
    description: 'Broad-spectrum systemic herbicide',
    quantity: 0,
    unit: 'liters',
    minStockLevel: 10,
    maxStockLevel: 100,
    unitPrice: 25.00,
    totalValue: 0,
    supplier: 'ChemAg Solutions',
    location: 'Chemical Storage - Locked Cabinet',
    expiryDate: '2024-08-15',
    lastRestocked: '2023-12-10',
    status: 'Out of Stock',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: 'John Deere Tractor - Model 5075E',
    category: 'Equipment',
    description: '75HP utility tractor with loader',
    quantity: 1,
    unit: 'unit',
    minStockLevel: 1,
    maxStockLevel: 1,
    unitPrice: 65000.00,
    totalValue: 65000,
    supplier: 'John Deere Dealer',
    location: 'Equipment Shed',
    lastRestocked: '2023-05-15',
    status: 'In Stock',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Diesel Fuel',
    category: 'Fuel',
    description: 'Ultra-low sulfur diesel for farm equipment',
    quantity: 1500,
    unit: 'liters',
    minStockLevel: 500,
    maxStockLevel: 3000,
    unitPrice: 1.35,
    totalValue: 2025,
    supplier: 'Local Fuel Depot',
    location: 'Fuel Tank #1',
    lastRestocked: '2024-03-10',
    status: 'In Stock',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// GET /api/inventory
router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: inventory
  })
})

// GET /api/inventory/:id
router.get('/:id', (req: Request, res: Response) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id))

  if (!item) {
    return res.status(404).json({
      success: false,
      error: { message: 'Inventory item not found' }
    })
  }

  res.json({
    success: true,
    data: item
  })
})

// POST /api/inventory
router.post('/', (req: Request, res: Response) => {
  const { name, category, description, quantity, unit, minStockLevel, maxStockLevel, unitPrice, supplier, location, expiryDate } = req.body

  if (!name || !category || !description || quantity === undefined || !unit || !unitPrice) {
    return res.status(400).json({
      success: false,
      error: { message: 'Name, category, description, quantity, unit, and unitPrice are required' }
    })
  }

  const totalValue = quantity * unitPrice
  let status = 'In Stock'

  if (quantity === 0) {
    status = 'Out of Stock'
  } else if (quantity <= minStockLevel) {
    status = 'Low Stock'
  }

  const newItem = {
    id: inventory.length + 1,
    name,
    category,
    description,
    quantity: parseFloat(quantity),
    unit,
    minStockLevel: minStockLevel || 0,
    maxStockLevel: maxStockLevel || 1000,
    unitPrice: parseFloat(unitPrice),
    totalValue,
    supplier: supplier || '',
    location: location || '',
    expiryDate: expiryDate || '',
    lastRestocked: new Date().toISOString(),
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  inventory.push(newItem)

  res.status(201).json({
    success: true,
    data: newItem
  })
})

// PUT /api/inventory/:id
router.put('/:id', (req: Request, res: Response) => {
  const itemIndex = inventory.findIndex(i => i.id === parseInt(req.params.id))

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: { message: 'Inventory item not found' }
    })
  }

  const updatedItem = {
    ...inventory[itemIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  }

  // Recalculate total value and status
  if (updatedItem.quantity !== undefined && updatedItem.unitPrice !== undefined) {
    updatedItem.totalValue = updatedItem.quantity * updatedItem.unitPrice

    if (updatedItem.quantity === 0) {
      updatedItem.status = 'Out of Stock'
    } else if (updatedItem.quantity <= updatedItem.minStockLevel) {
      updatedItem.status = 'Low Stock'
    } else {
      updatedItem.status = 'In Stock'
    }
  }

  inventory[itemIndex] = updatedItem

  res.json({
    success: true,
    data: updatedItem
  })
})

// DELETE /api/inventory/:id
router.delete('/:id', (req: Request, res: Response) => {
  const itemIndex = inventory.findIndex(i => i.id === parseInt(req.params.id))

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: { message: 'Inventory item not found' }
    })
  }

  inventory.splice(itemIndex, 1)

  res.json({
    success: true,
    message: 'Inventory item deleted successfully'
  })
})

export default router
