import { Counter } from '@/commonType';
import { downloadImgs, noDisplayPic } from '@/lib/downloadPicture';
import { setFastReply } from '@/lib/fastReply';
import { swPay, swThk, swRePic, update } from '@/lib/menuCommand';
import { autoCompleteCaptcha } from '@/lib/orc';
import { timeControl } from '@/lib/sign';
import { IUser } from '@/lib/user';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button/Button';
import { Input } from './Input/Input';
import { Panel } from './Panel/Panel';
import { Toggle } from './Toggle/Toggle';

interface HomeProps {
  setShowHome: () => void;
  user: IUser;
  setCounter: (num: Counter) => void;
  counter: Counter;
}
export const Home: React.FC<HomeProps> = ({ user, setShowHome, counter, setCounter }) => {
  const mask = useRef<HTMLDivElement>(null);

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

        <Panel title="通用设置">
          <Toggle
            text={'自动感谢'}
            onClick={() => {
              swThk(user);
            }}
            checked={!!user.autoThkSw}
          />
          <Toggle
            text={'自动购买'}
            onClick={() => {
              swPay(user);
            }}
            checked={!!user.autoPaySw}
          />
          <Toggle
            text={'加载原图'}
            onClick={() => {
              swRePic(user);
            }}
            checked={!!user.autoRePicSw}
          />
          {/* <Toggle text={'自动签到'} callback={} /> */}
          {/* <Toggle text={'悬浮球靠右'} callback={() => {}} /> */}
        </Panel>

        <Panel title="批处理">
          <Input text={'输入回复:'} placeholder={'中文分号；分隔回帖内容'} />
          <Input text={'输入页码:'} placeholder={'板块号-起始页-终止页'} />
          <Button text={'添加当前页'} onClick={() => {}} />
          <Button text={'添加输入页码页'} onClick={() => {}} />
          <Button
            text={'获取快速回复'}
            onClick={() => {
              setFastReply(user);
            }}
          />
          <Button text={'一键回帖'} onClick={() => {}} />
          <Button text={'一键感谢'} onClick={() => {}} />
        </Panel>

        <Panel title="高级功能">
          <Button
            text={'定时签到'}
            onClick={() => {
              timeControl(counter, setCounter, user);
            }}
          />
          <Button
            text={'下载图片'}
            onClick={() => {
              downloadImgs(user, counter);
            }}
          />
          <Button
            text={'屏蔽图片'}
            onClick={() => {
              noDisplayPic();
            }}
          />
          <Button
            text={'自动现在有空'}
            onClick={() => {
              autoCompleteCaptcha(user);
            }}
          />
          <Button
            text={'检查更新'}
            onClick={() => {
              update(user);
            }}
          />
        </Panel>

        <br />
        <Button text={'close'} onClick={setShowHome} />
      </div>
    </div>
  );
};
