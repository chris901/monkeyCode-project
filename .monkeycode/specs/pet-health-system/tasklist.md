# 宠物健康管家系统 - 实施任务清单

## 第一阶段：基础架构搭建

- [ ] 1. 初始化 Monorepo 项目结构
  - 创建根目录 `pet-health/` 及 `package.json`（配置 workspaces）
  - 创建 `apps/`、`packages/`、`docker/` 目录结构
  - 配置 pnpm-workspace.yaml 或 npm workspaces

- [ ] 2. 初始化共享包 `packages/shared`
  - 创建 TypeScript 配置
  - 定义共享类型：User、Pet、DietRecord、VaccineRecord、WalkRecord、HealthReport、EmotionRecord
  - 定义 API 响应类型和通用工具函数
  - 配置包导出

- [ ] 3. 初始化后端项目 `apps/server`
  - 使用 Nest CLI 创建 Nest.js 项目
  - 配置 TypeScript 严格模式
  - 配置 ESLint + Prettier

- [ ] 4. 配置数据库连接
  - 安装 `@nestjs/mongoose` 和 `mongoose`
  - 创建 MongoDB 连接模块 `DatabaseModule`
  - 配置环境变量（DATABASE_URL）
  - 创建数据库连接测试接口

- [ ] 5. 配置 Redis 连接
  - 安装 `@nestjs/cache-manager` 和 `cache-manager-redis-store`
  - 创建 Redis 缓存模块 `CacheModule`
  - 配置环境变量（REDIS_URL）

- [ ] 6. 实现用户数据模型
  - 创建 `User` Schema（对应设计文档 4.1 用户模型）
  - 配置字段验证（手机号格式、密码加密）
  - 创建 UserModule 和 UserRepository

- [ ] 7. 实现用户注册功能
  - 创建 AuthController 和 AuthService
  - 实现 POST `/api/auth/register` 接口
  - 手机号格式验证
  - 密码加密存储（bcrypt）
  - 自动生成 JWT Token

- [ ] 8. 实现用户登录功能
  - 实现 POST `/api/auth/login` 接口（账号密码登录）
  - 实现 POST `/api/auth/login/phone` 接口（手机验证码登录）
  - 验证码生成和 Redis 缓存（5分钟有效期）
  - JWT Token 签发和验证

- [ ] 9. 实现 JWT 认证守卫
  - 创建 JwtAuthGuard 和 JwtStrategy
  - 实现Token 验证中间件
  - 创建 CurrentUser 装饰器获取当前登录用户

- [ ] 10. 实现用户信息接口
  - 实现 GET `/api/auth/profile` 获取用户信息
  - 实现 PUT `/api/auth/profile` 更新用户信息
  - 应用 JWT 认证守卫保护接口

- [ ] 11. 检查点 - 验证基础架构
  - 确保用户注册、登录接口正常工作
  - 确保 JWT 认证流程完整
  - 确保数据库和 Redis 连接正常

## 第二阶段：核心功能开发

- [ ] 12. 实现宠物数据模型
  - 创建 `Pet` Schema（对应设计文档 4.2 宠物模型）
  - 配置与 User 的关联关系
  - 创建 PetModule 和 PetRepository

- [ ] 13. 实现宠物管理接口
  - 实现 GET `/api/pets` 获取宠物列表
  - 实现 POST `/api/pets` 创建宠物档案
  - 实现 GET `/api/pets/:id` 获取宠物详情
  - 实现 PUT `/api/pets/:id` 更新宠物信息
  - 实现 DELETE `/api/pets/:id` 删除宠物档案
  - 添加文件上传支持（宠物头像）

- [ ] 14. 实现饮食记录数据模型
  - 创建 `DietRecord` Schema（对应设计文档 4.3 饮食记录）
  - 配置与 Pet 的关联关系
  - 创建 DietModule 和 DietRepository

- [ ] 15. 实现饮食记录接口
  - 实现 GET `/api/pets/:petId/diet` 获取饮食记录列表（支持日期筛选）
  - 实现 POST `/api/pets/:petId/diet` 添加饮食记录
  - 实现 PUT `/api/pets/:petId/diet/:id` 更新饮食记录
  - 实现 DELETE `/api/pets/:petId/diet/:id` 删除饮食记录

