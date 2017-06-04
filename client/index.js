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
        $('#login-zone').hide()
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
  $('#call-zone').show()

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
      var callData = JSON.parse(body)
      fillCallTable(callData)
    })
  })
  getCallData.end()

  var fillCallTable = function (callData) {
    callData.calls.forEach((call) => {
      var sid = call.sid
      var from = call.from
      var result = call.result
      var rowHTML = '<tr>' +
                    '<td>' + sid + '</td>' +
                    '<td>' + from + '</td>' +
                    '<td>' + result + '</td>' +
                    '</tr>'
      $('#call-table').append(rowHTML)
    })
  }
}
