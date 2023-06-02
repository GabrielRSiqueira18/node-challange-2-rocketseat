import { afterAll, beforeAll, describe, it } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('Table: Users', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be create new user', async () => {
		await request(app.server)
			.post('/users')
			.send({
				username: "Gabriel",
				password: "gariel",
				image_url: "",
			})
			.expect(201)
			
	})
})