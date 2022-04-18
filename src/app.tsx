import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { creatUser, getUserName, IUser } from '@/lib/user';
import { MessageBox } from './lib/message';
import { launch } from './lib/launch';
import { Counter } from './commonType';
const commonMeta = require('@/common.meta.json');

const App = () => {
  const username = getUserName();
  if (!username) {
    return <></>;
  }

  const [user, setUser] = useState<IUser>();

  useEffect(() => {
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
  const [counter, setCounter] = useState<Counter>({
    signBtn: 0,
    playBtn: 0,
    playFlag: 0,
    downloadBtn: 0,
    replyBtn: 0,
    thkBtn: 0,
  }); // 防止按钮重复点击

  return (
    <div className="fixed z-50">
      {showHome ? (
        ''
      ) : (
        <button
          className="h-12 w-12 fixed -left-8 top-1/2 block text-white bg-transparent vertical transition ease-in-out delay-150 hover:translate-x-9 hover:scale-110 duration-300 bg-cover bg-center hover:rotate-[360deg]"
          style={{ backgroundImage: `url(${commonMeta.icon})` }}
          onClick={() => {
            if (user) {
              setShowHome(!showHome);
            } else {
              new MessageBox('未获取到用户，请稍后再试');
            }
          }}>
          {/* JKFH */}
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
