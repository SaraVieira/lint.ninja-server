module.exports.hello = {
  handler: function(request, reply) {
    return reply({
      result: 'Welcome to the wutthelintAPI'
    })
  }
}
