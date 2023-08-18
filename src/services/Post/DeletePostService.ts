import { IPostRepository } from 'src/interfaces/IPostRepository'

export class DeletePostService {
  constructor(private postRepository: IPostRepository) {}

  public async execute(id: number) {
    const post = await this.postRepository.delete(id)
    return post
  }
}
