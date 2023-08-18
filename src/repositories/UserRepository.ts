import { prisma } from '../database'
import { IUserRepository } from 'src/interfaces/IUserRepository'

class UserRepository implements IUserRepository {
  async create(name, email, password) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })
    return user
  }
}

export { UserRepository }
