import { swPay, swThk, swRePic } from '@/lib/menuCommand';
import { creatUser, getUserName, IUser } from '@/lib/user';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button/Button';
import { Input } from './Input/Input';
import { Panel } from './Panel/Panel';
import { Toggle } from './Toggle/Toggle';

interface HomeProps {
  setShowHome: () => void;
  user: IUser;
}
export const Home: React.FC<HomeProps> = ({ user, setShowHome }) => {
  const mask = useRef<HTMLDivElement>(null);
  // 油猴菜单开关  // 必须在 user 后面调用，否则 user 还没初始化就绑定函数了
  // GM_registerMenuCommand('🔎 加载原图开关', swRePic);
  // GM_registerMenuCommand('💰 自动购买开关', swPay);
  // GM_registerMenuCommand('❤ 自动感谢开关', swThk);
  // GM_registerMenuCommand('💡 自动现在有空', autoCompleteCaptcha);
  // GM_registerMenuCommand('🛠 检查更新', update);
  return (
    <div
      ref={mask}
      className="fixed top-0 w-screen h-screen flex flex-col justify-center"
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (mask.current && mask.current === e.target) {
          setShowHome();
        }
      }}>
      <div className="h-fit w-72 p-2 m-2 bg-gray-50 shadow-md rounded-md flex flex-col border">
        <h3 className="text-sm text-center font-bold border-b">JKForum Helper</h3>

        <Panel title="日常任务">
          <>
            {/* <Toggle text={'自动签到'} callback={} /> */}
            <Toggle
              text={'自动感谢'}
              callback={() => {
                swPay(user);
              }}
              checked={!!user.autoThkSw}
            />
            <Toggle
              text={'自动购买'}
              callback={() => {
                swThk(user);
              }}
              checked={!!user.autoPaySw}
            />
            <Toggle
              text={'加载原图'}
              callback={() => {
                swRePic(user);
              }}
              checked={!!user.autoRePicSw}
            />
            {/* <Toggle text={'悬浮球靠右'} callback={() => {}} /> */}
          </>
        </Panel>

        <Panel title="批处理">
          <>
            <Input text={'输入回复'} />
            <Input text={'页码：板块号-起始页-终止页'} />
            <Button text={'添加当前页'} setShowHome={setShowHome} />
            <Button text={'添加指定页码页'} setShowHome={setShowHome} />
            <Button text={'获取快速回复'} setShowHome={setShowHome} />
            <Button text={'一键回帖'} setShowHome={setShowHome} />
            <Button text={'一键感谢'} setShowHome={setShowHome} />
          </>
        </Panel>
        <Panel title="高级功能">
          <>
            <Button text={'定时签到'} setShowHome={setShowHome} />
            <Button text={'下载图片'} setShowHome={setShowHome} />
            <Button text={'屏蔽图片'} setShowHome={setShowHome} />
            <Button text={'自动现在有空'} setShowHome={setShowHome} />
            <Button text={'检查更新'} setShowHome={setShowHome} />
          </>
        </Panel>

        <br />
        <Button text={'close'} setShowHome={setShowHome} />
      </div>
    </div>
  );
};
