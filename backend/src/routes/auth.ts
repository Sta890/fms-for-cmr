import { Router } from 'express'
import { Request, Response } from 'express'

const router = Router()

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    // For demo purposes, accept any email/password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { message: 'Email and password are required' }
      })
    }

    // Mock user data
    const user = {
      id: '1',
      email,
      name: name || 'Demo User',
      role: 'admin'
    }

    // Mock JWT token
    const token = 'demo_jwt_token'

    res.json({
      success: true,
      data: {
        user,
        token
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Login failed' }
    })
  }
})

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  })
})

// GET /api/auth/me
router.get('/me', (req: Request, res: Response) => {
  // Mock authenticated user
  const user = {
    id: '1',
    email: 'demo@farm.com',
    name: 'Demo User',
    role: 'admin'
  }

  res.json({
    success: true,
    data: { user }
  })
})

export default router
