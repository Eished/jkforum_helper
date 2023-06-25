import { IUser, Status, ThreadData } from '@/commonType';
import { Button, Input, Modal, ReactTableCard } from '@/components';
import { MessageBox, autofillCaptcha, getData } from '@/lib';
import { ConcurrencyPromisePool } from '@/utils/ConcurrencyPromisePool';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

interface AutoClickManage {
  onClose: () => void;
  user: IUser;
}

export const AutoClickManage: FC<AutoClickManage> = ({ onClose, user }) => {
  const [data, setData] = useState<ThreadData[]>(user.freeData ? [...user.freeData] : []);
  const [token, setToken] = useState(user.token);
  const [threadUrl, setThreadUrl] = useState('');
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(
    user.freeData?.[0]?.runTime ? String(user.freeData[0].runTime.startTime) : '0'
  );
  const [endTime, setEndTime] = useState(user.freeData?.[0]?.runTime ? String(user.freeData[0].runTime.endTime) : '23');
  const [pool] = useState(new ConcurrencyPromisePool(2));
  const isInitialMount = useRef(true);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex: any, columnId: any, value: any) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const deleteData = (rowId: number) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) => {
      old.splice(rowId, 1);
      return [...old];
    });
  };

  const addThread = async () => {
    if (!threadUrl) {
      return alert('请输入帖子链接');
    }
    if (data.some((t) => t.url.includes(threadUrl))) {
      return alert('帖子已存在！');
    }
    if (!threadUrl.includes('https://www.jkforum.net/thread-')) {
      return alert(`帖子地址错误：${threadUrl}`);
    }
    const docu = await getData(threadUrl);
    const topthreadStatus = docu.querySelector('#topthread_status');
    if (!topthreadStatus) {
      return alert('未找到帖子的自动有空元素，请检查帖子');
    }
    const titleCont = docu.querySelector('.title-cont');
    if (!titleCont) {
      return alert('未找到帖子标题');
    }
    const title =
      (titleCont.querySelector('.z')?.textContent ?? '') + (titleCont.querySelector('h1')?.textContent ?? '');

    if (!title) {
      return alert('未找到帖子标题');
    }
    setData([
      ...data,
      {
        status: Status.offline,
        title,
        url: threadUrl,
        cycle: '55',
        times: 0,
        delete: '',
        nextClickTime: 0,
        retry: 0,
        runTime: { startTime: Number(startTime), endTime: Number(endTime) },
      },
    ]);
  };

  const saveData = useCallback(() => {
    user.freeData = data;
    if (token && token.length === 36) {
      user.token !== token ? (user.token = token) : null;
    } else {
      new MessageBox('没有输入令牌 or 令牌无效', 1000);
    }
    GM_setValue(user.username, user);
  }, [data, token, user]);

  const setNextClickTime = (t: ThreadData, skip?: boolean) => {
    setData((old) =>
      old.map((row) => {
        if (row.url === t.url) {
          return {
            ...row,
            times: skip ? row.times : row.times + 1,
            nextClickTime: t.nextClickTime,
            retry: t.retry,
          };
        }
        return row;
      })
    );
  };

  const triggerNextClick = (t: ThreadData) => {
    const onThread = data.find((onlineThread) => onlineThread.status === 'online' && t.url === onlineThread.url);
    if (!onThread) {
      return;
    }

    // 点击时间校验，防止点击时间错乱
    const diff = Math.abs(t.nextClickTime - new Date().getTime());
    // 时间精度过高，误差等于网络超时时间，设置误差60秒
    if (diff < 60000 && t.retry < 10) {
      // 添加任务，在此处开始闭包，递归调用
      pool.all([() => autofillCaptcha(onThread, user, setNextClickTime, saveStatusData, triggerNextClick)]);
    } else if (t.retry >= 10) {
      saveStatusData({ ...onThread, retry: t.retry });
      new MessageBox(
        `帖子：${onThread.title}，连续重试次数过多：${onThread.retry}次，自动现在有空已停止运行！`,
        10000,
        'LOG_POP_GM'
      );
    } else {
      saveStatusData(onThread);
      new MessageBox(
        `帖子：${onThread.title}，已错过点击时间，自动现在有空已停止运行！预设点击时间：${new Date(
          t.nextClickTime
        ).toLocaleString()}，实际时间：${new Date().toLocaleString()}`,
        10000,
        'LOG_POP_GM'
      );
    }
  };

  const saveStatusData = (t: ThreadData) => {
    setData((old) =>
      old.map((row) => {
        if (row.url === t.url) {
          return { ...row, status: Status.offline };
        }
        return row;
      })
    );
  };

  const start = async () => {
    if (!token) {
      return alert('请输入令牌');
    }
    const onThreads = data.filter((t) => t.status === 'online');
    if (!onThreads.length) {
      return alert('请将需要执行的帖子启用状态设为 online');
    }
    setRunning(true);

    const promises = onThreads.map(
      (t) => () => autofillCaptcha(t, user, setNextClickTime, saveStatusData, triggerNextClick)
    );
    pool.all(promises);
  };

  useEffect(() => {
    // only on update
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setSkipPageReset(false);
      saveData();
      if (running && data.every((t) => t.status === 'offline')) {
        setRunning(false);
      }
    }
  }, [data, running, saveData]);

  const setRunTime = () => {
    const startTimeNum = Number(startTime);
    const endTimeNum = Number(endTime);
    if (startTimeNum > 23 || startTimeNum < 0 || endTimeNum > 23 || endTimeNum < 0 || startTimeNum === endTimeNum) {
      return alert('时间必须大于等于0点，小于等于23点');
    }
    setData(data.map((d) => ({ ...d, runTime: { startTime: startTimeNum, endTime: endTimeNum } })));
  };

  return (
    <Modal
      width="w-full"
      height="max-h-[95%]"
      header={<>自动点击现在有空管理页面</>}
      footer={
        <>
          <Button text={'开始执行'} onClick={start} disabled={running} />
          {/* <Button text={'保存'} onClick={saveData} /> */}
          <Button
            title="不使用时请停止运行，修改设置后需要停止重新运行"
            text={'停止自动现在有空'}
            onClick={() => {
              location.reload();
            }}
          />
          <Button title="停止运行自动现在有空后可关闭" text={'关闭页面'} onClick={onClose} disabled={running} />
        </>
      }
      onClose={() => {
        if (running) {
          alert('停止运行自动现在有空后可关闭');
        } else {
          onClose();
        }
      }}>
      <>
        <span className="text-red-500">
          目前本页面仅支持管理一个JKF账号的多个帖子，多个账号请
          <a
            className="text-blue-500 border-b"
            target="_blank"
            href="https://iknow.fun/2023/06/23/chrome-tong-shi-deng-lu-duo-ge-zhang-hao-wang-zhan-duo-kai-jiao-cheng/"
            rel="noreferrer">
            多开浏览器
          </a>
          。
        </span>
        <div className="flex items-end">
          <div className="w-64 pr-4">
            <Input
              autoComplete="off"
              label="输入令牌："
              type="password"
              onChange={(e) => setToken(e.target.value)}
              placeholder="请输入令牌"
              value={token}
            />
          </div>
          <span>还没有令牌？</span>
          <Button
            title="https://jkf.iknow.fun"
            text={'获取令牌'}
            onClick={() => window.open('https://jkf.iknow.fun')}
          />
        </div>
        <div className="flex items-end">
          <div className="w-64">
            <Input
              label="帖子链接："
              onChange={(e) => setThreadUrl(e.target.value)}
              placeholder="请输入帖子链接"
              value={threadUrl}
            />
          </div>
          <div className="ml-4">
            <Button text={'添加'} onClick={addThread} />
          </div>
        </div>
        <div className="flex items-end justify-between w-80 mt-2">
          <span title="设置自动点击仅在该时间段内运行，重新启动后生效">运行时间段：</span>
          <div className="w-8">
            <Input
              type="number"
              min={0}
              max={23}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="0"
              value={startTime}
            />
          </div>
          <span>点 ~ </span>
          <div className="w-8">
            <Input
              type="number"
              min={0}
              max={23}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="23"
              value={endTime}
            />
          </div>
          <span className="pl-2">:59分</span>
          <Button text={'保存'} title="重新启动后生效" onClick={setRunTime} />
        </div>
        <div className="overflow-auto">
          {data.length ? (
            <ReactTableCard
              searchBar={false}
              title={'帖子管理'}
              data={data}
              skipPageReset={skipPageReset}
              updateMyData={updateMyData}
              deleteData={deleteData}
            />
          ) : (
            ''
          )}
        </div>
      </>
    </Modal>
  );
};
