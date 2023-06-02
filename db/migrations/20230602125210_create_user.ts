import { Knex } from "Knex"



export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('users', (table) => {
		table.uuid('id').primary()
		table.string('username', 30).notNullable()
		table.string('password', 100).notNullable()
		table.text('image_url')
		table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
		table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
	})
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('users')
}

