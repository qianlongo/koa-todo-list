var koa = require('koa');
var route = require('koa-route');
var path = require('path');
var parse = require('co-body');
var render = require('./app/lib/render.js');
var app = koa();

app.use(route.get('/showJsonpPage', showJsonpPage))
app.use(route.get('/showData', showData))

function * showJsonpPage () {
  var sHtml = yield render('jsonp')
  this.body = sHtml
}

function * showData (next) {
  let {callback, name, sex, randomNum} = this.query
  
  this.type = 'text/javascript'
  let callbackData = {
    status: 0,
    message: 'ok',
    data: {
      name,
      sex,
      randomNum
    }
  }

  this.body = `${callback}(${JSON.stringify(callbackData)})`
  console.log(this.query)
}

app.listen(3000);
console.log('listening port 3000');