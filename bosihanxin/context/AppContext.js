import React, { createContext, useContext, useReducer } from 'react';

// 初始状态
const initialState = {
  theme: 'dark',
  isLoading: false,
  user: null,
  notifications: [],
};

// Action types
const ActionTypes = {
  SET_THEME: 'SET_THEME',
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
};

// Reducer函数
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// 创建上下文
const AppContext = createContext();

/**
 * 应用程序Context提供者
 * 用于在组件树中共享状态
 */
export const AppProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const setTheme = (theme) => {
    dispatch({ type: ActionTypes.SET_THEME, payload: theme });
  };

  const setLoading = (loading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
  };

  const setUser = (user) => {
    dispatch({ type: ActionTypes.SET_USER, payload: user });
  };

  const addNotification = (notification) => {
    const id = Date.now().toString();
    dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      payload: { ...notification, id },
    });
  };

  const removeNotification = (id) => {
    dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
  };

  const value = {
    appState,
    setTheme,
    setLoading,
    setUser,
    addNotification,
    removeNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * 使用应用程序Context的Hook
 * 必须在AppProvider内部使用
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext; 