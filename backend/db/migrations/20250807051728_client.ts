import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('client', (table) => {
        table.increments('id').primary().unique();
        table.string('name').notNullable();
        table.date('date_of_birth').notNullable();
        table.string('funding').notNullable();
        table.string('main_language').notNullable();
        table.string('secondary_language');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('client');
}

