/*
 * Forces the backup to run
 */

const command = require('./cmd')
const enforceValuesOrExit = require('./check')

const { SQL_HOST, SQL_USER, SQL_PASS } = process.env
enforceValuesOrExit({ SQL_HOST, SQL_USER, SQL_PASS })

;(async () => {
  await command(SQL_HOST, SQL_USER, SQL_PASS)
})()
