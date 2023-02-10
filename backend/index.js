const app = require('express')()
const consign = require("consign")
const db = require("./config/db")
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = db
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then("./config/middlewares.js")
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend executando...')
})






// D:\pedro\PROGRAMACAO\javascript\Downloads\knowledge\knowledge-master\versao-inicial\backend> psql -U postgres

// psql -U postgres
// postgres=# \c knowledge
// knowledge=# \dt
// knowledge=# select * from knex_migrations;
// select * from categories where id in (1,2,3);