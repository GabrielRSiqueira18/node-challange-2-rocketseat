import { FastifyInstance, FastifyRequest } from "fastify";
import { knex } from "../database";
import { z } from 'zod';
import { randomUUID } from "crypto";

export async function usersRoutes(app: FastifyInstance) {
	app.post('/', async (req, reply) => {
		const createUserBodySchema = z.object({
			username: z.string().min(6, { message: 'Username: mínimo 6 dígitos' }).max(30, { message: 'Username: máximo 30 dígitos' }),
			password: z.string().min(8, { message: 'Password: mínimo 8 dígitos' }).max(100, { message: 'Password: máximo 100 dígitos' }),
			image_url: z.string().nullable(),
		})
		
		const { username, password, image_url } = createUserBodySchema.parse(req.body)

		const existUser = await knex('users').where({ username }).select().first()

		if(existUser) {
			throw new Error('Username arleady exist.')
		}

		await knex('users')
			.insert({
				id: randomUUID(),
				username,
				password,
				image_url: image_url ? image_url : ''
			})

		return reply.status(201).send()
	})

	app.get('/', async (req, reply) => {
		const users = await knex('users').select()

		return { users }
	})

	app.delete('/:id', async (req, reply) => {
		const { id } = req.params as { id: string }

		await knex('users')
			.where({ id })
			.del()
		
		return reply.status(204).send()
	})
}