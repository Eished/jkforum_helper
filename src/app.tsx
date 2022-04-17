import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { creatUser, getUserName, IUser } from '@/lib/user';
import { MessageBox } from './lib/message';
import { launch } from './lib/launch';

const App = () => {
  // 初始化消息盒子
  MessageBox.genMessageBox();

  // 没有登录则退出
  const username = getUserName();
  if (!username) {
    return <></>;
  }

  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    // addDom(); // 添加DOM
    creatUser(username)
      .then((user) => {
        setUser(user);
        return user;
      })
      .then((user) => {
        launch(user); // 启动自动签到、投票、加载原图等
      }); // 添加用户, 全局变量，每个页面只获取一次

    return () => {};
  }, []);

  const [showHome, setShowHome] = useState(false);

  return (
    <div className="fixed z-10">
      {showHome ? (
        ''
      ) : (
        <button
          className="h-10 w-10 fixed -left-5 top-1/2 block rounded-full shadow-md text-white vertical transition ease-in-out delay-150 bg-indigo-600 hover:translate-x-5 hover:scale-110 hover:bg-indigo-500 duration-300"
          onClick={() => {
            if (user) {
              setShowHome(!showHome);
            } else {
              new MessageBox('未获取到用户，请稍后再试');
            }
          }}>
          JKFH
        </button>
      )}
      {showHome && user && (
        <Home
          setShowHome={() => {
            setShowHome(!showHome);
          }}
          user={user}
        />
      )}
    </div>
  );
};

export default App;
