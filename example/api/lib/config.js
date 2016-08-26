'use strict'

const envalid = require('envalid')
const { num, str } = envalid

const env = envalid.cleanEnv(process.env, {
  API_PORT: num(),
  API_PG_HOST: str(),
  PGUSER: str(),
  PGPASSWORD: str(),
  PGDATABASE: str()
})

console.log('env.PGDATABASE: ', env.PGDATABASE)

const config = {
  port: env.API_PORT,
  // pg uses PGUSER, PGPASSWORD, PGDATABASE
  pg: {
    host: env.API_PG_HOST,
    user: env.PGUSER,
    database: env.PGDATABASE
  }
}

module.exports = config
