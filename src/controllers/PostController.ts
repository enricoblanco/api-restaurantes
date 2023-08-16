import { Request, Response } from 'express'
import { prisma } from '../database'

export default {
  async createPost(req: Request, res: Response) {
    try {
      const { title, content, user_id } = req.body

      const post = await prisma.post.create({
        data: {
          title,
          content,
          user_id
        }
      })
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

      const post = await prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      })

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

      // Verifica se o post existe
      const postExists = await prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      })

      // Se não existir, retorna um erro
      if (!postExists) {
        return res.json({ error: true, message: 'Post not found' })
      }

      // faz o update do post
      const post = await prisma.post.update({
        where: {
          // id vai ser o id passado na req
          id: Number(req.body.id)
        },
        data: {
          title,
          content
        }
      })

      // retorna o post atualizado
      return res.json({ error: false, message: 'Success: post updated', post })
    } catch (error) {
      // retorna o erro
      return res.json({ error: error.message })
    }
  },

  // Função para deletar um post
  async deletePost(req: Request, res: Response) {
    try {
      // Os parametros que a req vai receber
      const { id } = req.params

      // Verifica se o post existe
      const postExists = await prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      })

      if (!postExists) {
        return res.json({ error: true, message: 'Post not found' })
      }

      prisma.post.delete({
        where: {
          id: Number(req.params.id)
        }
      })

      return res.json({ error: false, message: 'Success: post deleted' })
    } catch (error) {
      return res.json({ error: error.message })
    }
  }
}
