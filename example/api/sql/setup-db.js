'use strict'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const pgp = require('pg-promise')()

const config = require('../lib/config.js')

const db = pgp(config.pg)

const queryText = fs.readFileAsync(path.resolve(__dirname, 'schema.sql'), 'utf-8')

queryText
  .then(query =>
    query.trim().split(';')
      .filter(q => q !== '')
      .map(q => q.trim())
  )
  .then(queries => Promise.reduce(queries, (_, query) => {
    console.log('Running query: ', query)
    return db.any(query).then(results => console.log('Results: ', results))
  }, null))
  .then((results) => {
    console.log('results: ', results)

    process.exit()
  })
  .catch(err => console.error(err))
