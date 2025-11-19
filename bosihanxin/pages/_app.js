import React from 'react';
import { AppProvider } from '../context/AppContext';
import '../styles/globals.css'; // 如果有全局样式

/**
 * 自定义App组件
 * 用于包装所有页面并提供全局状态
 */
function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp; 