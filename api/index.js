const Home = require('./handlers/home')
const Linters = require('./handlers/linters')
const Joi = require('joi')

exports.register = (plugin, options, next) => {
  plugin.route([
    {
      method: 'GET',
      path: '/',
      config: {
        handler: Home.hello.handler,
        description: 'Hello Page',
        tags: ['api']
      }
    },
    {
      method: 'GET',
      path: '/linters',
      config: {
        handler: Linters.all.handler,
        description: 'Get all Linters',
        notes: 'Returns an array with all linters available',
        tags: ['api']
      }
    },
    {
      method: 'POST',
      path: '/linters',
      config: {
        handler: Linters.addLinter.handler,
        description: 'Add a linter',
        notes: 'Insert a linter to the list',
        tags: ['api'],
        validate: {
          params: {
            name: Joi.string()
              .required()
              .description('Linter name'),
            creator: Joi.string()
              .required()
              .description('Linter creator'),
            category: Joi.string()
              .required()
              .description('Linter category'),
            url: Joi.string()
              .required()
              .description('Linter url'),
            description: Joi.string()
              .required()
              .description('Linter description')
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/linters/search/{query}',
      config: {
        handler: Linters.search.handler,
        description: 'Get all linters matching your search',
        notes:
          'Returns an array with all linters available that have your search in any place',
        tags: ['api'],
        validate: {
          params: {
            query: Joi.string()
              .required()
              .description('Search Query')
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/linters/category/{category}',
      config: {
        handler: Linters.category.handler,
        description: 'Get all linters in a category',
        notes: 'Returns an array with all linters available in that category',
        tags: ['api'],
        validate: {
          params: {
            category: Joi.string()
              .required()
              .description('Search Category')
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/linters/categories',
      config: {
        handler: Linters.allCategories.handler,
        description: 'Get all categories',
        notes: 'Returns an array with all the categories',
        tags: ['api']
      }
    }
  ])

  next()
}

exports.register.attributes = {
  name: 'wutthelintAPI'
}
