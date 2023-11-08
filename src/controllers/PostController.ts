import { Request, Response } from 'express'
import { prisma } from '../database'

export default {
    async createPost(request: Request, response: Response) {
        try {
            const { title, content, userId } = request.body
        
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    userId
                }
            })

            return response.json({
                error: false,
                message: 'Success: Post created successfully!',
                post
            })

        } catch (error) {
            return response.json({message: error.message})
        }
    }
}