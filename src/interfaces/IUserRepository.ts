import { User } from '@prisma/client'

interface IUserRepository {
  create(name: string, email: string, password: string): Promise<User>
}

export { IUserRepository }
