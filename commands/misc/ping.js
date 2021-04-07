module.exports = {
  commands: 'ping',
  callback: (message, arguments, text, client) => {
    message.reply('Υπολογίζοντας...').then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp

      resultMessage.edit(`Bot latency: ${ping}, API Latency: ${client.ws.ping}`)
    })
  },
}
