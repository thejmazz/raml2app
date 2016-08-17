'use strict'

// === MODULES ===
const koa = require('koa')
const router = require('koa-router')()
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')
const pgp = require('pg-promise')()

// === CONFIGURATION ===
const config = require('./lib/config.js')

// === DATABASE ===
const db = pgp(config.pg)

// === ROUTING ===
router.post('/todos', function * () {
  const { content } = this.request.body
  yield db.one('INSERT INTO todos(content) values($1) RETURNING id, content, completed', [content])
    .then(todo => this.body = todo)
    .catch(err => console.error(err))
})

router.get('/todos/all', function * () {
  yield db.any('SELECT * FROM todos ORDER BY id ASC')
    .then(todos => this.body = todos)
    .catch(err => console.error(err))
})

router.get('/todos/:id', function * () {
  const { id } = this.params
  yield db.oneOrNone('SELECT * FROM todos WHERE id=($1)', [id])
    .then(todo => todo ? this.body = todo : this.body = { message: `No todo with ID ${id}` })
    .catch(err => console.error(err))
})

router.put('/todos/:id', function * () {
  const { id } = this.params

  yield db.one('UPDATE todos SET completed = NOT completed WHERE id=($1) RETURNING id, content, completed', [id])
    .then(todo => this.body = todo)
    .catch(err => console.error(err))
})

router.delete('/todos/:id', function * () {
  const { id } = this.params

  yield db.none('DELETE FROM todos WHERE id=($1)', [id])
    .then(() => this.body = { success: true, message: `Deleted todo ${id}` })
    .catch(err => console.error(err))
})

// === MIDDLEWARE ===
const app = koa()
app.use(cors())
app.use(morgan.middleware('dev'))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = require('http').createServer(app.callback())

// === LISTEN ===
const listen = ({ port }) => {
  app.listen(port)
  console.log(`Koa server listening on port ${port}`)
}

listen(config)
