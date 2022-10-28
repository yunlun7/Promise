# promise的状态改变

- promise的状态实质上就是promise实例对象中的属性 【PromiseState】

​			其属性对应着三个值：pending、resolved、rejected

- 状态的改变：

  - pending变为resolved
  - pending变为rejected

  说明：只有这两种，且一个promise对象只能改变一次；

  ​	无论最后是成功还是失败，都会有一个结果数据；

  ​	成功的数据一般称为value，失败的结果一般称为reason；





# Promise 对象的值

- 实例对象中的另一个属性 【PromiseResult】；

- 此属性存储的是异步任务对象成功或失败的结果；

- 该属性有且仅有resolve()和reject()这两个方法可以对其进行修改或赋值；
