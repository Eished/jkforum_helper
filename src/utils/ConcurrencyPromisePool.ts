/*   
    NodeJS Promise并发控制 
    https://xin-tan.com/2020-09-13-bing-fa-kong-zhi/
  */
class ConcurrencyPromisePool {
  constructor(limit) {
    this.limit = limit;
    this.runningNum = 0;
    this.queue = [];
    this.results = [];
  }

  all(promises = []) {
    return new Promise((resolve, reject) => {
      for (const promise of promises) {
        // 发送所有 promise
        this._run(promise, resolve, reject);
      }
    });
  }

  _run(promise, resolve, reject) {
    // 超出限制的 promise 入队
    if (this.runningNum >= this.limit) {
      // console.log(">>> 达到上限，入队：", promise);
      this.queue.push(promise);
      return;
    }
    // 正在运行的 promise
    ++this.runningNum;
    promise()
      .then((res) => {
        this.results.push(res);
        --this.runningNum;

        // 运行结束条件：队列长度 && 正在运行的数量
        if (this.queue.length === 0 && this.runningNum === 0) {
          // promise返回结果, 然后递归结束;
          return resolve(this.results);
        }
        // 队列还有则，出队，然后递归调用
        if (this.queue.length) {
          this._run(this.queue.shift(), resolve, reject);
        }
      })
      .catch(reject);
  }
}
