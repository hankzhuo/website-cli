module.exports = function isAuthToken(req, res, next) {
  // 此处判断用户是否登录
  if (!req.session || !req.session.authToken) {
    return next()
  }

  // 未登录的话，跳转去登录
  res.redirect('/signin')
} 
