import { IUserRepository } from 'src/interfaces/IUserRepository'

class CreateUserService {
  constructor(private UserRepository: IUserRepository) {}

  public async execute(name: string, email: string, password: string) {
    const user = await this.UserRepository.create(name, email, password)
  }
}

export { CreateUserService }