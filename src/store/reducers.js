import { DESTROY_SESSION, SET_SESSION } from './types';

const initialState = {
  // 会话信息
  session: {
    // J.W.T Token
    token: '',
    // 用户信息
    user: null,
    // 过期时间
    expireTime: null,
  },
};

const reducer = (state = initialState, action) => {
  console.log({ oldState: state, ...action });

  const { type, payload } = action;
  switch (type) {
    case SET_SESSION:
      return {
        ...state,
        session: {
          ...state.session,
          ...payload,
        },
      };
    case DESTROY_SESSION:
      return {
        ...state,
        session: { ...initialState },
      };
    default:
      throw new Error('Unexpected action');
  }
};

export { initialState, reducer };
