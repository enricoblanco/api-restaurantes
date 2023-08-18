import { Request, Response } from 'express'
import { DeletePostService } from '../services/Post/DeletePostService'
import { UpdatePostService } from '../services/Post/UpdatePostService'
import { ListPostService } from '../services/Post/ListPostService'
import { PostRepository } from '../repositories/PostRepository'
import { CreatePostService } from '../services/Post/CreatePostService'
import { prisma } from '../database'

export default {
  async createPost(req: Request, res: Response) {
    try {
      const { title, content, user_id } = req.body

      const createPost = new CreatePostService(new PostRepository())

      const post = await createPost.execute(title, content, user_id)

      return res.json({
        error: true,
        message: 'Success: post registered',
        post
      })
    } catch (error) {
      return res.json({ error: error.message })
    }
  },

  async listPost(req: Request, res: Response) {
    try {
      const { id } = req.params

      const createList = await new ListPostService(new PostRepository())

      const post = await createList.execute(parseInt(id))

      if (!post) {
        return res.json({ error: true, message: 'Post not found' })
      }

      return res.json({ error: false, post })
    } catch (error) {
      return res.json({ error: error.message })
    }
  },

  // Função para fazer o update de um post
  async updatePost(req: Request, res: Response) {
    try {
      // Os parametros que a req vai receber
      const { id, title, content } = req.body

      const updatePost = new UpdatePostService(new PostRepository())

      const post = await updatePost.execute(id, title, content)

      // Se não existir, retorna um erro
      if (!post) {
        return res.json({ error: true, message: 'Post not found' })
      }

      return res.json({ error: false, message: 'Success: post updated', post })
    } catch (error) {
      return res.json({ error: error.message })
    }
  },

  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params

      const postExists = await prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      })

      if (!postExists) {
        return res.json({ error: true, message: 'Post not found' })
      }

      const deletePost = new DeletePostService(new PostRepository())

      const post = await deletePost.execute(parseInt(id))

      return res.json({ error: false, message: 'Success: post deleted', post })
    } catch (error) {
      return res.json({ error: error.message })
    }
  }
}
