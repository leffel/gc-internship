var http = require('http')

var postAuthOptions = {
  host: 'localhost',
  port: 3000,
  path: '/authenticate',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}

var authRequest = http.request(postAuthOptions, function (res) {
  console.log('statusCode: ', res.statusCode)
  res.setEncoding('utf8')
  res.on('data', function (body) {
    console.log(body)
  })
})

authRequest.on('error', function (e) {
  console.error(e)
})

authRequest.end()
