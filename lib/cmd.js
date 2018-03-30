/*
 * A function to export a mysql dump to a timestamped file in /data
 */

const { exec } = require('child_process')

module.exports = async function mysqlExport(host, user, pass) {
  let dest = `/data/${new Date().toISOString()}.sql.gz`
  
  let cmd = `mysqldump -h${host} -u${user} -p${pass} --all-databases | gzip > ${dest}`
  
  if (process.env.IS_DUMMY) {
    return console.log(`[dummy] ${cmd}`)
  }
  
  let dump = exec(cmd)
  dump.stderr.pipe(process.stderr)
  
  console.log(`Exporting to ${dest}`)
}
