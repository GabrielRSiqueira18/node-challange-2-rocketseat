import { Knex } from "Knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('meals', (table) => {
		table.uuid('id').primary()
		table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE').notNullable()
		table.string('name', 30).notNullable()
		table.text('description').notNullable()
		table.enu('isInDiet', ['yes', 'no']).defaultTo('yes').notNullable()
		table.date('date').notNullable()
		table.time('hour').notNullable()
		
	})
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('meals')
}

