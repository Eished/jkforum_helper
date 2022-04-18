import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { creatUser, getUserName, IUser } from '@/lib/user';
import { MessageBox } from './lib/message';
import { launch } from './lib/launch';
import { Counter } from './commonType';

const App = () => {
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
        launch(user, counter); // 启动自动签到、投票、加载原图等
      });

    return () => {};
  }, []);

  const [showHome, setShowHome] = useState(false);
  const [counter, setCounter] = useState<Counter>({ signBtn: 0, playBtn: 0, playSign: 0 }); // 防止按钮重复点击

  return (
    <div className="fixed z-50">
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
          counter={counter}
          setCounter={setCounter}
        />
      )}
    </div>
  );
};

export default App;
