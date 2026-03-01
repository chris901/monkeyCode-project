# 宠物健康管家系统 - 技术设计文档

> 创建日期：2026-03-01

## 一、项目概述

**宠物健康管家系统**：一个帮助宠物主人全面管理宠物健康的生活服务应用。

### 核心功能模块

1. **宠物档案** - 宠物基本信息、照片、生日、品种等
2. **饮食管理** - 记录每日喂食时间、食物类型、食量
3. **疫苗管理** - 疫苗接种记录、到期提醒
4. **遛弯轨迹** - 实时 GPS 追踪或手动记录遛弯路线
5. **健康周报** - 自动生成宠物健康数据周报
6. **情绪识别** - 上传照片识别宠物情绪（第一版模拟实现）
7. **用户系统** - 多种登录方式、多端数据同步

### 平台覆盖

Web (Next.js) + 微信小程序 (Taro)

---

## 二、技术架构

### 前端技术栈

- **Web 端**：React 18 + Next.js 14 + TypeScript + Tailwind CSS + Zustand（状态管理）
- **小程序端**：Taro 3 + React + TypeScript（代码与 Web 端最大化复用）
- **地图服务**：腾讯地图 / 高德地图（支持轨迹绘制）

### 后端技术栈

- **框架**：Nest.js + TypeScript
- **数据库**：MongoDB（主存储）+ Redis（缓存）
- **文件存储**：本地存储 / 阿里云 OSS（宠物照片）
- **认证**：JWT + 微信 OAuth

### 部署方案

- **容器化**：Docker + Docker Compose
- **反向代理**：Nginx
- **服务**：Web、API、小程序后端统一部署

---

## 三、系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        客户端层                              │
├─────────────────────────┬───────────────────────────────────┤
│     Web (Next.js)       │      微信小程序 (Taro)            │
│   - 响应式页面           │    - 原生体验                    │
│   - PWA 支持             │    - 微信授权登录                 │
└────────────┬────────────┴──────────────┬────────────────────┘
             │                           │
             └───────────┬───────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Nginx 反向代理                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   API 服务层 (Nest.js)                       │
│  - 用户认证服务                                              │
│  - 宠物管理服务                                              │
│  - 饮食/疫苗/轨迹服务                                        │
│  - 周报生成服务                                              │
│  - 情绪识别服务 (模拟)                                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ MongoDB  │    │  Redis   │    │ 文件存储  │
    │ (主存储)  │    │  (缓存)   │    │ (OSS/本地)│
    └──────────┘    └──────────┘    └──────────┘
