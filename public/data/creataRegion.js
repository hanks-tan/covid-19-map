var fs = require('fs')

const data = fs.readFileSync('D:\\tang\\project\\test\\covid-2019-map\\public\\data\\Wuhan-2019-nCoV.csv', 'utf-8')

var lines = data.split('\r\n')
const countryCodeIndex = 2
const provinceCodeIndex = 4
const cityCodeIndex = 6
const countryList = []
const g = [countryCodeIndex, provinceCodeIndex, cityCodeIndex]
const tree = []

const reg = /^[A-Z]{2}$|^\d{6}$/ // 匹配国家代码或者省、市代码

const addNode = (values, fieldList, nodes, i = 0) => {
  const index = fieldList[i]
  const v = values[index]
  if (v) {
    // 过滤掉境外、未公布来源等等数据
    if (!reg.test(v)) {
      return null
    }

    let node = nodes.find((item) => item.code === v)
    if (!node) {
      node = {
        code: v,
        value: values[index - 1],
        children: []
      }
      if (i === 2) {
        delete node.children
      }
      nodes.push(node)
    } else {
      addNode(values, fieldList, node.children, i + 1)
    }
  } else {
    return null
  }
}

const dataList = lines.slice(1)
dataList.forEach((line, i) => {
  const values = line.split(',')
  addNode(values, g, tree)
})

const treeJson = JSON.stringify(tree)

fs.writeFileSync('./city.json', treeJson)
console.log('done！')
