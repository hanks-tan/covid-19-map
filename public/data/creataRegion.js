var fs = require('fs')

const data = fs.readFileSync('D:\\tang\\project\\test\\covid-2019-map\\public\\data\\Wuhan-2019-nCoV.csv', 'utf-8')

var lines = data.split('\r\n')
const countryCodeIndex = 2
const provinceCodeIndex = 4
const cityCodeIndex = 6
const countryList = []
const g = [countryCodeIndex, provinceCodeIndex, cityCodeIndex]
lines.forEach((line) => {
  const values = line.split(',')

  g.reduce((prev, cur, index) => {
    const value = values[cur]
    if (!value) {
      return
    }
    if (index > 0 && !prev) {
      return
    }
    if (index === 0) {
      const countryObj = countryList.find((item) => item.code === value)
      if (!countryObj) {
        const countryObj = {
          code: value,
          name: values[cur - 1],
          children: []
        }
        countryList.push(countryObj)
      }
      return countryObj.children
    } else {
      const obj = prev.find((item) => item.code === value)
      if (!obj) {
        const obj = {
          code: value,
          name: values[cur - 1],
          children: []
        }
        prev.push(obj)
      }
      return prev.children
    }
  })
})

console.log(countryList)
