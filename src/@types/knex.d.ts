import { knex } from 'knex'

declare module 'knex/types/tables' {
	export interface Tables {
		users: {
			id: string
			username: string
			password: string
			image_url: string
			created_at: string
			updated_at: string
		},

		meals: {
			id: string
			user_id: string
			name: string
			description: string
			date: string
			hour: string
			isInDiet: 'yes' | 'no'
			created_at: string
			updated_at: string
		},
	}
}