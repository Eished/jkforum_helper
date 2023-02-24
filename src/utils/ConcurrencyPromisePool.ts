/* eslint-disable @typescript-eslint/no-explicit-any */
/*   
    NodeJS Promise并发控制 
    https://xin-tan.com/2020-09-13-bing-fa-kong-zhi/
  */

class ConcurrencyPromisePool {
  limit: number;
  runningNum: number;
  queue: (() => Promise<unknown>)[];
  results: Promise<unknown>[];
  constructor(limit: number) {
    this.limit = limit;
    this.runningNum = 0;
    this.queue = [];
    this.results = [];
  }

  all(promises: (() => Promise<unknown>)[] = []): Promise<[]> {
    return new Promise((resolve, reject) => {
      for (const promise of promises) {
        // 发送所有 promise
        this._run(promise, resolve, reject);
      }
    });
  }

  _run(promise: () => Promise<unknown>, resolve: (res: any) => void, reject: (reason?: any) => void) {
    // 超出限制的 promise 入队
    if (this.runningNum >= this.limit) {
      // console.log(">>> 达到上限，入队：", promise);
      this.queue.push(promise);
      return;
    }
    // 正在运行的 promise
    ++this.runningNum;
    promise()
      .then((res: any) => {
        this.results.push(res);
        --this.runningNum;

        // 运行结束条件：队列长度 && 正在运行的数量
        if (this.queue.length === 0 && this.runningNum === 0) {
          // promise返回结果, 然后递归结束;
          const results = [...this.results];
          // 清空结果，方便重复使用
          this.results = [];
          return resolve(results);
        }
        // 队列还有则，出队，然后递归调用
        if (this.queue.length) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this._run(this.queue.shift()!, resolve, reject);
        }
      })
      .catch(reject);
  }
}

export { ConcurrencyPromisePool };
