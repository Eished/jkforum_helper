function genButton(text, foo, id) {
  let b = document.createElement('button');
  b.textContent = text;
  b.style.cssText = 'margin:16px 10px 0px 0px;float:left';
  if (foo) {
    b.addEventListener('click', foo);
  }
  if (id) {
    b.id = id;
  }
  return b;
}

function genElem(type, id, val1, val2) {
  let b = document.createElement(type);
  b.style.cssText = 'margin:16px 10px 0px 0px;float:left';
  b.rows = val1;
  b.cols = val2;
  b.placeholder = '中文分号；分隔回帖内容';
  b.id = id;
  return b;
}

function genInp(type, id) {
  let b = document.createElement(type);
  b.style.cssText = 'margin:16px 10px 0px 0px;float:left;width:80px';
  b.id = id;
  const user = getUserFromName();
  if (user && user.page) {
    b.value = user.page;
  }
  b.placeholder = `版块-1-2`;
  return b;
}
