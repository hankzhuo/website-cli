import express from 'express'
import render from '../../components/render'
import SignUp from './SignUp'
import SignIn from './SignIn'

const router = express.Router()

// 登录页面
router.get('/signin', (req, res) => {
  if (req.session && req.session.user) {
    res.redirect('/signup')
    return
  }

  render(res, SignIn, {})
})

// 登录提交
router.post('/signin', (req, res) => {
  // 待写，先验证账户密码是否正确，然后发送到数据库，登录
  // 设置 cookie
  const uidID = 'xxx'
  res.cookie('uidID', uidID, { maxAge: 10000, httpOnly: true })
  req.session.user = 'user'
})

// 注册页面
router.get('/signup', (req, res) => {
  if (req.session && req.session.user) {
    res.redirect('/')
    return
  }

  render(res, SignUp, {})
})

// 注册提交
router.post('/signup', (req, res) => {
  // 待写，注册，可以把用户身份信息储存于数据库中
  // 此处可以设置一个user，以验证用户是否登录的凭证
  req.session.user = 'user'
})

module.exports = router
