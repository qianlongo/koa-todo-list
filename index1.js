let koa = require('koa')
let app = koa()

app.use(function * (next) { // next == 倒数第二个generator对象
  console.log(this)
  console.log('generate1111----start')
  yield next
  console.log('generate1111----end')
})

app.use(function * (next) { // next == noop()
  console.log('generate2222----start')
  yield next
  console.log('generate2222----end')
  this.body = 'hello world'
})

app.listen(3000)
