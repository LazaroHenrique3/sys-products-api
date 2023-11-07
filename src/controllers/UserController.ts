import { Request, Response } from 'express'

export default {
    async createUser(request: Request, response: Response) {
        try {
            const { name, email } = request.body
            const userExists = await 

        } catch (error) {
            return response.json({message: error.message})
        }
    }
}