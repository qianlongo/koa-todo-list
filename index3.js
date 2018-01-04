let koa = require('koa')
let app = koa()

function * a () {
  return 'a'
}

function * b () {
  return 'b'
}

function * gen () {
  let aa = yield a
  console.log(aa)
  let bb = yield b
  console.log(bb)
  return 'c'
}

app.use(function * (next) { // next == 倒数第二个generator对象
  console.log('generate1111----start')
  // let hh = yield gen
  // console.log(hh)
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
