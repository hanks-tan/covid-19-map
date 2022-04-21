
const { Csv2png } = require('csv2png')
const fp = './public/data/Wuhan-2019-nCoV.csv'

const pc = new Csv2png({
  int: [7, 8, 9, 10],
  filePath: fp,
  width: 400
})

pc.write('covid_d_20200411')
