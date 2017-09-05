const express = require('express');
const router = express.Router()

// 登录页面
router.get('/signin',(req, res) => {
  if (req.session && req.session.authToken) {
    res.redirect('/signup')
    return
  }
  
  res.send('登录页输入用户名密码登录')
})

// 登录提交
router.post('/signin',(req, res) => {
  // 设置 cookie
  const uidID = 'xxx'
  res.cookie('uidID', uidID, {maxAge: 10000, httpOnly: true})
  req.session.authToken = 'test authToken'
  
  res.send('登录页输入用户名密码登录')
})

// 注册页面
router.get('/signup',(req, res) => {
  if (req.session && req.session.authToken) {
    res.redirect('/')
    return
  }
  res.send('获取注册页')
})

// 注册提交
router.post('/signup',(req, res) => {
  // 获取前端用户注册信息，通过 req 获取
  // 注册时, 实际环境中 authToken 保存着用户唯一标识符，保存在数据库中，此处做测试用
  req.session.authToken = 'test authToken'
  res.send('注册页面提交资料')
})

module.exports = router
