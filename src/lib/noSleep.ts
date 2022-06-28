import { waitFor } from '@/utils/tools';
import { MessageBox } from './';

function genVideo() {
  const video = document.createElement('video');
  video.style.cssText = 'display:none;width:0;height:0;';
  video.loop = true;
  video.autoplay = true;
  video.src =
    'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAwFtZGF0AAACugYF//+23EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMiA3NTk5MjEwIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD00IHRocmVhZHM9MSBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MiBrZXlpbnQ9MjUwIGtleWludF9taW49MTAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz1hYnIgbWJ0cmVlPTEgYml0cmF0ZT0zMjI0IHJhdGV0b2w9MS4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAN2WIhAAa//73wP8Cm7nIA/5tf/+mn7sUx/QF/H/9L//yM6MTo19P+P/2ftGrP+85P/Er/F20Jv8AAALvbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAGQAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAhl0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAAGQAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAACUAAAAlAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAABkAAAAAAABAAAAAAGRbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAAoAAAABABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABPG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAPxzdGJsAAAAmHN0c2QAAAAAAAAAAQAAAIhhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAACUAJQBIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAMmF2Y0MB9AAU/+EAGWf0ABSRmym/GRkIAAADAAgAAAMAoHihTLABAAZo6+xEhEAAAAAYc3R0cwAAAAAAAAABAAAAAQAABAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAC+QAAAAEAAAAUc3RjbwAAAAAAAAABAAAAMAAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTcuMTkuMTAw'; // Base64 离线
  return video;
}

async function playVideo(msId: MessageBox) {
  if (document.querySelector('body > video')) {
    msId.show('防止休眠启动，请保持本页处于激活状态，请勿遮挡、最小化本窗口以及全屏运行其它应用！', 'none');
    return;
  }
  let p = 0;
  const video = genVideo();
  document.body.append(video); //添加视频到指定位置
  video.addEventListener('canplay', videoPlay, {
    once: true,
  }); // 加载完

  function videoPlay() {
    // 播放视频，防止休眠
    // video.removeEventListener("canplay", videoPlay, false); // 循环触发，移除事件监听
    // 显示永久消息通知
    msId.show('防止休眠启动，请保持本页处于激活状态，请勿遮挡、最小化本窗口以及全屏运行其它应用！', 'none');
    p = 99;
  }

  // 重试10次
  await waitFor(5000);
  while (p < 11) {
    if (p == 10) {
      new MessageBox('防休眠启动失败！');
      break;
    } else {
      p++;
      console.log('第' + p + '次重启防休眠');
      video.load();
      await waitFor(5000);
    }
  }
}

export { playVideo };
