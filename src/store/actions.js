import { DESTROY_SESSION, SET_SESSION } from './types';

export const useActions = (state, dispatch) => {
  return {
    login: async (username, password) => {
      console.log(`login with ${username} & ${password}`);
      const session = await new Promise((resolve) => {
        // 模拟接口请求费事 1 秒
        setTimeout(
          () =>
            resolve({
              token: 'J.W.T',
              expireTime: new Date('2030-09-09'),
              user: {
                username,
                password,
              },
            }),
          1000
        );
      });

      // dispatch SET_TOKEN
      dispatch({
        type: SET_SESSION,
        payload: session,
      });

      return session;
    },
    logout: () => {
      dispatch({
        type: DESTROY_SESSION,
      });
    },
  };
};
