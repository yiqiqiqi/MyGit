/**
 * 应用程序常量
 */

/**
 * 公司基本信息
 */
export const COMPANY_INFO = {
  NAME_CN: "南京玻丝焊芯科技有限公司",
  NAME_EN: "EEnous",
  SLOGAN: "专注光纤通信与工业物联网解决方案",
  DESCRIPTION: "南京玻丝焊芯科技有限公司成立于2022年8月，是一家在光纤通信、工业物联网和精密仪器仪表等领域进行深入研发的高新技术企业。公司依托南京邮电大学物联网大学科技园孵化成长，凭借自主研发的三相放电光纤熔接系统以及工业级物联网高精度数据采集器，赢得了业界的广泛认可。",
  MISSION: "通过技术创新推动光纤通信和工业物联网领域的发展，为客户创造更大的价值，为社会贡献更多的力量。",
  FOUNDED_YEAR: "2022",
  EMPLOYEE_COUNT: "50+",
  PATENTS_COUNT: "8+",
  CLIENTS_COUNT: "30+",
  ADDRESS: "南京市江宁区东南大学路9号江宁开发区",
  PHONE: "13951791713",
  EMAIL: "contact@eenous.com",
  WORKING_HOURS: "周一至周五 9:00-18:00"
};

/**
 * 公司业务领域
 */
export const COMPANY_BUSINESSES = [
  {
    id: "fiber_fusion",
    title: "保偏光纤熔接设备",
    shortDesc: "对标藤仓FSM-100P系列，实现80、125μm芯径保偏光纤的低损耗熔接，对接角度误差小于0.08°，为宇航级光纤陀螺仪、宇航级EDFA等提供高效可靠的国产化方案。",
    features: [
      "三相放电熔接技术",
      "对接角度误差<0.08°",
      "支持大芯径光纤熔接",
      "宇航级应用支持",
      "高效稳定的熔接性能"
    ]
  },
  {
    id: "iot_platform",
    title: "智能物联网运维平台",
    shortDesc: "基于4G/5G模块、LLM大语言模型，打造综合性物联网平台，提供设备管理、数据分析、应用开发等功能，利用微调后的工业大语言模型进行预测性维护和智能决策。",
    features: [
      "LLM大语言模型支持",
      "预测性维护功能",
      "异常检测与智能决策",
      "设备全生命周期管理",
      "高效数据分析与可视化"
    ]
  },
  {
    id: "lpwan_solution",
    title: "低功耗广域网解决方案",
    shortDesc: "基于LoRa、NB-IoT、Sigfox等技术，针对智慧农业、环境检测、智能计量、资产追踪等应用场景，实现远距离低功耗条件下的高效数据传输和设备管理。",
    features: [
      "超低功耗设计",
      "远距离数据传输",
      "多协议支持",
      "场景化解决方案",
      "定制化技术服务"
    ]
  },
  {
    id: "precision_measurement",
    title: "高精度多通道传感测量设备",
    shortDesc: "系统采用模块化设计，集成128个测量通道，-40℃至85℃宽温域稳定工作，测量精度可达0.01%，线性度优于0.1%，为高精尖科研和工业测控领域提供可靠的测量数据支撑。",
    features: [
      "128通道模块化设计",
      "0.01%高精度测量",
      "宽温域稳定工作",
      "多种通信接口支持",
      "大容量数据存储"
    ]
  }
];

/**
 * 公司发展历程
 */
export const COMPANY_MILESTONES = [
  {
    year: "2022年8月",
    event: "公司成立，开始研发三相放电光纤熔接系统"
  },
  {
    year: "2022年底",
    event: "获得首轮融资，成立西安研发中心"
  },
  {
    year: "2023年初",
    event: "完成核心技术攻关，申请多项专利"
  },
  {
    year: "2023年中",
    event: "产品进入测试阶段，与多家企业建立合作关系"
  },
  {
    year: "2023年底",
    event: "核心产品实现商业化，在上海、西安、南京、杭州等地落地"
  },
  {
    year: "2024年",
    event: "实现核心产品批量生产，持续拓展市场"
  }
];

/**
 * 研发部门信息
 */
