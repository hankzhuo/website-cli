import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import env from './env'
import session from './session'
import isLogin from './isLogin'

module.exports = function (app) {
  // 设置环境变量
  app.set('env', env)
  // 防止被攻击，禁用
  app.disable('x-powered-by')

  // session 设置，用 redis 长时间存储
  app.use(session())

  // 设置头部 headers
  app.use((req, res, next) => {
    const headers = {}
    // 如果登录了，给 session 添加 user
    if (req.session && req.session.user) {
      headers['X-Auth-Token'] = req.session.user
    }
    next()
  })

  // body, cookie 解析
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())

  // 检查登录态
  app.use(isLogin)

  // 错误模板
  // 404模板
}
