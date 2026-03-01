# Pet Health - 宠物健康管家系统

一个帮助宠物主人全面管理宠物健康的生活服务应用。

## 功能特性

- 宠物档案管理
- 饮食记录
- 疫苗记录与到期提醒
- 遛弯轨迹记录
- 健康周报生成
- 宠物情绪识别（模拟）

## 技术栈

### 前端
- Next.js 14 + React 18
- TypeScript
- Tailwind CSS
- Zustand

### 后端
- Nest.js
- MongoDB + Redis
- JWT 认证

### 部署
- Docker + Docker Compose
- Nginx 反向代理

## 项目结构

```
pet-health/
├── apps/
│   ├── web/          # Next.js Web 应用
│   └── server/       # Nest.js 后端服务
├── packages/
│   └── shared/       # 共享类型和工具
├── docker/           # Docker 配置
└── docs/             # 文档
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8
- MongoDB
- Redis

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev:server
pnpm dev:web
```

### Docker 部署

```bash
cd docker
docker-compose up -d
```

## 环境变量

参考 `apps/server/.env.example` 配置环境变量：

- `DATABASE_URL` - MongoDB 连接字符串
- `REDIS_HOST` - Redis 主机地址
- `REDIS_PORT` - Redis 端口
- `JWT_SECRET` - JWT 密钥
- `JWT_EXPIRES_IN` - Token 过期时间

## API 文档

启动服务后访问：`http://localhost:3001/api/docs`

## License

MIT
