const session = require('express-session')
const RedisStore = require('connect-redis')(session) // 传 express-session 进 connect-redis 储存起来

const options = {
  host: '127.0.0.1',
  port: 6379,
  db: 0,
}

module.exports = function(options) {
  const sessionMiddleware = session({
    store: new RedisStore(options),
    cookie: {
      domain: 'localhost:3000'
    },
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true  
  })

  return function (req, res, next) {
    var tries = 3
    function lookupSession(error) {
      if (error) {
        return next(error)
      }
  
      tries -= 1
  
      if (req.session !== undefined) {
        return next()
      }
  
      if (tries < 0) {
        return next(new Error('oh no'))
      }
  
      sessionMiddleware(req, res, lookupSession)
    }
  
    lookupSession()
  }
}
