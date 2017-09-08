require('babel-core/register')
const express = require('express')
const path = require('path')
const setup = require('./middleware/setup')
const exampleRoute = require('./pages/test/routes')
const loginRoute = require('./pages/login/routes')

const app = express()

// 设置 middleware
setup(app)

// 设置路由
app.use('/test', exampleRoute)
app.use('/', loginRoute)

// 设置静态资源路径
app.use('/public', express.static(path.join(__dirname, 'dist')))

app.listen(3000, () => {
  console.log('app listening on port 3000!')
})
