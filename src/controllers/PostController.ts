import { Request, Response } from 'express'
import { prisma } from '../database'

import { CreatePostService } from '../service/CreatePostService'
import { PostRepository } from '../repositories/PostRepository'

export default {
    async createPost(request: Request, response: Response) {
        try {
            const { title, content, userId } = request.body
        
            const createPost = new CreatePostService(new PostRepository())
            const post = await createPost.execute(title, content, userId)
            
            return response.json({
                error: false,
                message: 'Success: Post created successfully!',
                post
            })

        } catch (error) {
            return response.json({message: error.message})
        }
    },

    async listPost(request: Request, response: Response) {
        try {
            const { id } = request.params
        
            const post = await prisma.post.findUnique({ where: { id: Number(id)} })

            if(!post){
                return response.json({
                    error: true,
                    message: 'Error: Post not found!',
                })
            }

            return response.json({
                error: false,
                post
            })

        } catch (error) {
            return response.json({message: error.message})
        }
    },

    async updatePost(request: Request, response: Response) {
        try {
            const { id, title, content } = request.body
        
            const postExists = await prisma.post.findUnique({ where: { id: Number(id)} })

            if(!postExists){
                return response.json({
                    error: true,
                    message: 'Error: Post not found!',
                })
            }

            const post = await prisma.post.update({
                where: {
                    id: Number(request.body.id)
                },
                data: {
                    title,
                    content
                }
            })

            return response.json({
                error: false,
                message: 'Success: Post has been updated!',
                post
            })

        } catch (error) {
            return response.json({message: error.message})
        }
    },

    async deletePost(request: Request, response: Response) {
        try {
            const { id } = request.params
        
            const postExists = await prisma.post.findUnique({ where: { id: Number(id)} })

            if(!postExists){
                return response.json({
                    error: true,
                    message: 'Error: Post not found!',
                })
            }

            const post = await prisma.post.delete({
                where: {
                    id: Number(request.params.id)
                }
            })

            return response.json({
                error: false,
                message: 'Success: Post has been deleted!',
                post
            })

        } catch (error) {
            return response.json({message: error.message})
        }
    },
}