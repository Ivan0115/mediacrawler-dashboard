# 🚀 Vercel部署详细步骤（图文版）

## 📍 当前进度
✅ 代码已推送到GitHub：https://github.com/Ivan0115/mediacrawler-dashboard

---

## 🎯 开始部署（预计3分钟）

### 步骤1：访问Vercel网站

在浏览器打开：**https://vercel.com**

### 步骤2：登录Vercel

#### 2.1 点击"Sign Up"（如果没账号）或"Log In"（如果有账号）

#### 2.2 选择"Continue with GitHub"
- 这是最推荐的方式
- 会自动关联你的GitHub账号
- 以后推送代码会自动部署

#### 2.3 授权Vercel访问GitHub
- 如果是首次使用，GitHub会要求授权
- 点击"Authorize Vercel"

### 步骤3：导入项目

#### 3.1 在Vercel首页，点击右上角的"Add New..."按钮
- 位置：右上角，蓝色按钮

#### 3.2 选择"Project"
- 会出现下拉菜单
- 选择"Project"选项

#### 3.3 导入Git仓库
- 你会看到标题"Import Git Repository"
- 下方会列出你的GitHub仓库
- 找到：**mediacrawler-dashboard**
- 点击右侧的"Import"按钮

> 💡 如果没看到仓库，点击"Adjust GitHub App Permissions"添加权限

### 步骤4：配置项目

#### 4.1 项目配置页面
你会看到以下配置选项：

**Project Name（项目名称）**
- 默认：`mediacrawler-dashboard`
- 可以保持不变，或者修改

**Framework Preset（框架预设）**
- Vercel会自动检测
- 显示"Other"即可
- 不需要修改

**Root Directory（根目录）**
- 保持默认：`.`
- 不需要修改

**Build and Output Settings（构建设置）**
- Build Command: 留空
- Output Directory: 留空
- Install Command: 留空

**Environment Variables（环境变量）**
- 不需要添加
- 直接跳过

#### 4.2 点击"Deploy"按钮
- 在页面底部
- 蓝色大按钮
- 点击后开始部署

### 步骤5：等待部署

#### 5.1 部署过程
- 会显示部署日志
- 看到以下步骤：
  - 🔄 Building...
  - 📦 Deploying...
  - ✅ Ready

#### 5.2 预计时间
- 首次部署：1-2分钟
- 后续部署：30秒-1分钟

### 步骤6：部署成功！

#### 6.1 看到成功页面
- 显示：🎉 Congratulations!
- 会有烟花动画效果

#### 6.2 获取你的线上地址
会显示类似这样的地址：
```
https://mediacrawler-dashboard-xxx.vercel.app
```

或者可能是：
```
https://mediacrawler-dashboard-ivan0115.vercel.app
```

#### 6.3 点击"Visit"按钮
- 直接在新窗口打开你的网站
- 可以立即预览效果

---

## 📱 测试你的iframe

部署成功后，使用以下地址：

### iframe专用版（480×360）
```
https://你的域名.vercel.app/dashboard-small.html
```

### 完整版大屏
```
https://你的域名.vercel.app/dashboard.html
```

### 示例页面
```
https://你的域名.vercel.app/iframe-demo.html
```

---

## 🎨 在你的页面中使用

```html
<!DOCTYPE html>
<html>
<head>
    <title>数据大屏</title>
</head>
<body>
    <h1>MediaCrawler实时数据</h1>
    
    <iframe 
        src="https://你的域名.vercel.app/dashboard-small.html" 
        width="480" 
        height="360"
        frameborder="0"
        style="border: 2px solid #ccc; border-radius: 8px;">
    </iframe>
</body>
</html>
```

---

## 🔄 后续更新代码

以后只需要推送代码到GitHub，Vercel会自动重新部署：

```bash
cd /Users/ivan/Desktop/mh_w

# 修改代码后
git add .
git commit -m "更新描述"
git push

# Vercel会自动部署，大约30秒后生效
```

---

## ❓ 常见问题

### Q1: 找不到我的仓库？
A: 点击"Adjust GitHub App Permissions" → 选择仓库 → 保存

### Q2: 部署失败？
A: 查看部署日志，通常是依赖安装问题。我们的项目配置已优化，应该不会失败。

### Q3: 如何绑定自定义域名？
A: 在Vercel项目设置 → Domains → 添加你的域名

### Q4: 免费版有限制吗？
A: 
- ✅ 无限部署次数
- ✅ 100GB带宽/月
- ✅ 自动HTTPS
- ✅ 全球CDN
- 个人项目完全够用！

---

## 📞 需要帮助？

如果遇到问题：
1. 截图发给我
2. 或者把错误信息复制给我
3. 我会帮你解决！

---

**现在就开始吧！** 👉 https://vercel.com

部署完成后，把你的线上地址发给我，我帮你测试！🎉
