// 退避策略类型
type BackoffStrategy = 'exponential' | 'fixed';

// 重试配置接口
interface RetryConfig {
  maxAttempts: number;
  baseDelay: number; // 基础延迟时间（毫秒）
  strategy: BackoffStrategy;
  maxDelay?: number; // 最大延迟时间，防止延迟过长
}

// 重试结果接口
interface RetryResult<T> {
  success: boolean;
  result?: T;
  error?: Error;
  attempts: number;
}

class RetryBackoff {
  private config: Required<RetryConfig>;

  constructor(config: RetryConfig) {
    this.config = {
      maxDelay: 30000, // 默认最大延迟30秒
      ...config,
    };
  }

  /**
   * 计算延迟时间
   * @param attempt 当前尝试次数 (1-based)
   * @returns 延迟时间（毫秒）
   */
  private calculateDelay(attempt: number): number {
    const { baseDelay, strategy, maxDelay } = this.config;

    let delay: number;

    if (strategy === 'exponential') {
      // 指数退避: 2^(attempts-1) * baseDelay
      delay = Math.pow(2, attempt - 1) * baseDelay;
    } else {
      // 固定退避
      delay = baseDelay;
    }

    // 限制最大延迟时间
    return Math.min(delay, maxDelay);
  }

  /**
   * 执行重试操作
   * @param operation 要重试的异步操作
   * @returns 重试结果
   */
  async retry<T>(operation: () => Promise<T>): Promise<RetryResult<T>> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= this.config.maxAttempts; attempt++) {
      try {
        const result = await operation();
        return {
          success: true,
          result,
          attempts: attempt,
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // 如果是最后一次尝试，不需要等待
        if (attempt === this.config.maxAttempts) {
          break;
        }

        // 计算延迟时间并等待
        const delay = this.calculateDelay(attempt);
        console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
        await this.sleep(delay);
      }
    }

    return {
      success: false,
      error: lastError,
      attempts: this.config.maxAttempts,
    };
  }

  /**
   * 预览延迟序列（用于调试）
   * @returns 延迟时间数组
   */
  getDelaySequence(): number[] {
    const delays: number[] = [];
    for (let attempt = 1; attempt <= this.config.maxAttempts; attempt++) {
      delays.push(this.calculateDelay(attempt));
    }
    return delays;
  }

  /**
   * 睡眠函数
   * @param ms 毫秒
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// 使用示例
async function example() {
  // 指数退避策略
  const exponentialRetry = new RetryBackoff({
    maxAttempts: 10,
    baseDelay: 1000, // 1秒基数
    strategy: 'exponential',
    maxDelay: 60000, // 最大60秒
  });

  // 模拟一个可能失败的异步操作
  const unreliableOperation = async (): Promise<string> => {
    if (Math.random() > 1) {
      return 'Success!';
    }
    throw new Error('Operation failed');
  };

  try {
    console.log('=== 指数退避策略 ===');
    console.log('延迟序列:', exponentialRetry.getDelaySequence());

    const result = await exponentialRetry.retry(unreliableOperation);

    if (result.success) {
      console.log(`操作成功! 结果: ${result.result}, 尝试次数: ${result.attempts}`);
    } else {
      console.log(`操作失败! 错误: ${result.error?.message}, 尝试次数: ${result.attempts}`);
    }
  } catch (error) {
    console.error('执行出错:', error);
  }
}

export { RetryBackoff, type BackoffStrategy, type RetryConfig, type RetryResult };
