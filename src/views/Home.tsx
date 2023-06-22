import { Counter, IUser, ReplyOrThank } from '@/commonType';
import { Button, Input, Panel, TextArea, Toggle } from '@/components';
import {
  addOnePage,
  addPageBatch,
  checkUpdate,
  downloadImgs,
  noDisplayPic,
  replyOrThk,
  resetReplyData,
  setFastReply,
  swPay,
  swRePic,
  swThk,
  timeControl,
} from '@/lib';
import React, { useRef, useState } from 'react';
import { AutoClickManage } from './AutoClickManage';

interface HomeProps {
  setShowHome: () => void;
  user: IUser;
  setCounter: (num: Counter) => void;
  counter: Counter;
}
export const Home: React.FC<HomeProps> = ({ user, setShowHome, counter, setCounter }) => {
  const mask = useRef<HTMLDivElement>(null);
  const [replyValue, setReplyValue] = useState('');
  const [pageValue, setPageValue] = useState('');
  const [showModal, setShowModal] = useState(false);

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
            label={'自动感谢'}
            onClick={() => {
              swThk(user);
            }}
            checked={user.autoThkSw}
          />
          <Toggle
            label={'自动购买'}
            onClick={() => {
              swPay(user);
            }}
            checked={user.autoPaySw}
          />
          <Toggle
            label={'加载原图'}
            onClick={() => {
              swRePic(user);
            }}
            checked={user.autoRePicSw}
          />
        </Panel>

        <Panel title="批处理">
          <TextArea
            label={'输入回复:'}
            placeholder={'中文分号 ；分隔每条回帖内容，可输入论坛的富文本格式'}
            onChange={setReplyValue}
            value={replyValue}
            rows={2}
          />
          <Input label={'输入页码:'} placeholder={'板块号-起始页-终止页'} onChange={setPageValue} value={pageValue} />
          <Button
            text={'添加当前页'}
            onClick={() => {
              addOnePage(user, replyValue);
            }}
          />
          <Button
            text={'添加页码页'}
            onClick={() => {
              addPageBatch(user, pageValue, replyValue);
            }}
          />
          <Button
            text={'获取快速回复'}
            onClick={() => {
              setFastReply(user);
            }}
          />
          <Button
            text={'重置回帖数据'}
            onClick={() => {
              resetReplyData(user);
            }}
          />
          <Button
            text={'一键回帖'}
            disabled={!!counter.replyBtn}
            onClick={() => {
              replyOrThk(counter, user, ReplyOrThank.REPLY, setCounter);
            }}
          />
          <Button
            text={'一键感谢'}
            disabled={!!counter.thkBtn}
            onClick={() => {
              replyOrThk(counter, user, ReplyOrThank.THANK, setCounter);
            }}
          />
        </Panel>

        <Panel title="高级功能">
          <Button
            text={'定时签到'}
            disabled={!!counter.signBtn}
            onClick={() => {
              timeControl(counter, setCounter, user);
            }}
          />
          <Button
            text={'下载图片'}
            disabled={!!counter.downloadBtn}
            onClick={() => {
              downloadImgs(user, counter, setCounter);
            }}
          />
          <Button
            text={'屏蔽图片'}
            onClick={() => {
              noDisplayPic();
            }}
          />
          <Button
            text={'现在有空'}
            onClick={() => {
              setShowModal(true);
            }}
          />
          <Button
            text={'检查更新'}
            onClick={() => {
              checkUpdate(user);
            }}
          />
        </Panel>

        <br />
        <Button text={'close'} onClick={setShowHome} />
        {showModal ? <AutoClickManage user={user} onClose={() => setShowModal(false)} /> : ''}
      </div>
    </div>
  );
};
