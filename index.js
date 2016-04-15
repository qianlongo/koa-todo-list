var koa = require('koa');
var route = require('koa-route');
var server = require('koa-static');
var path = require('path');
var parse = require('co-body');
var render = require('./app/lib/render.js');
var app = koa();

app.use(server('./'))

var doing = [];
var finished = [];

app.use(route.get('/', list));
app.use(route.post('/add', add));
app.use(route.post('/del', del));
app.use(route.post('/back', back));

var addId = (function() {
  var count = -1;
  return function() {
    count++;
    return count;
  };
})();

var selectId = function (arr, id) {
  var index = -1;
  arr.forEach(function (item, i) {
    if(id == item.id){
      index = i;
    }
  })
  return index;
}

function* back() {
  var item = yield parse(this);
  var index = selectId(finished, parseInt(item.id));
  var del;
  if(index != -1){
    doing.push(finished.splice(index, 1)[0]);
  }
  this.redirect('/');
}

function* add() {
  var item = yield parse(this);
  item.time = new Date().toLocaleString();
  item.id = addId();
  doing.unshift(item);
  this.redirect('/');
}


function* list() {
  this.body = yield render('index', {doing: doing, finished: finished})
}

function* del() {
  var item = yield parse(this);
  var index = selectId(doing, parseInt(item.id));

  console.log('删除数组第'+ index +'项');
  if(index != -1){
    finished.unshift(doing.splice(index, 1)[0]);
    console.log(finished);
  }
  this.redirect('/');
}

app.listen(3000);
console.log('listening port 3000');
