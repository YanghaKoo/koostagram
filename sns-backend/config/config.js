require('dotenv').config()

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.SEQ_PASSWORD,
    "database": "koostagram",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases" : false
  },
  "test": {
    "username": "root",
    "password": process.env.SEQ_PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.SEQ_PASSWORD,
    "database": "koostagram",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases" : false,
    "logging" : false
  }
}
