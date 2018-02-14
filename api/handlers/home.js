module.exports.hello = {
  handler: function(request, reply) {
    return reply({
      result: 'Welcome son'
    })
  }
}