- [ ] 16. 实现疫苗记录数据模型
  - 创建 `VaccineRecord` Schema（对应设计文档 4.4 疫苗记录）
  - 配置与 Pet 的关联关系
  - 创建 VaccineModule 和 VaccineRepository

- [ ] 17. 实现疫苗记录接口
  - 实现 GET `/api/pets/:petId/vaccines` 获取疫苗记录列表
  - 实现 POST `/api/pets/:petId/vaccines` 添加疫苗记录
  - 实现 PUT `/api/pets/:petId/vaccines/:id` 更新疫苗记录
  - 实现 DELETE `/api/pets/:petId/vaccines/:id` 删除疫苗记录
  - 实现 GET `/api/pets/:petId/vaccines/alerts` 获取疫苗到期提醒

- [ ] 18. 初始化 Web 前端项目 `apps/web`
  - 使用 `create-next-app` 创建 Next.js 14 项目
  - 配置 Tailwind CSS
  - 配置 Zustand 状态管理
  - 配置 API 请求封装（axios 或 fetch）

- [ ] 19. 实现 Web 端登录注册页面
  - 创建登录页面 `/login`
  - 创建注册页面 `/register`
  - 实现表单验证
  - 实现 Token 存储和自动刷新

- [ ] 20. 实现 Web 端宠物管理页面
  - 创建宠物列表页面 `/pets`
  - 创建宠物详情页面 `/pets/[id]`
  - 创建添加/编辑宠物表单组件
  - 实现宠物头像上传功能

- [ ] 21. 实现 Web 端饮食记录页面
  - 创建饮食记录列表组件
  - 创建添加/编辑饮食记录表单
  - 实现日历视图展示每日饮食

- [ ] 22. 实现 Web 端疫苗记录页面
  - 创建疫苗记录列表组件
  - 创建添加/编辑疫苗记录表单
  - 实现疫苗到期提醒展示

- [ ] 23. 检查点 - 验证核心功能
  - 确保 Web 端可以正常注册登录
  - 确保宠物档案 CRUD 功能正常
  - 确保饮食和疫苗记录功能正常

## 第三阶段：轨迹功能开发

- [ ] 24. 实现遛弯记录数据模型
  - 创建 `WalkRecord` Schema（对应设计文档 4.5 遛弯记录）
  - 配置地理空间索引（trackPoints）
  - 创建 WalkModule 和 WalkRepository

- [ ] 25. 实现遛弯记录接口
  - 实现 GET `/api/pets/:petId/walks` 获取遛弯记录列表
  - 实现 POST `/api/pets/:petId/walks` 添加遛弯记录（手动记录）
  - 实现 POST `/api/pets/:petId/walks/track` 实时上传轨迹点
  - 实现 PUT `/api/pets/:petId/walks/:id` 更新遛弯记录
  - 实现 DELETE `/api/pets/:petId/walks/:id` 删除遛弯记录

- [ ] 26. 实现轨迹点压缩算法
  - 实现道格拉斯-普克算法进行轨迹抽样
  - 控制单次遛弯轨迹点数量上限（< 500 点）

- [ ] 27. 集成地图服务
  - 申请腾讯地图或高德地图 API Key
  - 后端实现逆地理编码（坐标转地址）

- [ ] 28. 实现 Web 端遛弯轨迹页面
  - 创建遛弯记录列表页面
  - 集成地图组件展示轨迹
  - 实现手动记录遛弯功能（地图上选点）
  - 实现遛弯详情页面（轨迹回放）

- [ ] 29. 初始化小程序项目 `apps/miniapp`
  - 使用 Taro CLI 创建项目
  - 配置 TypeScript
  - 配置微信小程序 AppID

- [ ] 30. 实现小程序端基础页面
  - 实现登录页面
  - 实现宠物列表页面
  - 实现宠物详情页面

