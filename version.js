const nowDate = new Date()
const buildDate = `${nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() + ' ' + nowDate.getHours() + ':' + nowDate.getMinutes()}`
module.exports = {
  buildDate
}
