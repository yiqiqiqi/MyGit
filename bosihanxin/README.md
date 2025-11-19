# 现代企业官网项目

这是一个使用Next.js、React和Tailwind CSS构建的现代化企业官网项目。

## 功能特点

- 响应式设计，适配各种设备
- 全屏滚动页面展示
- 现代化UI设计和平滑动画效果
- 模块化组件结构
- SEO优化
- 多语言支持
- 性能优化

## 技术栈

- **前端框架**: Next.js 14.2.4
- **UI库**: React 18
- **样式**: Tailwind CSS
- **组件库**: Ant Design
- **动画**: Framer Motion
- **轮播**: Swiper
- **路由进度**: NProgress

## 快速开始

### 前提条件

- Node.js 16.x 或更高版本
- npm 或 yarn

### 安装步骤

1. 克隆仓库
   ```bash
   git clone <仓库地址>
   cd <项目目录>
   ```

2. 安装依赖
   ```bash
   npm install
   # 或
   yarn
   ```

3. 复制示例环境变量文件
   ```bash
   cp .env.example .env.local
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

5. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
# 或
yarn build
yarn start
```

## 项目结构

```
/
├── components/          # 可复用组件
├── context/             # React上下文
├── hooks/               # 自定义钩子
├── pages/               # 页面文件和路由
├── public/              # 静态资源
├── styles/              # 全局样式
├── tailwind.config.js   # Tailwind配置
└── next.config.js       # Next.js配置
```

## 自定义配置

### 修改主题颜色

编辑 `tailwind.config.js` 文件中的颜色配置。

### 添加新页面

在 `pages` 目录中创建新的页面文件。

### 修改导航菜单

编辑 `components/Header.js` 文件中的菜单项。

## 常见问题

**Q: 图片无法显示?**  
A: 确保已将所有图片资源放在 `public` 目录下，并且引用路径正确。

**Q: 如何添加新的依赖?**  
A: 使用 `npm install <包名>` 或 `yarn add <包名>` 添加新的依赖。

## 贡献指南

1. Fork 这个项目
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的修改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 许可证

此项目基于 MIT 许可证 - 查看 LICENSE 文件了解详情。
