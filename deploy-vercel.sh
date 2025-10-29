#!/bin/bash

# MediaCrawler Dashboard - Vercel 一键部署脚本

echo "🚀 MediaCrawler Dashboard - Vercel部署脚本"
echo ""

# 检查是否安装了vercel CLI
if ! command -v vercel &> /dev/null
then
    echo "📦 未检测到Vercel CLI，正在安装..."
    npm install -g vercel
else
    echo "✅ Vercel CLI 已安装"
fi

echo ""
echo "📋 准备部署..."
echo ""

# 检查是否有git仓库
if [ ! -d .git ]; then
    echo "⚠️  未检测到Git仓库"
    echo "是否初始化Git仓库？(y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
    then
        git init
        git add .
        git commit -m "Initial commit: MediaCrawler Dashboard"
        echo "✅ Git仓库初始化完成"
    fi
fi

echo ""
echo "🌐 开始部署到Vercel..."
echo ""

# 部署
vercel --prod

echo ""
echo "✅ 部署完成！"
echo ""
echo "📝 后续步骤："
echo "1. 复制上面显示的Production URL"
echo "2. 在你的页面中使用："
echo "   <iframe src='https://你的域名.vercel.app/dashboard-small.html' width='480' height='360'></iframe>"
echo ""
echo "🎉 享受使用吧！"
