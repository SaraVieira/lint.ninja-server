const linters = require('../../data/data.js')
var path = require('path')
var fs = require('fs')
var file = path.join(__dirname, '..', '..', 'data/data.js')

module.exports.hello = {
  handler: function(request, reply) {
    return reply({
      result: 'Welcome to the wutthelintAPI'
    })
  }
}

module.exports.linters = {
  handler: function(request, reply) {
    return reply({
      result: linters,
      length: linters.length
    })
  }
}

module.exports.search = {
  handler: function(request, reply) {
    const queryLinters = linters.filter(linter => {
      const name = linter.name
      const creator = linter.creator
      const description = linter.description
      const category = linter.category
      if (
        (name && name.includes(request.params.query)) ||
        (creator && creator.includes(request.params.query)) ||
        (description && description.includes(request.params.query)) ||
        (category && category.includes(request.params.query))
      ) {
        return true
      }

      return false
    })
    return reply({
      result: queryLinters,
      length: queryLinters.length
    })
  }
}

module.exports.addLinter = {
  handler: function(request, reply) {
    const invalid =
      !request.payload.name ||
      !request.payload.creator ||
      !request.payload.category ||
      !request.payload.url ||
      !request.payload.description

    if (invalid) {
      return reply({
        result: 'You are missing params'
      })
    }

    linters.push(request.payload)
    const newFile = `module.exports = ${JSON.stringify(linters, null, 2)}`
    fs.writeFile(file, newFile, function(err) {
      if (err) {
        return reply({
          result: err
        })
      }

      return reply({
        success: `${request.payload.name} added`,
        result: linters,
        length: linters.length
      })
    })
  }
}

module.exports.category = {
  handler: function(request, reply) {
    const allCategories = linters.reduce((end, linter) => {
      if (end.indexOf(linter.category) === -1) {
        end.push(linter.category)
      }

      return end
    }, [])

    const result = linters.filter(
      linter => linter.category === request.params.category
    )

    if (allCategories.indexOf(request.params.category) > -1) {
      return reply({
        result: result,
        length: result.length
      })
    }

    return reply({
      result: 'That Category does not exist'
    })
  }
}
