import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('这是一个 test 页')
})

module.exports = router
