/**
 * 应用程序主题系统
 * 定义全局的设计变量和主题
 */

export const colors = {
  // 主要品牌色
  primary: {
    light: '#4e95ff',
    main: '#0072fe',
    dark: '#0050b3',
    contrastText: '#ffffff',
  },
  
  // 辅助色
  secondary: {
    light: '#6e7dfa',
    main: '#4f58e5',
    dark: '#3040c0',
    contrastText: '#ffffff',
  },
  
  // 文本颜色
  text: {
    primary: '#333333',
    secondary: '#666666',
    disabled: '#999999',
    hint: '#bbbbbb',
    light: '#ffffff',
  },
  
  // 背景色
  background: {
    default: '#f2f6fc',
    paper: '#ffffff',
    dark: '#1a1a2e',
    gradient: 'linear-gradient(135deg, #0a2342, #1c4587)',
  },
  
  // 状态颜色
  state: {
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
  },
};

export const typography = {
  fontFamily: {
    primary: "'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif",
    heading: "'Poppins', 'Noto Sans SC', sans-serif",
  },
  
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    md: '1.125rem',    // 18px
    lg: '1.25rem',     // 20px
    xl: '1.5rem',      // 24px
    '2xl': '1.875rem', // 30px
    '3xl': '2.25rem',  // 36px
    '4xl': '3rem',     // 48px
    '5xl': '3.75rem',  // 60px
    '6xl': '4.5rem',   // 72px
  },
  
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
};

export const breakpoints = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1600px',
};

export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 15px 25px rgba(0, 0, 0, 0.1)',
  '2xl': '0 20px 40px rgba(0, 0, 0, 0.1)',
};

export const transitions = {
  fast: 'all 0.2s ease',
  normal: 'all 0.3s ease',
  slow: 'all 0.5s ease',
};

export const borders = {
  radius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.25rem', // 20px
    full: '9999px',
  },
};

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// 综合主题
export const theme = {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  transitions,
  borders,
  zIndex,
};

export default theme; 