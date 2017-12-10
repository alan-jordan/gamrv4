var createServer = require('./server')

var env = process.env.NODE_ENV || 'development'

var server = createServer()
var PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
