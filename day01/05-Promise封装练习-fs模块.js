/* 
封装一个函数 mineReadFile  获取文件内容
参数： path 路径
返回: promise 对象
*/

function mineReadFile (path) {
  return new Promise((resolve, reject) => {
    // 读取文件
    require('fs').readFile(path, (err, data) => {
      // 判断
      if (err) throw err
      // 成功
      resolve(data);
    })
  })
}

mineReadFile('./resource/content.txt')
.then(value => {
  console.log(value.toString());
}, reason => {
  console.log(reason);
})