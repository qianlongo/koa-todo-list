var koa = require('koa');
var route = require('koa-route');
var path = require('path');
var parse = require('co-body');
var render = require('./app/lib/render.js');
var app = koa();
var axios = require('axios');

app.use(route.get('/showJsonpPage', showJsonpPage))
app.use(route.get('/showData', showData))
app.use(route.get('/getBackData', getBackData));

function * getBackData () {
  var response = yield axios.get('localhost:4000/get/back/data');
  console.log(response);
  this.body = response;
}

function * showJsonpPage () {
  var sHtml = yield render('jsonp')
  this.body = sHtml
}

function * showData (next) {
  let {callback, name, sex, randomNum} = this.query
  
  this.type = 'text/javascript'
  let callbackData = {
    code: 200,
    message: 'ok',
    data: {
      name, 
      sex, 
      randomNum
    }
  }

  // this.body = `${callback}(${JSON.stringify(callbackData)})`
  this.body = callbackData
  console.log(this.query)
}

app.listen(3000);
console.log('listening port 3000');