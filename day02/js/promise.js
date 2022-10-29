function Promise(executor) {

// 添加属性
this.PromiseState = 'pending';
this.PromiseResult = null;
this.callbacks = [];

  // console.log(this); // 此时的this指向window，因此如果不改变的话，输出的结果是不会发生变化的


  // 保存实例化对象的this的值，就能改变上面的问题
  const that = this;


// 声明resolve
function resolve (data) {

  //判断状态
  if (that.PromiseState !== 'pending') return; 

  // 1、修改对象状态（promiseState）
  that.PromiseState = 'fulfilled'; // resolved
  // 2、设置对象的结果值（promiseResult）
  that.PromiseResult = data;

    // 调用成功的回调函数
    that.callbacks.forEach(item => {
      item.onResolved(data);
    })
}
// 声明reject
function reject (data) {

  //判断状态
  if (that.PromiseState !== 'pending') return; 

  // 1、修改对象状态（promiseState）
  that.PromiseState = 'rejected'; // resolved
  // 2、设置对象的结果值（promiseResult）
  that.PromiseResult = data;

  // 调用失败的回调函数
  that.callbacks.forEach(item => {
    item.onRejected(data);
  })
}
try {
  // 同步调用 【执行器函数】 调用执行器函数
  executor(resolve, reject);
} catch (e) {
  // 修改promise对象的状态
  reject(e);
}


}

// 为了能够使用then方法，在此处添加then方法
Promise.prototype.then = function (onResolved, onRejected) {

  // 调用回调函数
  // 此时的this是p，因为此方法是由p调用的
  if (this.PromiseState === 'fulfilled') {
    onResolved(this.PromiseResult);
  } 
  if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult);
  }
  if (this.PromiseState === 'pending') {
    // 保留回调函数
    this.callbacks.push({
      onResolved,
      onRejected
    });
  }
}