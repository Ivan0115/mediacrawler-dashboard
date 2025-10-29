# 🌐 快速部署到线上

## 一键部署到Vercel（最简单）

### 方法1：使用一键部署按钮

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/你的用户名/mediacrawler-dashboard)

### 方法2：使用脚本部署

```bash
./deploy-vercel.sh
```

### 方法3：手动部署

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录Vercel
vercel login

# 3. 部署
vercel --prod
```

---

## 部署后的地址

部署成功后，你会得到一个类似这样的地址：
```
https://mediacrawler-dashboard-xxx.vercel.app
```

## iframe使用示例

```html
<iframe 
    src="https://你的域名.vercel.app/dashboard-small.html" 
    width="480" 
    height="360"
    frameborder="0">
</iframe>
```

---

## 其他部署选项

详细的部署指南请查看：[部署指南.md](./部署指南.md)

支持的平台：
- ✅ **Vercel**（推荐）- 免费、简单、快速
- ✅ **Railway** - 免费额度
- ✅ **Render** - 免费tier
- ✅ **Fly.io** - 需要信用卡

---

## 为什么不能用GitHub Pages？

GitHub Pages只支持**静态网站**（HTML/CSS/JS），不支持Node.js后端服务器。

我们的项目需要Express服务器来：
- 读取数据文件
- 提供API接口
- 处理数据请求

所以必须使用支持Node.js的部署平台。

---

## 数据配置

### 本地数据
将MediaCrawler的数据文件放入`data/`目录：
```
data/
├── xiaohongshu_notes.csv
├── douyin_videos.csv
└── bilibili_videos.csv
```

### 云端数据
推荐使用云数据库（部署后可持久化数据）：
- MongoDB Atlas（免费）
- PlanetScale（免费MySQL）
- Supabase（免费PostgreSQL）

---

## 需要帮助？

- 📖 查看完整文档：[README.md](./README.md)
- 🚀 部署详细步骤：[部署指南.md](./部署指南.md)
- 💬 遇到问题？提Issue或联系我

---

**预计部署时间：3-5分钟** ⏱️
