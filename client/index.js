var http = require('http')
var $ = require('jQuery')

$('#login-submit').click(function () {
  $('#login-errors').hide()
  var postAuthOptions = {
    host: 'localhost',
    port: 3000,
    path: '/authenticate',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }
  var authRequest = http.request(postAuthOptions, function (res) {
    res.setEncoding('utf8')
    res.on('data', function (body) {
      var token = JSON.parse(body).token
      if (token != null) {
        renderCalls(token)
      } else {
        $('#login-errors').show()
      }
    })
  })
  var loginEmail = $('#login-email').val()
  var loginPassword = $('#login-password').val()
  var loginCreds = JSON.stringify({ user: { email: loginEmail, password: loginPassword } })
  authRequest.write(loginCreds)
  authRequest.end()
})

var renderCalls = function (token) {
  var getCallsOptions = {
    host: 'localhost',
    port: 3000,
    path: '/calls',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-TOKEN': token }
  }
  var getCallData = http.request(getCallsOptions, function (res) {
    res.setEncoding('utf8')
    res.on('data', function (body) {
      console.log(body)
    })
  })
  getCallData.end()
}
