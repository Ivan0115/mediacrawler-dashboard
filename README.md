# MediaCrawler 实时数据大屏展示系统

这是一个基于Node.js + Express的实时数据可视化大屏系统，用于展示MediaCrawler爬虫抓取的数据。

## ✨ 功能特点

- 📊 实时数据展示（最新内容、热门排行、统计数据）
- 🔄 自动数据刷新（30秒更新一次）
- 📱 完美适配480×360 iframe尺寸
- 💾 支持多种数据源（CSV、JSON、SQLite数据库、模拟数据）
- 🎨 精美的UI设计，渐变色彩和流畅动画
- 🚀 开箱即用，零配置启动

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务器

```bash
npm start
```

服务器将在 `http://localhost:3000` 启动

### 3. 访问大屏

浏览器打开以下地址：

- **完整版大屏**: http://localhost:3000/dashboard.html
- **iframe版本** (480×360): http://localhost:3000/dashboard-small.html

### 4. 在iframe中使用

```html
<iframe 
    src="http://localhost:3000/dashboard-small.html" 
    width="480" 
    height="360"
    frameborder="0">
</iframe>
```

## 📂 项目结构

```
mh_w/
├── server.js              # Express服务器主文件
├── dataReader.js          # 数据读取模块（支持多种数据源）
├── package.json           # 项目配置文件
├── dashboard.html         # 完整版数据大屏
├── dashboard-small.html   # iframe版本 (480×360)
├── index.html            # 原demo页面
├── data/                 # MediaCrawler数据目录（可选）
│   ├── *.csv            # CSV数据文件
│   ├── *.json           # JSON数据文件
│   └── *.db             # SQLite数据库文件
└── README.md            # 本文件
```

## 🔌 API接口

服务器提供以下RESTful API：

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/data/all` | GET | 获取所有数据（统计、最新、热门） |
| `/api/data/latest` | GET | 获取最新数据 |
| `/api/data/hot` | GET | 获取热门数据 |
| `/api/data/stats` | GET | 获取统计数据 |
| `/api/data/platform/:name` | GET | 按平台获取数据 |
| `/api/status` | GET | 检查数据源状态 |

### 示例请求

```bash
# 获取所有数据
curl http://localhost:3000/api/data/all

# 获取最新10条数据
curl http://localhost:3000/api/data/latest?limit=10

# 获取小红书平台数据
curl http://localhost:3000/api/data/platform/xiaohongshu
```

## 💾 数据源配置

系统支持自动检测以下数据源（按优先级）：

### 1. CSV文件（推荐）
将MediaCrawler导出的CSV文件放入 `data/` 目录：
```
data/
├── xiaohongshu_notes.csv
├── douyin_videos.csv
└── bilibili_videos.csv
```

### 2. JSON文件
```
data/
├── posts.json
└── videos.json
```

### 3. SQLite数据库
```
data/
└── media_crawler.db
```

### 4. 模拟数据
如果没有真实数据，系统会自动使用模拟数据，方便测试和演示。

## ⚙️ 配置说明

### 修改端口

编辑 `server.js`，修改第6行：
```javascript
const PORT = process.env.PORT || 3000;  // 改为你想要的端口
```

### 修改数据源路径

编辑 `server.js`，第14行：
```javascript
const dataReader = new DataReader({
    dataPath: '/path/to/your/data',  // 自定义数据路径
    dataSource: 'csv'  // 指定数据源类型: csv, json, sqlite, mock
});
```

### 修改刷新频率

编辑 `dashboard-small.html`，第432行：
```javascript
this.updateInterval = setInterval(() => {
    this.updateData();
}, 30000);  // 30000ms = 30秒，可以修改为其他值
```

## 🎨 界面尺寸

### 完整版大屏 (dashboard.html)
- 适合大屏幕展示
- 响应式设计
- 支持1920×1080及以上分辨率

### iframe版本 (dashboard-small.html)
- 固定尺寸: 480×360
- 专为iframe嵌入优化
- 紧凑布局，信息密度高

## 🔄 实时数据更新

系统采用轮询方式实现数据更新：
- 前端每30秒自动请求API
- 后端缓存数据30秒
- 减少数据库/文件读取压力

如需WebSocket实时推送，可以自行扩展。

## 📊 支持的平台

- 🟥 小红书 (xiaohongshu)
- ⚫ 抖音 (douyin)
- 🔵 B站 (bilibili)
- 🟧 快手 (kuaishou)

## 🛠️ 开发模式

使用 nodemon 进行热重载开发：

```bash
npm install -g nodemon
npm run dev
```

## 📝 数据格式说明

### CSV格式示例
```csv
id,title,platform,author,views,likes,comments,create_time
1234,标题内容,xiaohongshu,用户名,10000,500,50,2025-01-01 10:00:00
```

### JSON格式示例
```json
{
  "data": [
    {
      "id": "1234",
      "title": "标题内容",
      "platform": "xiaohongshu",
      "author": "用户名",
      "views": 10000,
      "likes": 500,
      "comments": 50,
      "create_time": "2025-01-01 10:00:00"
    }
  ]
}
```

## 🚨 常见问题

### Q: 启动后显示"暂无数据"？
A: 请检查：
1. `data/` 目录是否存在数据文件
2. 查看控制台输出的数据源类型
3. 如果使用数据库，确保数据库文件路径正确

### Q: 如何连接真实的MediaCrawler数据？
A: 
1. 运行MediaCrawler爬虫，设置数据导出为CSV或JSON
2. 将导出的数据文件复制到本项目的 `data/` 目录
3. 重启服务器即可

### Q: 能否部署到服务器？
A: 可以！使用PM2部署：
```bash
npm install -g pm2
pm2 start server.js --name mediacrawler-dashboard
```

### Q: iframe显示空白？
A: 检查：
1. 服务器是否正常运行
2. 浏览器控制台是否有跨域错误
3. iframe的src地址是否正确

## 📄 License

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

**享受使用吧！** 如有问题请查看 [MediaCrawler项目](https://github.com/NanmiCoder/MediaCrawler)
