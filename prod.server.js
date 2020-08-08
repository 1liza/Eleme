const express = require('express')
const compression = require('compression')

const app = express()

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

const router = express.Router()

router.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

router.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

router.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

//app.use(compression());
app.use(compression({filter: shouldCompress}))
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // 这里就过滤掉了请求头包含'x-no-compression'
    return false
  }

  return compression.filter(req, res)
}

app.use('/api', router)
app.use(express.static('./dist'))

const port = process.env.PORT || 8900

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
