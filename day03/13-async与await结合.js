/* 
读取 1.html   2.html  文件内容，然后进行拼接

*/


// 使用回调函数的方式实现
/* 
const fs = require('fs');

fs.readFile('./1.html', (err, data1) => {
  if(err) throw err;
  fs.readFile('./2.html', (err, data2) => {
    if (err) throw err;
    fs.readFile('./3.html', (err, data3) => {
      if (err) throw err;
      console.log(data1 + data2 +data3);
    })
  })
})
  */


const fs = require('fs')
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);

// 使用 async 与 await 的方法实现
async function main() {

  // 如果出错，只需要try..catch就可以了
  try {
      // 读取文件的内容
      let data1 = await mineReadFile('./1.html');
      let data2 = await mineReadFile('./2.html');
      let data3 = await mineReadFile('./3.html');
      console.log(data1 + data2 + data3);
  } catch (e) {
    console.log(e);
  }

}

main();