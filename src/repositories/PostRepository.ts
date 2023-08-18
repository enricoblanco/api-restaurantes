import { Post } from '@prisma/client'
import { IPostRepository } from '../interfaces/IPostRepository'
import { prisma } from '../database'

class PostRepository implements IPostRepository {
  public async create(
    title: string,
    content: string,
    user_id: number
  ): Promise<Post> {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        user_id
      }
    })
    return post
  }

  public async list(id: number): Promise<Post> {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id)
      }
    })
    return post
  }

  public async update(
    id: number,
    title: string,
    content: string
  ): Promise<Post> {
    const post = await prisma.post.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        content
      }
    })
    return post
  }

  public async delete(id: number): Promise<Post> {
    const post = await prisma.post.delete({
      where: {
        id: Number(id)
      }
    })
    return post
  }
}

export { PostRepository }
