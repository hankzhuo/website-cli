const express = require('express');
const router = express.Router()

router.get('/',(req, res) => {
  if (req.session && req.session.authToken) {
    res.send('已经登录 test 页')
    next()
  }
  // 没注册跳去登录页
  res.redirect('/signin')  
})

module.exports = router
