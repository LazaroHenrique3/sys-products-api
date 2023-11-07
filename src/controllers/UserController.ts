import { Request, Response } from 'express'
import { prisma } from '../database'

export default {
    async createUser(request: Request, response: Response) {
        try {
            const { name, email } = request.body
            const userExists = await prisma.user.findUnique({ where: {email} })

            if(userExists){
                return response.json({
                    error: true,
                    message: 'Error: User already exists!'
                })
            }

            const user = await prisma.user.create({
                data: {
                    name,
                    email
                }
            })

            return response.json({
                error: false,
                message: 'Success: User created successfully!',
                user
            })

        } catch (error) {
            return response.json({message: error.message})
        }
    }
}