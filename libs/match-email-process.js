const emailParse = require('./email-parse')

function respond(data) {
  process.send(data)
}

function handleMessage(string) {
  const emailArr = emailParse(string)

  respond(emailArr || [])
}

process.on('message', handleMessage)