export const RESEARCH_DEPARTMENTS = [
  {
    name: "电子硬件部门",
    location: "西安研发中心",
    description: "负责电子硬件设计与开发，包括电路设计、PCB布局、元器件选型等工作。"
  },
  {
    name: "嵌入式软件部门",
    location: "西安研发中心",
    description: "负责嵌入式系统软件开发，包括底层驱动、实时操作系统应用等。"
  },
  {
    name: "应用软件部门",
    location: "西安研发中心",
    description: "负责上位机软件、移动应用、云平台等应用软件的设计与开发。"
  },
  {
    name: "结构与热仿真部门",
    location: "南京研发中心",
    description: "负责产品结构设计、热分析与仿真，确保产品结构合理、散热良好。"
  },
  {
    name: "光学设计部门",
    location: "南京研发中心",
    description: "负责光学系统设计，包括光路设计、光学元件选型、光学性能优化等。"
  }
];

/**
 * 技术成果
 */
export const TECH_ACHIEVEMENTS = {
  PATENTS: {
    INVENTION: 4,
    UTILITY: 2,
    SOFTWARE_COPYRIGHT: 2
  },
  CORE_TECHNOLOGIES: [
    "三相放电光纤熔接技术",
    "高精度光纤对准算法",
    "工业级物联网数据采集",
    "多通道高精度测量技术",
    "低功耗广域网通信技术"
  ]
};

/**
 * 产品详细信息
 */
export const PRODUCT_DETAILS = {
  FIBER_FUSION: {
    name: "保偏光纤熔接设备",
    model: "EE-FSM-100",
    specs: [
      "支持80、125μm芯径保偏光纤熔接",
      "对接角度误差小于0.08°",
      "三相放电技术，熔接损耗低",
      "自动对准系统，操作简便",
      "适用于宇航级光纤陀螺仪、宇航级EDFA、宇航级光模块等"
    ],
    applications: [
      "卫星激光通信载荷",
      "高精度光纤陀螺仪",
      "光纤放大器",
      "高端光纤传感器",
      "科研实验室"
    ]
  },
  PRECISION_MEASUREMENT: {
    name: "高精度多通道传感测量设备",
    model: "EE-DAQ-128",
    specs: [
      "128个测量通道",
      "工作温度范围: -40℃至85℃",
      "测量精度: 0.01%",
      "线性度: 优于0.1%",
      "内置大容量存储单元",
      "支持RS485总线、以太网或无线通信"
    ],
    applications: [
      "新能源电池测试",
      "物联网传感器校准",
      "工控设备精密测量",
      "科研实验数据采集",
      "工业生产质量控制"
    ]
  }
};

/**
 * 联系地点信息
 */
export const CONTACT_LOCATIONS = [
  {
    name: "南京总部",
    address: "南京市江宁区东南大学路9号江宁开发区",
    phone: "13951791713",
    email: "nanjing@eenous.com"
  },
  {
    name: "西安研发中心",
    address: "西安市高新区科技路50号",
    phone: "18535609150",
    email: "xian@eenous.com"
  },
  {
    name: "上海办事处",
    address: "上海市浦东新区张江高科技园区",
    phone: "021-12345678",
    email: "shanghai@eenous.com"
  },
  {
    name: "杭州办事处",
    address: "杭州市滨江区网络科技园",
    phone: "0571-12345678",
    email: "hangzhou@eenous.com"
  }
];

/**
 * UI配置
 */
export const UI_CONFIG = {
  CAROUSEL: {
    TOTAL_SLIDES: 3,
    EFFECT: "fade",
    THROTTLE_TIME: 800,
    NAVIGATION: true,
    PAGINATION: { clickable: true }
  },
  ANIMATION: {
    DURATION: 800,
    DELAY_INCREMENT: 200
  }
};

/**
 * 轮播图配置
 */
export const CAROUSEL_CONFIG = {
  NAVIGATION: true,
  PAGINATION: { clickable: true },
  EFFECT: "fade",
  SPEED: 1000
};

export default {
  COMPANY_INFO,
  COMPANY_BUSINESSES,
  COMPANY_MILESTONES,
  RESEARCH_DEPARTMENTS,
  CONTACT_LOCATIONS,
  UI_CONFIG,
  CAROUSEL_CONFIG,
  TECH_ACHIEVEMENTS,
  PRODUCT_DETAILS
}; 