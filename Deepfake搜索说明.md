# 🔍 Deepfake 关键词搜索功能

## ✅ 已完成

代码已推送到GitHub，Vercel正在自动部署中（约1分钟）

---

## 🌐 Deepfake专用监控地址

### 线上地址（等待部署完成后可用）
```
https://mediacrawler-dashboard.vercel.app/dashboard-deepfake.html
```

### 本地测试
```
http://localhost:3000/dashboard-deepfake.html
```

---

## 📱 iframe使用

```html
<iframe 
    src="https://mediacrawler-dashboard.vercel.app/dashboard-deepfake.html" 
    width="480" 
    height="360"
    frameborder="0">
</iframe>
```

---

## ✨ 功能特点

### 1. 专注Deepfake内容
- ✅ 只显示标题包含"deepfake"的内容
- ✅ 支持大小写不敏感搜索
- ✅ 自动高亮关键词

### 2. 实时统计
- 📊 相关内容总数
- 👁️ 总浏览量
- ❤️ 总点赞数

### 3. 内容展示
- 🔥 按时间倒序排列
- 🏷️ 显示平台标签
- 📈 显示浏览、点赞、评论数

### 4. 自动更新
- 🔄 每30秒自动刷新
- 💾 后端API缓存优化

---

## 🔧 技术实现

### 后端API（新增）
```
GET /api/data/keyword/:keyword
```

**示例：**
```bash
# 搜索deepfake
curl https://mediacrawler-dashboard.vercel.app/api/data/keyword/deepfake

# 搜索AI
curl https://mediacrawler-dashboard.vercel.app/api/data/keyword/AI
```

**返回数据：**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "stats": {
      "totalCount": 10,
      "totalViews": 50000,
      "totalLikes": 1200,
      "totalComments": 300
    }
  }
}
```

---

## 🎨 界面特色

### 红色主题
- 🔴 使用红色渐变突出警示
- 🎯 专门为deepfake话题设计
- 💡 关键词高亮显示

### 紧凑布局
- 📐 480×360尺寸优化
- 📱 完美适配iframe
- 🖥️ 信息密度高

---

## 🚀 扩展其他关键词

如果你想监控其他关键词，可以：

### 方法1：修改关键词（最简单）
编辑 `dashboard-deepfake.html` 第291行：
```javascript
this.keyword = 'deepfake';  // 改成你想要的关键词
```

### 方法2：创建新页面
复制 `dashboard-deepfake.html` 为新文件，修改关键词。

### 方法3：使用API
直接访问API获取任意关键词数据：
```
https://mediacrawler-dashboard.vercel.app/api/data/keyword/你的关键词
```

---

## 📊 与通用版本对比

| 功能 | 通用版 | Deepfake版 |
|------|--------|-----------|
| 地址 | `/dashboard-small.html` | `/dashboard-deepfake.html` |
| 内容 | 全部数据 | 仅deepfake相关 |
| 主题色 | 蓝色 | 红色 |
| 统计 | 4项 | 3项（相关内容） |
| 关键词高亮 | 无 | 有 |
| 排序 | 最新+热门 | 仅按时间 |

---

## 🔄 部署状态检查

### 1. 访问Vercel Dashboard
https://vercel.com/ivan0115s-projects/mediacrawler-dashboard

### 2. 查看Deployments
- 应该能看到新的部署记录
- 状态：Building → Ready
- 预计：1-2分钟完成

### 3. 测试新功能
部署完成后访问：
```
https://mediacrawler-dashboard.vercel.app/dashboard-deepfake.html
```

---

## 💡 使用场景

### 1. 内容监控
- 实时监控deepfake相关内容
- 追踪话题热度变化
- 了解平台分布

### 2. 数据分析
- 统计deepfake内容数量
- 分析用户互动情况
- 对比平台差异

### 3. 嵌入展示
- 嵌入到报告页面
- 展示在监控大屏
- 集成到管理后台

---

## 📝 当前数据源

⚠️ **目前使用模拟数据**

### 切换到真实数据

1. 在 `data/` 目录放入MediaCrawler抓取的数据
2. 确保数据中包含"deepfake"关键词的内容
3. 推送到GitHub，自动部署

---

## 🎯 所有可用地址汇总

| 名称 | 地址 |
|------|------|
| **Deepfake监控** | https://mediacrawler-dashboard.vercel.app/dashboard-deepfake.html |
| iframe通用版 | https://mediacrawler-dashboard.vercel.app/dashboard-small.html |
| 完整版大屏 | https://mediacrawler-dashboard.vercel.app/dashboard.html |
| 演示页面 | https://mediacrawler-dashboard.vercel.app/iframe-demo.html |

---

## ⏱️ 等待部署完成

Vercel正在部署中...

- 推送时间：刚刚
- 预计完成：1-2分钟
- 自动部署：无需手动操作

**大约1分钟后刷新上面的地址即可看到新功能！** 🎉
