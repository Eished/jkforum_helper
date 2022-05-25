import React, { createContext, useContext, useReducer } from 'react';

export const GlobalContext = createContext();

export const ACTION_NAVBAR_SET = 'navbar/set';
export const ACTION_NAVBAR_RESET = 'navbar/reset';

const defaultContext = {
  navbarActive: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_NAVBAR_SET:
      return {
        ...state,
        navbarActive: action.payload,
      };
    case ACTION_NAVBAR_RESET:
      return {
        ...state,
        navbarActive: null,
      };
    default:
      throw new Error();
  }
};

const ContextProvider = (props) => {
  const [context, dispatch] = useReducer(reducer, defaultContext);

  // eslint-disable-next-line react/prop-types
  return <GlobalContext.Provider value={{ context, dispatch }}>{props.children}</GlobalContext.Provider>;
};

export default ContextProvider;

export const useGlobalContext = () => useContext(GlobalContext);
