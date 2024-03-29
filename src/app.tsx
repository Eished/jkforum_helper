import { Counter, IUser } from '@/commonType';
import { MessageBox, creatUser, launch } from '@/lib';
import { Home } from '@/views/Home';
import React, { useEffect, useState } from 'react';
const commonMeta = require('@/common.meta.json');

const App: React.FC<{ username: string; formhash: string }> = ({ username, formhash }) => {
  const [user, setUser] = useState<IUser>();
  const [showHome, setShowHome] = useState(false);
  const [counter, setCounter] = useState<Counter>({
    signBtn: 0,
    downloadBtn: 0,
    replyBtn: 0,
    thkBtn: 0,
  }); // 防止按钮重复点击

  useEffect(() => {
    if (!user) {
      creatUser(username, formhash).then((user) => {
        launch(user); // 启动自动签到、投票、加载原图等
        setUser(user);
      });
    }
  }, [username, formhash, user]);

  return (
    <div className="fixed z-50">
      {showHome ? (
        user && (
          <Home
            setShowHome={() => {
              setShowHome(!showHome);
            }}
            user={user}
            counter={counter}
            setCounter={setCounter}
          />
        )
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
          }}
        />
      )}
    </div>
  );
};

export default App;
