console.log('hello world')
var http = require('http')

var optionsget = {
  host: 'localhost',
  port: 3000,
  path: '/dog'
}

var reqGet = http.get(optionsget, function (res) {
  console.log('statusCode: ', res.statusCode)
  res.setEncoding('utf8')
  var body = []
  res.on('data', function (d) {
    body.push(d)
  })
  res.on('end', function () {
    console.log(body.join())
  })
})

reqGet.on('error', function (e) {
  console.error(e)
})
