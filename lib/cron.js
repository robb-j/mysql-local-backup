/*
 * The Entrypoint to running a regular backup
 * - Will exit(1) if SQL_HOST, SQL_USER, SQL_PASS, SCHEDULE env vars are not set
 * - Starts a cron on your 'SCHEDULE' to run the backup
 * - Starts a http server on :80 so the service can be pinged
 */

const { createServer } = require('http')
const cron = require('node-cron')
const command = require('./cmd')
const enforceValuesOrExit = require('./check')

const { SQL_HOST, SQL_USER, SQL_PASS, SCHEDULE } = process.env
enforceValuesOrExit({ SQL_HOST, SQL_USER, SQL_PASS, SCHEDULE })

if (!cron.validate(SCHEDULE)) {
  console.log('[error] SCHEDULE is invalid')
  process.exit(1)
}

let lastBackup = null

console.log(`Setup cron on ${SCHEDULE}`)
let task = cron.schedule(SCHEDULE, async () => {
  lastBackup = new Date()
  await command(SQL_HOST, SQL_USER, SQL_PASS)
})

let server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write([
    `OK`,
    `schedule: '${SCHEDULE}'`,
    `last: '${lastBackup}'`
  ].join('\n'))
  res.end()
}).listen(80)

process.on('SIGINT', () => {
  console.log('Exiting ...')
  task.destroy()
  server.close()
})
