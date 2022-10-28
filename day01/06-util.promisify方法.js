/* 
util.promisify方法
*/

// 引入util模块
const util = require('util');

// 引入fs模块
const fs = require('fs');

// 返回一个新的函数，此函数的返回值是一个promise对象
let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./resource/content.txt')
.then(value => {
  console.log(value.toString());
}, reason => {
  console.log(reason);
});

/* 
此方法的好处：
  不需要自己手动进行封装，
  而是借助于util.promisify方法将原来的回调函数风格的方法转变成Promise风格的方法
*/