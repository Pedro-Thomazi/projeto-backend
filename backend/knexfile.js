// Update with your config settings.

module.exports = {
	client: 'pg',
	connection: {
		database: 'knowledge',
		user: 'postgres',
		password: '753951'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}


};
