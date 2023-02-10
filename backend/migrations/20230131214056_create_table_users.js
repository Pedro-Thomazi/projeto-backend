
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
       table.increments('id').primary()
       table.string('name').notNull()
       table.string('email').notNull().unique()
       table.string('password').notNull()
       table.boolean('admin').notNull().defaultTo(false)
       table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};


// up = Evoluir, ir para versões mais recentes - (update, delete, ...) ------------ No terminal: npx knex migrate:latest
// down = Oposto do 'up' ------------ No terminal: npx knex migrate:rollback