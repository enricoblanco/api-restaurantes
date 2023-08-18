import { Post } from '@prisma/client'

export interface IPostRepository {
  create(title: string, content: string, user_id: number): Promise<Post>
  list(id: number): Promise<Post>
  update(id: number, title: string, content: string): Promise<Post>
  delete(id: number): Promise<Post>
}
