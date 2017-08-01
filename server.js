'use strict'

const Glue = require('glue')
const manifest = require('./config/manifest')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Pack = require('./package')

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    plugin: {
      register: 'blipp',
      options: {}
    }
  })
}

const options = {
  info: {
    title: 'Test API Documentation',
    version: Pack.version
  }
}

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.log('server.register err:', err)
  }
  server.register(
    [
      Inert,
      Vision,
      {
        register: HapiSwagger,
        options: options
      }
    ],
    err => { // eslint-disable-line
      server.start(err => {
        if (err) {
          console.log(err)
        } else {
          console.log(
            '✅  Server is listening on ' + server.info.uri.toLowerCase()
          )
        }
      })
    }
  )
})
