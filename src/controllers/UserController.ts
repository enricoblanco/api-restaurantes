import { Request, Response } from 'express'
import { prisma } from '../database'

export default {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body

      const userExists = await prisma.user.findUnique({ where: { email } })
      if (userExists) {
        return res.json({ error: true, message: 'email already exists' })
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password
        }
      })
      return res.json({
        error: true,
        message: 'Success: user registered',
        user
      })
    } catch (error) {
      return res.json({ error: error.message })
    }
  }
}
