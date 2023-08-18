import { IPostRepository } from 'src/interfaces/IPostRepository'

class CreatePostService {
  constructor(private PostRepository: IPostRepository) {}

  public async execute(title: string, content: string, user_id: number) {
    const post = await this.PostRepository.create(title, content, user_id)
    return post
  }
}

export { CreatePostService }
