import { Router } from 'express'
import { Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: [],
    message: 'Finance endpoint - coming soon'
  })
})

export default router
