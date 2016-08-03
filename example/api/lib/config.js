'use strict'

const envalid = require('envalid')
const { num, str } = envalid

const env = envalid.cleanEnv(process.env, {
  API_PORT: num(),
  API_PG_HOST: str(),
  PG_USER: str(),
  PG_PASS: str(),
  PG_DBNAME: str()
})

const config = {
  port: env.API_PORT,
  pg: {
    user: env.PG_USER,
    password: env.PG_PASS,
    database: env.PG_DBNAME,
    host: env.API_PG_HOST
  }
}

module.exports = config
