var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '123456789',
      database : 'testeBackend'
    }
  });  

module.exports = knex