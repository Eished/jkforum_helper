/* 
    消息通知类：
    0.先调用静态方法 genMessageBox() 方法初始化消息弹出窗口
    1.传参默认值：消息，持续时间，重要性
    2.持续时间非数字时为永久消息，需手动移除 removeMessage() ；
    3.初始化用 new MessageBox() 参数为空时，调用 showMessage() 传参显示消息；用于增大作用域。refreshMessage() 刷新永久消息；
    4.重要性：1 = log + 自定义弹窗；2 = log + 自定义弹窗 + GM；默认 = 自定义弹窗；
  */
class MessageBox {
  _msg: undefined | null | HTMLDivElement;
  _text: string | undefined;
  _setTime: number | string;
  _important: string | number;
  _timer: number;
  constructor(text?: string, setTime: number | string = 5000, important: number = 1) {
    this._msg = null; // 永久显示标记，和元素地址
    this._text = text;
    this._setTime = setTime;
    this._important = important;
    this._timer = 0; // 计数器
    // 非空初始化，立即执行；
    if (text !== undefined) {
      this.showMessage();
    }
  }

  // 静态属性，消息盒子
  static _msgBox: HTMLDivElement;
  // 静态方法，初始化消息盒子，先调用本方法初始化消息弹出窗口
  static genMessageBox() {
    this._msgBox = document.createElement('div'); // 创建类型为div的DOM对象
    this._msgBox.id = 'messageBox';
    document.body.append(this._msgBox); // 消息盒子添加到body
  }

  // 显示消息
  showMessage(text = this._text, setTime = this._setTime, important = this._important) {
    if (this._msg !== null) {
      throw new Error('先移除上条消息，才可再次添加！');
    }
    if (text === undefined) {
      throw new Error('未输入消息');
    }
    this._text = text;
    this._setTime = setTime;
    this._important = important;

    this._msg = document.createElement('div');
    this._msg.textContent = text;
    MessageBox._msgBox.append(this._msg); // 显示消息

    switch (important) {
      case 1: {
        console.log(text);
        break;
      }
      case 2: {
        console.log(text);
        GM_notification(text);
        break;
      }

      default: {
        break;
      }
    }

    if (setTime && !isNaN(Number(setTime))) {
      // 默认5秒删掉消息，可设置时间，none一直显示
      setTimeout(() => {
        this.removeMessage();
      }, Number(setTime));
    }
  }

  refreshMessage(text: string) {
    if (isNaN(Number(this._setTime)) && this._msg) {
      this._msg.textContent = text;
      switch (this._important) {
        case 1: {
          console.log(text);
          break;
        }
        case 2: {
          console.log(text);
          GM_notification(text);
          break;
        }

        default: {
          break;
        }
      }
    } else {
      throw new Error('只有弹窗永久消息支持刷新内容：' + this._setTime);
    }
  }

  // 移除方法，没有元素则等待setTime 5秒再试5次
  removeMessage() {
    if (this._msg != null) {
      this._msg.remove();
      this._msg = null; // 清除标志位
    } else {
      // 空初始化时，消息异步发送，导致先执行移除而获取不到元素，默认 setTime=5000
      // 消息发出后，box 非空，可以移除，不会执行 setTime="none"
      if (this._timer == 4) {
        throw new Error('移除的元素不存在：' + this._msg);
      }
      this._timer++;
      setTimeout(() => {
        this.removeMessage();
      }, Number(this._setTime));
    }
  }
}

export { MessageBox };
