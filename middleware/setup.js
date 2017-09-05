const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const env = require('./config/env')
const session = require('./config/session')
const isAuthToken = require('./isAuthToken')

const app = express()

module.exports = function(app) {
  
  // 设置环境变量
  app.set('env', env)
  // 防止被攻击，禁用
  app.disable('x-powered-by')  

  // session 设置，用 redis 长时间存储
  app.use(session())

  // 设置头部 headers
  app.use((req, res, next) => {
    const headers = {}
    // 如果登录了，添加 authToken 头部
    if (req.session && req.session.authToken) {
      headers['X-Auth-Token'] = req.session.authToken
    }
    next()
  })

  // body, cookie 解析
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())

  // 检查登录态
  app.use(isAuthToken)

  // 错误模板
  // 404模板
}
