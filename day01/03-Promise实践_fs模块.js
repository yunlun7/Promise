// 读取resource 中的content.txt文件

const fs = require("fs");
const { resolve } = require("path");

/*  回调的形式：

    fs.readFile('./resource/content.txt', function (err, data) {
    // 如果出错，则抛出错误
    if (err){
        throw err;
    } else {
        // 输出文件内容
        console.log(data.toString());
    }

  }); 
  
  */


//   Promise 形式
let p = new Promise((resolve,reject) => {
    fs.readFile('./resource/content.txt', (err, data) => {
        // 如果出错
        if(err) {
            reject(err);
        } else {
            // 如果成功
            resolve(data);
        }
    });
});


// 调用then
p.then(value => {
    console.log(value.toString());
}, reason => {
    console.log(reason);
});