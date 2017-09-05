module.exports = function isAuthToken(req, res, next) {
  if (!req.session || !req.session.authToken) {
    return next()
  }

  // 未登录的话，跳转去登录
  res.redirect('/signin')
} 
