import { Request, Response } from 'express'
import { prisma } from '../database'
import { UserRepository } from '../repositories/UserRepository'
import { CreateUserService } from '../services/User/CreateUserService'

export default {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body

      const userExists = await prisma.user.findUnique({ where: { email } })
      if (userExists) {
        return res.json({ error: true, message: 'email already exists' })
      }

      const createUser = new CreateUserService(new UserRepository())

      const user = await createUser.execute(name, email, password)

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