- [ ] 31. 实现小程序端遛弯记录功能
  - 集成微信地图组件
  - 实现实时 GPS 轨迹追踪
  - 实现轨迹上传（批量上传轨迹点）
  - 实现遛弯记录列表和详情

- [ ] 32. 检查点 - 验证轨迹功能
  - 确保 Web 端手动记录功能正常
  - 确保小程序端实时追踪功能正常
  - 确保轨迹数据正确存储和展示

## 第四阶段：周报 + 情绪识别

- [ ] 33. 实现健康周报数据模型
  - 创建 `HealthReport` Schema（对应设计文档 4.6 健康周报）
  - 配置与 Pet 的关联关系
  - 创建 ReportModule 和 ReportRepository

- [ ] 34. 实现周报生成服务
  - 实现饮食数据统计逻辑
  - 实现遛弯数据统计逻辑
  - 实现疫苗提醒检测逻辑
  - 实现健康评分算法
  - 实现健康建议生成规则

- [ ] 35. 实现周报接口
  - 实现 GET `/api/pets/:petId/reports` 获取周报列表
  - 实现 GET `/api/pets/:petId/reports/latest` 获取最新周报
  - 实现 POST `/api/pets/:petId/reports/generate` 手动生成周报

- [ ] 36. 实现情绪识别数据模型
  - 创建 `EmotionRecord` Schema（对应设计文档 4.7 情绪识别）
  - 创建 EmotionModule 和 EmotionRepository

- [ ] 37. 实现情绪识别接口（模拟版）
  - 实现 POST `/api/pets/:petId/emotion/analyze` 上传照片分析
  - 实现模拟情绪识别逻辑（随机返回情绪类型和置信度）
  - 实现 GET `/api/pets/:petId/emotion/history` 获取识别历史

- [ ] 38. 实现图片上传服务
  - 创建文件上传模块
  - 实现图片本地存储
  - 实现图片大小限制和格式验证
  - 实现图片压缩（可选）

- [ ] 39. 实现 Web 端周报页面
  - 创建周报列表页面
  - 创建周报详情页面（图表展示）
  - 实现手动生成周报按钮

- [ ] 40. 实现 Web 端情绪识别页面
  - 创建照片上传组件
  - 实现情绪结果展示
  - 实现识别历史列表

- [ ] 41. 检查点 - 验证周报和情绪识别
  - 确保周报生成逻辑正确
  - 确保情绪识别模拟功能正常
  - 确保图片上传功能正常

## 第五阶段：完善 + 部署

- [ ] 42. 实现微信登录接口
  - 实现 POST `/api/auth/login/wechat` 接口
  - 集成微信 OAuth 获取 openid/unionid
  - 实现微信登录与手机号绑定逻辑

- [ ] 43. 实现小程序端微信登录
  - 调用 `wx.login` 获取 code
  - 调用后端接口完成登录
  - 实现 Token 存储和自动刷新

- [ ] 44. 配置 CORS 和安全策略
  - 配置后端 CORS 允许前端域名
  - 配置 HTTP 安全头（Helmet）
  - 配置请求频率限制

- [ ] 45. 编写 Docker 配置文件
  - 创建 `docker/Dockerfile.server` 后端镜像
  - 创建 `docker/Dockerfile.web` 前端镜像
  - 创建 `docker/docker-compose.yml` 编排配置
  - 创建 `docker/nginx.conf` 反向代理配置

- [ ] 46. 配置环境变量和部署脚本
  - 创建 `.env.example` 环境变量模板
  - 创建启动脚本 `start.sh`
  - 配置生产环境构建命令

- [ ] 47. Web 端界面优化
  - 优化移动端响应式布局
  - 添加 Loading 状态和错误提示
  - 优化表单交互体验

- [ ] 48. 小程序端界面优化
  - 优化页面加载性能
  - 添加下拉刷新和上拉加载
  - 优化用户交互体验

- [ ] 49. 最终检查点
  - 确保所有功能正常运行
  - 确保 Web 端和 小程序端数据同步
  - 确保 Docker 部署正常

- [ ] 50. 项目收尾
  - 更新 README 文档
  - 整理 API 文档
  - 代码审查和优化
