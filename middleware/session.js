import session from 'express-session'
import connectRedis from 'connect-redis'

// 传 express-session 进 connect-redis 储存起来
const RedisStore = connectRedis(session)

const options = {
  host: '127.0.0.1',
  port: 6379,
  db: 0,
}

module.exports = function () {
  const sessionMiddleware = session({
    store: new RedisStore(options),
    cookie: {
      domain: 'localhost:3000',
    },
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
  })

  return function (req, res, next) {
    let tries = 3
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
