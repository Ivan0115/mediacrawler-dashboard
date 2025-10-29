#!/bin/bash

# MediaCrawler Dashboard - GitHub推送脚本

echo "📦 MediaCrawler Dashboard - GitHub推送脚本"
echo ""
echo "请先在GitHub创建新仓库："
echo "👉 https://github.com/new"
echo ""
echo "仓库名称建议：mediacrawler-dashboard"
echo "设置为：Public（公开）"
echo ""
echo "创建完成后，请输入你的GitHub仓库地址："
echo "格式示例：https://github.com/你的用户名/mediacrawler-dashboard.git"
echo ""
read -p "仓库地址: " repo_url

if [ -z "$repo_url" ]; then
    echo "❌ 仓库地址不能为空"
    exit 1
fi

echo ""
echo "🔗 设置远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin "$repo_url"

echo "📝 切换到main分支..."
git branch -M main

echo "⬆️  推送代码到GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 代码推送成功！"
    echo ""
    echo "📋 下一步："
    echo "1. 访问：https://vercel.com"
    echo "2. 用GitHub账号登录"
    echo "3. 点击 'Add New...' → 'Project'"
    echo "4. 导入你的仓库：mediacrawler-dashboard"
    echo "5. 点击 'Deploy'"
    echo "6. 等待1-2分钟，获取线上地址"
    echo ""
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "1. 仓库地址是否正确"
    echo "2. 是否有GitHub访问权限"
    echo "3. 网络连接是否正常"
fi
