var koa = require('koa');
var route = require('koa-route');
var path = require('path');
var parse = require('co-body');
var render = require('./app/lib/render.js');
var app = koa();

app.use(route.get('/showImgPage', showImgPage))
app.use(route.post('/uploadImg', uploadImg))

function * showImgPage (next) {
  var sHtml = yield render('imgPage')
  this.body = sHtml
}

function * uploadImg (next) {
  console.log('upload img')
  console.log(this)
}

app.listen(3000);
console.log('listening port 3000');