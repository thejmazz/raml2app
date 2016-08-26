'use strict'

const { assert } = require('chai')
const request = require('supertest')

const api = require('./api.js')

describe('api', function() {
  it('should add a new todo', function(done) {
    request(api)
      .post('/todos')
      .send({ content: 'Make lunch' })
      .expect('Content-Type', /json/)
      .expect(200, {
        content: 'Make lunch',
        completed: false,
        id: 1
      }, done)
  })
})