```

---

## 四、数据模型设计

### 1. 用户 (User)

```typescript
{
  _id: ObjectId,
  openid: string,           // 微信 openid
  unionid: string,          // 微信 unionid
  phone: string,            // 手机号
  password: string,         // 密码（加密）
  nickname: string,         // 昵称
  avatar: string,           // 头像
  loginType: ['wechat', 'phone'], // 登录方式
  createdAt: Date,
  updatedAt: Date
}
```

### 2. 宠物 (Pet)

```typescript
{
  _id: ObjectId,
  userId: ObjectId,         // 关联用户
  name: string,             // 名称
  type: string,             // 类型：dog/cat/other
  breed: string,            // 品种
  gender: string,           // 性别：male/female
  birthDate: Date,          // 生日
  weight: number,           // 体重（kg）
  avatar: string,           // 照片
  chipId: string,           // 芯片号
  notes: string,            // 备注
  createdAt: Date,
  updatedAt: Date
}
```

### 3. 饮食记录 (DietRecord)

```typescript
{
  _id: ObjectId,
  petId: ObjectId,          // 关联宠物
  date: Date,               // 日期
  mealType: string,         // 餐次：breakfast/lunch/dinner/snack
  foodType: string,         // 食物类型
  amount: number,           // 食量
  unit: string,             // 单位：g/cup/can
  notes: string,            // 备注
  createdAt: Date
}
```

### 4. 疫苗记录 (VaccineRecord)

```typescript
{
  _id: ObjectId,
  petId: ObjectId,          // 关联宠物
  vaccineName: string,      // 疫苗名称
  type: string,             // 类型：rabies/combined/other
  inoculationDate: Date,    // 接种日期
  nextDate: Date,           // 下次接种日期
  hospital: string,         // 接种医院
  notes: string,            // 备注
  createdAt: Date
}
```

### 5. 遛弯记录 (WalkRecord)

```typescript
{
  _id: ObjectId,
  petId: ObjectId,          // 关联宠物
  startTime: Date,          // 开始时间
  endTime: Date,            // 结束时间
  duration: number,         // 时长（分钟）
  distance: number,         // 距离（米）
  trackPoints: [{           // 轨迹点数组
    lat: number,
    lng: number,
    timestamp: Date
  }],
  manual: boolean,          // 是否手动记录
  notes: string,            // 备注
  createdAt: Date
}
```

### 6. 健康周报 (HealthReport)

```typescript
{
  _id: ObjectId,
  petId: ObjectId,          // 关联宠物
  weekStart: Date,          // 周开始日期
  weekEnd: Date,            // 周结束日期
  dietSummary: {            // 饮食统计
    totalMeals: number,
    avgAmount: number,
    foodTypes: string[]
  },
  walkSummary: {            // 遛弯统计
    totalTimes: number,
    totalDistance: number,
    totalDuration: number,
    avgDuration: number
  },
  vaccineAlerts: [{         // 疫苗提醒
    vaccineName: string,
    dueDate: Date
  }],
  healthScore: number,      // 健康评分 (0-100)
  suggestions: string[],    // 健康建议
  createdAt: Date
}
```

### 7. 情绪识别 (EmotionRecord)

```typescript
{
  _id: ObjectId,
  petId: ObjectId,          // 关联宠物
  photoUrl: string,         // 照片地址
  emotion: string,          // 识别情绪：happy/sad/angry/anxious/neutral
  confidence: number,       // 置信度 (0-1)
  analyzedAt: Date,         // 分析时间
  createdAt: Date
}
```

---

## 五、API 接口设计

### 用户模块 `/api/auth`

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /register | 手机号注册 |
| POST | /login | 账号密码登录 |
| POST | /login/phone | 手机验证码登录 |
| POST | /login/wechat | 微信授权登录 |
| POST | /logout | 退出登录 |
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

### 饮食模块 `/api/pets/:petId/diet`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取饮食记录列表 |
| POST | / | 添加饮食记录 |
| PUT | /:id | 更新饮食记录 |
| DELETE | /:id | 删除饮食记录 |

### 疫苗模块 `/api/pets/:petId/vaccines`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取疫苗记录列表 |
| POST | / | 添加疫苗记录 |
| PUT | /:id | 更新疫苗记录 |
| DELETE | /:id | 删除疫苗记录 |
| GET | /alerts | 获取疫苗到期提醒 |

### 遛弯模块 `/api/pets/:petId/walks`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取遛弯记录列表 |
| POST | / | 添加遛弯记录 |
| POST | /track | 实时上传轨迹点 |
| PUT | /:id | 更新遛弯记录 |
| DELETE | /:id | 删除遛弯记录 |

### 周报模块 `/api/pets/:petId/reports`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取周报列表 |
| GET | /latest | 获取最新周报 |
| POST | /generate | 手动生成周报 |

### 情绪识别模块 `/api/pets/:petId/emotion`

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /analyze | 上传照片分析情绪 |
| GET | /history | 获取识别历史 |

---

## 六、项目目录结构

```
pet-health/
├── apps/
│   ├── web/                      # Next.js Web 应用
│   │   ├── src/
│   │   │   ├── app/              # 页面路由
│   │   │   ├── components/       # 组件
│   │   │   ├── hooks/            # 自定义 Hooks
│   │   │   ├── stores/           # Zustand 状态
│   │   │   ├── services/         # API 服务
│   │   │   └── utils/            # 工具函数
│   │   ├── public/
│   │   └── package.json
│   │
│   ├── miniapp/                  # Taro 微信小程序
│   │   ├── src/
│   │   │   ├── pages/            # 页面
│   │   │   ├── components/       # 组件
│   │   │   ├── services/         # API 服务
│   │   │   └── store/            # 状态管理
│   │   └── package.json
│   │
│   └── server/                   # Nest.js 后端
│       ├── src/
│       │   ├── modules/          # 功能模块
│       │   │   ├── auth/
│       │   │   ├── pets/
│       │   │   ├── diet/
│       │   │   ├── vaccines/
│       │   │   ├── walks/
│       │   │   ├── reports/
│       │   │   └── emotion/
│       │   ├── common/           # 公共模块
│       │   └── main.ts
│       └── package.json
│
├── packages/                     # 共享代码
│   └── shared/                   # 类型定义、工具函数
│
├── docker/                       # Docker 配置
│   ├── docker-compose.yml
│   ├── Dockerfile.web
│   ├── Dockerfile.server
│   └── nginx.conf
│
├── docs/                         # 文档
└── package.json                  # Monorepo 根配置
```

---

## 七、开发计划

### 第一阶段：基础架构搭建（预计 3 天）

- Monorepo 项目初始化
- 数据库设计 + MongoDB 连接
- 用户认证模块（手机号/密码登录）
- Docker 配置

### 第二阶段：核心功能开发（预计 5 天）

- 宠物档案管理
- 饮食记录功能
- 疫苗记录功能
- Web 端基础页面

### 第三阶段：轨迹功能开发（预计 3 天）

- 遛弯轨迹记录（手动 + 实时）
- 地图集成
- 小程序端基础页面

### 第四阶段：周报 + 情绪识别（预计 2 天）

- 健康周报生成
- 情绪识别（模拟实现）
- 照片上传功能

### 第五阶段：完善 + 部署（预计 2 天）

- 微信登录集成
- 界面优化
- Docker 部署
- 测试验收

---

## 八、技术风险与应对

### 1. 地图轨迹性能

- **风险**：长时遛弯产生大量轨迹点，存储和渲染压力大
- **应对**：轨迹点抽样压缩、分页加载、小程序端使用 Canvas 渲染

### 2. 微信登录对接

- **风险**：微信开放平台审核周期长、openid/unionid 关联复杂
- **应对**：先完成手机号登录，微信登录后置；提前准备软著等资质

### 3. 图片存储

- **风险**：宠物照片占用存储空间大
- **应对**：图片压缩裁剪、限制上传大小、后期可迁移 OSS

### 4. 多端数据同步

- **风险**：Web 和小程序数据一致性
- **应对**：统一 API 服务、Redis 缓存、乐观锁机制

### 5. 周报生成时机

- **风险**：用户量大时定时任务压力大
- **应对**：按需生成 + 定时预生成结合、任务队列
