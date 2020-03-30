var express = require('express')
var app = express()
var port = '5550'
var cors = require('cors')
var whitelist = [
  'http://127.0.0.1:8080/'
]

var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  }
}

app.all('*', function(req, res, next) {
  console.log(req.headers.origin)
  console.log(req.environ)
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});


app.listen(port, function (err) {
  console.log('app start and running server on: http://localhost:' + port)
})

app.get('/covidData_csv', function (req, res) {
  try {
    var fileName = __dirname + '/data/Wuhan-2019-nCoV.csv'
    res.sendFile(fileName, {}, function (err) {
      if (err) {
        console.log(err)
      }
    })
  } catch (err) {
    console.log(err)
  }
})
