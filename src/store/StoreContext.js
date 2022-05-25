import React, { createContext, useEffect, useReducer } from 'react';
import { useActions } from './actions';
import { initialState, reducer } from './reducers';

const StoreContext = createContext(initialState);

// eslint-disable-next-line react/prop-types
function StoreProvider({ children }) {
  // 设置 reducer，得到 `dispatch` 方法以及 `state`
  const [state, dispatch] = useReducer(reducer, initialState);

  // 生成 `actions` 对象
  const actions = useActions(state, dispatch);

  // 打印出新的 `state`
  useEffect(() => {
    console.log({ newState: state });
  }, [state]);

  // 渲染 state, dispatch 以及 actions
  return <StoreContext.Provider value={{ state, dispatch, actions }}>{children}</StoreContext.Provider>;
}

export { StoreContext, StoreProvider };
