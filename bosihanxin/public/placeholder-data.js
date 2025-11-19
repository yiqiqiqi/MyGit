/**
 * 网站占位数据，正式环境中通常会从API或CMS获取
 */

export const companyInfo = {
  name: "企业科技有限公司",
  slogan: "创新科技，引领未来",
  foundYear: 2010,
  address: "北京市朝阳区科技园区88号",
  phone: "+86 10-12345678",
  email: "contact@company.com",
  socialMedia: {
    weibo: "https://weibo.com/company",
    wechat: "company_wechat",
    linkedin: "https://linkedin.com/company"
  }
};

export const navigationItems = [
  {
    label: "首页",
    link: "/",
    key: "home"
  },
  {
    label: "关于我们",
    link: "/about",
    key: "about",
    submenu: [
      { label: "公司简介", link: "/about/profile" },
      { label: "发展历程", link: "/about/history" },
      { label: "团队介绍", link: "/about/team" }
    ]
  },
  {
    label: "产品与服务",
    link: "/products",
    key: "products",
    submenu: [
      { label: "企业解决方案", link: "/products/solutions" },
      { label: "云服务平台", link: "/products/cloud" },
      { label: "数据分析工具", link: "/products/analytics" },
      { label: "物联网应用", link: "/products/iot" }
    ]
  },
  {
    label: "新闻资讯",
    link: "/news",
    key: "news",
    submenu: [
      { label: "公司动态", link: "/news/company" },
      { label: "行业资讯", link: "/news/industry" },
      { label: "技术分享", link: "/news/tech" }
    ]
  },
  {
    label: "联系我们",
    link: "/contact",
    key: "contact"
  }
];

export const homePageSections = [
  {
    id: "hero",
    title: "创新科技，引领未来",
    subtitle: "提供全方位的企业级解决方案",
    image: "/images/hero.jpg"
  },
  {
    id: "about",
    title: "关于我们",
    content: "作为行业领导者，我们始终致力于为客户提供最优质的产品和服务。十余年来，我们坚持创新，不断突破技术边界，赢得了众多客户的信任与支持。",
    image: "/images/about.jpg"
  },
  {
    id: "products",
    title: "产品与服务",
    items: [
      {
        name: "企业解决方案",
        description: "为企业提供全方位、一体化的信息系统解决方案",
        icon: "solution"
      },
      {
        name: "云服务平台",
        description: "安全可靠的云计算服务，为企业降本增效",
        icon: "cloud"
      },
      {
        name: "数据分析工具",
        description: "强大的数据处理能力，挖掘数据价值",
        icon: "data"
      },
      {
        name: "物联网应用",
        description: "连接智能设备，实现智慧化管理",
        icon: "iot"
      }
    ]
  },
  {
    id: "clients",
    title: "我们的客户",
    clients: [
      { name: "科技公司A", logo: "/images/client1.png" },
      { name: "科技公司B", logo: "/images/client2.png" },
      { name: "科技公司C", logo: "/images/client3.png" },
      { name: "科技公司D", logo: "/images/client4.png" },
      { name: "科技公司E", logo: "/images/client5.png" },
      { name: "科技公司F", logo: "/images/client6.png" }
    ]
  },
  {
    id: "contact",
    title: "联系我们",
    content: "无论您有任何问题或需求，我们的团队随时为您提供支持与服务。",
    contactInfo: {
      address: "北京市朝阳区科技园区88号",
      phone: "+86 10-12345678",
      email: "contact@company.com"
    }
  }
];

export const testimonials = [
  {
    id: 1,
    content: "与企业科技的合作让我们的业务效率提升了30%，他们的解决方案真的很出色。",
    author: "张总",
    company: "某大型制造企业",
    avatar: "/images/avatar1.jpg"
  },
  {
    id: 2,
    content: "企业科技的团队非常专业，他们提供的云服务稳定可靠，为我们节省了大量IT成本。",
    author: "李总",
    company: "某知名电商平台",
    avatar: "/images/avatar2.jpg"
  },
  {
    id: 3,
    content: "数据分析工具帮助我们发现了许多业务机会，对公司战略制定起到了关键作用。",
    author: "王总",
    company: "某金融服务公司",
    avatar: "/images/avatar3.jpg"
  }
]; 