var http = require('http')
var $ = require('jQuery')

$('#login-submit').click(() => {
  $('#login-errors').hide()
  var loginEmail = $('#login-email').val()
  var loginPassword = $('#login-password').val()
  var loginCreds = JSON.stringify({ user: { email: loginEmail, password: loginPassword } })

  var postAuthOptions = { host: 'localhost', port: 3000, path: '/authenticate', method: 'POST', headers: { 'Content-Type': 'application/json' } }
  var authRequest = http.request(postAuthOptions, (res) => {
    res.setEncoding('utf8')
    res.on('data', (body) => {
      var token = JSON.parse(body).token
      if (token != null) {
        renderCalls(token)
        $('#login-zone').hide()
      } else {
        $('#login-errors').show()
      }
    })
  })
  authRequest.write(loginCreds)
  authRequest.end()
})

var renderCalls = function (token) {
  var getCallsOptions = { host: 'localhost', port: 3000, path: '/calls', method: 'GET', headers: { 'Content-Type': 'application/json', 'X-TOKEN': token } }
  var getCallData = http.request(getCallsOptions, (res) => {
    res.setEncoding('utf8')
    res.on('data', (body) => {
      var callData = JSON.parse(body)
      fillCallTable(callData)
    })
  })
  getCallData.end()

  var fillCallTable = function (callData) {
    callData.calls.forEach((call) => {
      var rowHTML = `<tr>
                      <td> ${call.sid} </td>
                      <td> ${call.from} </td>
                      <td> ${call.result} </td>
                    </tr>`
      $('#call-table').append(rowHTML)
    })
  }

  $('#call-zone').show()
}
