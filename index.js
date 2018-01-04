let Koa = require('koa')
let route = require('koa-route')
let rewrite = require('koa-rewrite')
let app = Koa()

app.use(function * (next) {
  console.log('1---start')
  yield next
  console.log('1---end')
})

app.use(function * (next) {
  console.log('2---start')
  yield next
  console.log('2---end')
})

app.listen(3000)