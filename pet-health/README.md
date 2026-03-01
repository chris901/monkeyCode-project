# Pet Health - 宠物健康管家系统

一个帮助宠物主人全面管理宠物健康的生活服务应用，支持 Web 端和微信小程序端。

## 功能特性

### 核心功能
- 宠物档案管理 - 记录宠物基本信息、照片、生日、品种等
- 饮食记录 - 记录每日喂食时间、食物类型、食量
- 疫苗管理 - 疫苗接种记录、到期提醒
- 遛弯轨迹 - 实时 GPS 追踪或手动记录遛弯路线
- 健康周报 - 自动生成宠物健康数据周报
- 情绪识别 - 上传照片识别宠物情绪（模拟实现）

### 用户系统
- 多种登录方式：手机号/密码、手机验证码、微信授权
- JWT Token 认证
- 多端数据同步

## 技术栈

### 前端
| 技术 | 说明 |
|------|------|
| Next.js 14 | React 全栈框架 |
| React 18 | UI 组件库 |
| TypeScript | 类型安全 |
| Tailwind CSS | 原子化 CSS |
| Zustand | 轻量状态管理 |
| Axios | HTTP 客户端 |

### 后端
| 技术 | 说明 |
|------|------|
| Nest.js | 企业级 Node.js 框架 |
| MongoDB | 文档型数据库 |
| Redis | 缓存、验证码存储 |
| Mongoose | MongoDB ODM |
| Passport.js | 认证中间件 |
| JWT | Token 认证 |
| Swagger | API 文档 |

### 部署
| 技术 | 说明 |
|------|------|
| Docker | 容器化 |
| Docker Compose | 服务编排 |
| Nginx | 反向代理 |

## 项目结构

```
pet-health/
├── apps/
│   ├── web/                      # Next.js Web 应用
│   │   ├── src/
│   │   │   ├── app/              # 页面路由 (App Router)
│   │   │   ├── components/       # 公共组件
│   │   │   ├── hooks/            # 自定义 Hooks
│   │   │   ├── stores/           # Zustand 状态管理
│   │   │   ├── services/         # API 服务封装
│   │   │   └── utils/            # 工具函数
│   │   └── package.json
│   │
│   └── server/                   # Nest.js 后端服务
│       ├── src/
│       │   ├── modules/          # 功能模块
│       │   │   ├── auth/         # 用户认证
│       │   │   ├── pets/         # 宠物管理
│       │   │   ├── diet/         # 饮食记录
│       │   │   ├── vaccines/     # 疫苗记录
│       │   │   ├── walks/        # 遛弯轨迹
│       │   │   ├── reports/      # 健康周报
│       │   │   └── emotion/      # 情绪识别
│       │   ├── common/           # 公共模块
│       │   │   ├── guards/       # 守卫
│       │   │   ├── decorators/   # 装饰器
│       │   │   └── config/       # 配置
│       │   └── main.ts
│       └── package.json
│
├── packages/
│   └── shared/                   # 共享代码
│       └── src/
│           ├── types/            # 类型定义
│           └── utils/            # 工具函数
│
├── docker/                       # Docker 配置
│   ├── docker-compose.yml
│   ├── Dockerfile.server
│   ├── Dockerfile.web
│   └── nginx.conf
│
├── docs/                         # 文档
├── package.json                  # Monorepo 根配置
├── pnpm-workspace.yaml           # pnpm 工作区配置
└── README.md
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- MongoDB >= 6.0
- Redis >= 7.0

### 本地开发

1. 克隆项目
```bash
git clone https://github.com/chris901/monkeyCode-project.git
cd monkeyCode-project/pet-health
```

2. 安装依赖
```bash
pnpm install
```

3. 配置环境变量
```bash
cp apps/server/.env.example apps/server/.env
# 编辑 .env 文件，配置数据库连接等
```

4. 启动开发服务
```bash
# 启动后端服务 (端口 3001)
pnpm dev:server

# 启动前端服务 (端口 3000)
pnpm dev:web
```

5. 访问应用
- Web 应用: http://localhost:3000
- API 文档: http://localhost:3001/api/docs

### Docker 部署

1. 一键启动所有服务
```bash
cd docker
docker-compose up -d
```

2. 查看服务状态
```bash
docker-compose ps
```

3. 访问应用
- Web 应用: http://localhost
- API 文档: http://localhost/api/docs

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| DATABASE_URL | MongoDB 连接字符串 | mongodb://localhost:27017/pet-health |
| REDIS_HOST | Redis 主机地址 | localhost |
| REDIS_PORT | Redis 端口 | 6379 |
| JWT_SECRET | JWT 密钥 | (必须设置) |
| JWT_EXPIRES_IN | Token 过期时间 | 7d |
| PORT | 服务端口 | 3001 |

## API 接口

### 认证模块 `/api/auth`
| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /register | 用户注册 |
| POST | /login | 账号密码登录 |
| POST | /login/phone | 手机验证码登录 |
| POST | /login/wechat | 微信授权登录 |
| GET | /profile | 获取用户信息 |
| PUT | /profile | 更新用户信息 |

### 宠物模块 `/api/pets`
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取宠物列表 |
| POST | / | 创建宠物档案 |
| GET | /:id | 获取宠物详情 |
| PUT | /:id | 更新宠物信息 |
| DELETE | /:id | 删除宠物档案 |

### 饮食记录 `/api/pets/:petId/diet`
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取饮食记录 |
| POST | / | 添加饮食记录 |
| PUT | /:id | 更新记录 |
| DELETE | /:id | 删除记录 |

### 疫苗记录 `/api/pets/:petId/vaccines`
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取疫苗记录 |
| GET | /alerts | 获取到期提醒 |
| POST | / | 添加疫苗记录 |
| PUT | /:id | 更新记录 |
| DELETE | /:id | 删除记录 |

### 遛弯记录 `/api/pets/:petId/walks`
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取遛弯记录 |
| POST | / | 添加记录 |
| POST | /track | 实时上传轨迹 |
| PUT | /:id | 更新记录 |
| DELETE | /:id | 删除记录 |

### 健康周报 `/api/pets/:petId/reports`
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取周报列表 |
| GET | /latest | 获取最新周报 |
| POST | /generate | 生成周报 |

### 情绪识别 `/api/pets/:petId/emotion`
| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /analyze | 上传照片分析 |
| GET | /history | 获取识别历史 |

## 开发指南

### 添加新模块

1. 在 `apps/server/src/modules/` 创建模块目录
2. 创建 Schema、Repository、Service、Controller
3. 在 `app.module.ts` 中注册模块

### 代码规范

- 使用 ESLint + Prettier 进行代码格式化
- 遵循 TypeScript 严格模式
- 提交信息遵循 Conventional Commits

### 测试

```bash
# 运行后端测试
pnpm --filter @pet-health/server test

# 运行 e2e 测试
pnpm --filter @pet-health/server test:e2e
```

## 待办事项

- [ ] 接入真实 AI 服务实现情绪识别
- [ ] 配置微信开放平台 AppID 启用微信登录
- [ ] 开发微信小程序端
- [ ] 添加消息推送功能
- [ ] 支持多语言

## 贡献指南

欢迎提交 Issue 和 Pull Request。

## License

MIT

## 联系方式

如有问题，请提交 Issue 或联系项目维护者。
