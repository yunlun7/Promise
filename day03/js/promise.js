class Promise{
  // 构造方法
  constructor (executor) {
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
      setTimeout(() => {
        // 调用成功的回调函数
        that.callbacks.forEach(item => {
          item.onResolved(data);
        })
      });
    }
    // 声明reject
    function reject (data) {

      //判断状态
      if (that.PromiseState !== 'pending') return; 

      // 1、修改对象状态（promiseState）
      that.PromiseState = 'rejected'; // resolved
      // 2、设置对象的结果值（promiseResult）
      that.PromiseResult = data;

      setTimeout(() => {
        // 调用失败的回调函数
        that.callbacks.forEach(item => {
          item.onRejected(data);
        })
      });
    }
    try {
      // 同步调用 【执行器函数】 调用执行器函数
      executor(resolve, reject);
    } catch (e) {
      // 修改promise对象的状态
      reject(e);
    }
  }

  // then 方法
  then(onResolved, onRejected) {
    const self = this;
    // 判断回调函数参数
    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason;
      }
    }
    if (typeof onResolved !== 'function') {
      onResolved = value => value;  // value => { return value }
    }
    return new Promise((resolve, reject) => {
      // 封装函数
      function callback (type) {
        try {
          // 获取回调函数的执行结果
          let result = type(self.PromiseResult);
          // 判断
          if (result instanceof  Promise)
          {
            // 如果是promise类型的对象，则一定可以使用then方法
            result.then(v => {
              resolve(v);
            }, r => {
              reject(r);
            })
  
          } else {
            // 结果的对象状态为【成功】
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      }
        // 调用回调函数
      // 此时的this是p，因为此方法是由p调用的
      if (this.PromiseState === 'fulfilled') {
        setTimeout(() => {
          callback(onResolved);
        });
  
      } 
  
      if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onRejected);   
        });
  
      }
      if (this.PromiseState === 'pending') {
        // 保留回调函数
        this.callbacks.push({
          onResolved: function () {
            callback(onResolved);
          },
          onRejected: function () {
            callback(onRejected);
          }
        });
      }
    })
  }

  // catch 方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // resolve 方法  使用static声明此方法属于类，而不属于实例对象
  static resolve(value) {
    // 返回promise对象
    return new Promise((resolve, reject) => {
      if  (value instanceof Promise) {
        value.then(v => {
          resolve(v);
        }, r => {
          reject(r);
        })
      } else {
        // 设置成功状态
        resolve(value)
  
      }
    });
  }

  // reject 方法  使用static声明此方法属于类，而不属于实例对象
  static reject(reason) {
    // 返回promise对象
    return new Promise((resolve, reject) => {
        reject(reason);
  });
  }

  // all 方法  使用static声明此方法属于类，而不属于实例对象
  static all(promise) {
    // 返回结果为promise对象
    return new Promise((resolve, reject) => {
      // 计数
      let count = 0;
      let arr = []
      // 遍历
      for(let i = 0; i < promise.length; i++) {
        // 
        promise[i].then(v=> {
          // 得知对象的状态是【成功】的
          // 只有每一个对象都是成功的，参执行resolve
          count++;
          // 将当前promise对象成功的结果存入到数组中
          arr[i] = v;
          if(count === promise.length) {
            // 修改状态
            resolve(arr);
            
          }
        }, r => {
          reject(v);
        })
      }
    });
  }
  
  // race 方法  使用static声明此方法属于类，而不属于实例对象
  static race(promise) {
    // 返回结果是promise对象
    return new Promise((resolve, reject) => {
      for (let i = 0; i< promise.length; i ++) {
        promise[i].then(v => {
          // 修改返回对象的状态为【成功】
          resolve(v)
        }, r => {
          reject(r);
        })
      }
    })
  }
}


// 声明构造函数
/* function Promise(executor) {

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
  setTimeout(() => {
    // 调用成功的回调函数
    that.callbacks.forEach(item => {
      item.onResolved(data);
    })
  });
}
// 声明reject
function reject (data) {

  //判断状态
  if (that.PromiseState !== 'pending') return; 

  // 1、修改对象状态（promiseState）
  that.PromiseState = 'rejected'; // resolved
  // 2、设置对象的结果值（promiseResult）
  that.PromiseResult = data;

  setTimeout(() => {
    // 调用失败的回调函数
    that.callbacks.forEach(item => {
      item.onRejected(data);
    })
  });
}
try {
  // 同步调用 【执行器函数】 调用执行器函数
  executor(resolve, reject);
} catch (e) {
  // 修改promise对象的状态
  reject(e);
}

} */

// 为了能够使用then方法，在此处添加then方法
/* Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  // 判断回调函数参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason;
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value;  // value => { return value }
  }
  return new Promise((resolve, reject) => {
    // 封装函数
    function callback (type) {
      try {
        // 获取回调函数的执行结果
        let result = type(self.PromiseResult);
        // 判断
        if (result instanceof  Promise)
        {
          // 如果是promise类型的对象，则一定可以使用then方法
          result.then(v => {
            resolve(v);
          }, r => {
            reject(r);
          })

        } else {
          // 结果的对象状态为【成功】
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }
      // 调用回调函数
    // 此时的this是p，因为此方法是由p调用的
    if (this.PromiseState === 'fulfilled') {
      setTimeout(() => {
        callback(onResolved);
      });

    } 

    if (this.PromiseState === 'rejected') {
      setTimeout(() => {
        callback(onRejected);   
      });

    }
    if (this.PromiseState === 'pending') {
      // 保留回调函数
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved);
        },
        onRejected: function () {
          callback(onRejected);
        }
      });
    }
  })
} */

// 添加 catch 方法
/* Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
} */

// 添加 resolve 方法
/* Promise.resolve = function (value) {
  // 返回promise对象
  return new Promise((resolve, reject) => {
    if  (value instanceof Promise) {
      value.then(v => {
        resolve(v);
      }, r => {
        reject(r);
      })
    } else {
      // 设置成功状态
      resolve(value)

    }
  });
} */

// 添加 reject 方法
/* Promise.reject = function (reason) {
  // 返回promise对象
  return new Promise((resolve, reject) => {
      reject(reason);
});
} */

// 添加 all 方法
/* Promise.all = function (promise) {
  // 返回结果为promise对象
  return new Promise((resolve, reject) => {
    // 计数
    let count = 0;
    let arr = []
    // 遍历
    for(let i = 0; i < promise.length; i++) {
      // 
      promise[i].then(v=> {
        // 得知对象的状态是【成功】的
        // 只有每一个对象都是成功的，参执行resolve
        count++;
        // 将当前promise对象成功的结果存入到数组中
        arr[i] = v;
        if(count === promise.length) {
          // 修改状态
          resolve(arr);
          
        }
      }, r => {
        reject(v);
      })
    }
  });
} */

// 添加 race 方法
/* Promise.race = function (promise) {
  // 返回结果是promise对象
  return new Promise((resolve, reject) => {
    for (let i = 0; i< promise.length; i ++) {
      promise[i].then(v => {
        // 修改返回对象的状态为【成功】
        resolve(v)
      }, r => {
        reject(r);
      })
    }
  })
} */