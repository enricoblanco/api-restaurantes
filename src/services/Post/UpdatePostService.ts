import { IPostRepository } from 'src/interfaces/IPostRepository'

class UpdatePostService {
  constructor(private PostRepository: IPostRepository) {}

  public async execute(id: number, title: string, content: string) {
    const post = await this.PostRepository.update(id, title, content)
    return post
  }
}

export { UpdatePostService }
