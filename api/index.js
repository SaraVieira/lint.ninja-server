const Home = require('./handlers/home')

exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/linters', config: Home.linters },
    { method: 'POST', path: '/linters', config: Home.addLinter },
    { method: 'GET', path: '/linters/search/{query}', config: Home.search },
    {
      method: 'GET',
      path: '/linters/category/{category}',
      config: Home.category
    }
  ])

  next()
}

exports.register.attributes = {
  name: 'api'
}
