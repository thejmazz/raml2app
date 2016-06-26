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

let ramled = {}

// [ ... ] --> { name: val, name: val }
const types = api.types().reduce((prev, curr) => addKey(prev, curr.name(), curr), {})

const processResource = (res) => {
  const relativeUri = res.relativeUri().value()
  const completeRelativeUri = res.completeRelativeUri()

  console.log(completeRelativeUri, "(", relativeUri, ")")


  const path = completeRelativeUri.substring(1).split('/')

  ramled[completeRelativeUri] = {}
  let currentObj = ramled[completeRelativeUri]

  const uriParams = res.uriParameters()
  uriParams.forEach(param => console.log(tab(1)+`${param.name()}:${param.type()}`))
  currentObj.uriParams = {}
  uriParams.forEach(param => currentObj.uriParams[param.name()] = param.type()[0])

  const methods = res.methods()
  currentObj.methods = {}
  let meth
  methods.forEach((method) => {
    meth = method.method()
    console.log(tab(1) + method.method())
    currentObj.methods[method.method()] = {}

    const bodies = method.body()
    bodies.forEach((body) => {
      console.log(tab(2) + 'body')
      currentObj.methods[method.method()].body = {}

      const props = body.properties()
      props.forEach(prop => console.log(tab(3) + prop.name() + ': ' + prop.type()))
      props.forEach(prop => currentObj.methods[method.method()].body[prop.name()] = prop.type()[0])
    })

    const responses = method.responses()
    currentObj.methods[meth].responses = {}

    responses.forEach((response) => {
      let code = response.code().value()
      console.log(tab(2) + response.code().value())
      currentObj.methods[meth].responses[code] = {}
      currentObj.methods[meth].responses[code].body = {}

      const body = response.body()[0]

      // console.log(tab(3) + 'body: ' + body.name() )
      console.log(tab(3) + 'body')

      const type = body.type()[0]
      const typeName = type.replace(/\[\]$/, '')

      // TODO better type checking
      if (type === 'object') {
        const props = body.properties()
        props.forEach(prop => console.log(tab(4) + prop.name() + ': ' + prop.type()))
        props.forEach(prop => currentObj.methods[meth].responses[code].body[prop.name()] = prop.type()[0])
      } else {
        // Got a custom type
        console.log(tab(4) + 'type: ' + type)

        if (types[typeName] !== undefined) {
          const props = types[typeName].properties()
          props.forEach(prop => console.log(tab(5) + prop.name() + ': ' + prop.type()))

          if (type.substring(type.length-2) === '[]') {
            let tempObj = {}
            props.forEach(prop => tempObj[prop.name()] = prop.type()[0])

            currentObj.methods[meth].responses[code].body = [tempObj]
          } else {
            props.forEach(prop => currentObj.methods[meth].responses[code].body[prop.name()] = prop.type()[0])
          }
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

console.log(JSON.stringify(ramled, null, 2))
