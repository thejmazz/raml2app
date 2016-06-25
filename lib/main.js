'use strict'

const fs = require('fs')
const path = require('path')

const raml = require('raml-1-parser')

const ramlPath = path.resolve(__dirname, "../example/todos.raml")

const api = raml.loadApiSync(ramlPath)

const apiResources = api.resources()

const tab = (num) => {
  let str = ''
  for(let i=0; i < num; i++) {
    str += '  '
  }
  return str
}

const addKey = (obj, key, value) => {
  obj[key] = value
  return obj
}

// [ ... ] --> { name: val, name: val }
const types = api.types().reduce((prev, curr) => addKey(prev, curr.name(), curr), {})

const processResource = (res) => {
  const relativeUri = res.relativeUri().value()
  const completeRelativeUri = res.completeRelativeUri()

  console.log(completeRelativeUri, "(", relativeUri, ")")

  const uriParams = res.uriParameters()
  uriParams.forEach(param => console.log(tab(1)+`${param.name()}:${param.type()}`))

  const methods = res.methods()
  methods.forEach((method) => {
    console.log(tab(1) + method.method())

    const bodies = method.body()
    bodies.forEach((body) => {
      console.log(tab(2) + 'body')

      const props = body.properties()
      props.forEach(prop => console.log(tab(3) + prop.name() + ': ' + prop.type()))
    })

    const responses = method.responses()
    responses.forEach((response) => {
      console.log(tab(2) + response.code().value())

      const body = response.body()[0]

      // console.log(tab(3) + 'body: ' + body.name() )
      console.log(tab(3) + 'body')

      const type = body.type()[0]
      const typeName = type.replace(/\[\]$/, '')

      // TODO better type checking
      if (type === 'object') {
        const props = body.properties()
        props.forEach(prop => console.log(tab(4) + prop.name() + ': ' + prop.type()))
      } else {
        // Got a custom type
        console.log(tab(4) + 'type: ' + type)

        if (types[typeName] !== undefined) {
          const props = types[typeName].properties()
          props.forEach(prop => console.log(tab(5) + prop.name() + ': ' + prop.type()))
        }
      }
    })
  })

  // Recursively traverse
  res.resources().forEach(res => processResource(res))
}


apiResources.forEach((resource) => {
  processResource(resource)
})
