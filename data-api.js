/**
 * MediaCrawler 数据API模拟服务
 * 实际项目中，这应该是一个后端服务
 */

// 如果需要使用Node.js创建本地服务器，可以使用以下代码：

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// 模拟数据库
let database = {
    posts: [],
    stats: {
        todayCount: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0
    }
};

// 平台配置
const platforms = [
    { name: 'xiaohongshu', label: '小红书' },
    { name: 'douyin', label: '抖音' },
    { name: 'bilibili', label: 'B站' },
    { name: 'kuaishou', label: '快手' }
];

const titles = [
    '这个美妆技巧真的太绝了！',
    '分享一个超好用的生活小窍门',
    '今天的OOTD穿搭分享',
    '探店｜这家店真的太好吃了',
    '超详细的旅游攻略来了',
    '新手也能学会的料理教程',
    '这个数码产品必须推荐',
    '健身小白的入门指南',
    '居家好物分享第N弹',
    '这部剧真的太好看了'
];

// 初始化数据
function initializeData() {
    database.posts = [];
    for (let i = 0; i < 50; i++) {
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        const post = {
            id: `post-${Date.now()}-${i}`,
            title: titles[Math.floor(Math.random() * titles.length)],
            platform: platform.name,
            platformLabel: platform.label,
            author: `用户${Math.floor(Math.random() * 10000)}`,
            views: Math.floor(Math.random() * 100000) + 1000,
            likes: Math.floor(Math.random() * 10000) + 100,
            comments: Math.floor(Math.random() * 1000) + 10,
            shares: Math.floor(Math.random() * 500) + 10,
            createTime: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
            crawlTime: new Date().toISOString()
        };
        database.posts.push(post);
    }
    updateStats();
}

// 更新统计数据
function updateStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayPosts = database.posts.filter(post => 
        new Date(post.crawlTime) >= today
    );
    
    database.stats = {
        todayCount: todayPosts.length,
        totalViews: database.posts.reduce((sum, post) => sum + post.views, 0),
        totalLikes: database.posts.reduce((sum, post) => sum + post.likes, 0),
        totalComments: database.posts.reduce((sum, post) => sum + post.comments, 0),
        totalPosts: database.posts.length,
        todayTrend: Math.floor(Math.random() * 20) + 5,
        viewsTrend: Math.floor(Math.random() * 15) + 3,
        likesTrend: Math.floor(Math.random() * 25) + 10,
        commentsTrend: Math.floor(Math.random() * 18) + 7
    };
}

// 添加新帖子（模拟实时抓取）
function addNewPost() {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const post = {
        id: `post-${Date.now()}-${Math.random()}`,
        title: titles[Math.floor(Math.random() * titles.length)],
        platform: platform.name,
        platformLabel: platform.label,
        author: `用户${Math.floor(Math.random() * 10000)}`,
        views: Math.floor(Math.random() * 10000) + 100,
        likes: Math.floor(Math.random() * 1000) + 10,
        comments: Math.floor(Math.random() * 100) + 5,
        shares: Math.floor(Math.random() * 50) + 1,
        createTime: new Date().toISOString(),
        crawlTime: new Date().toISOString()
    };
    
    database.posts.unshift(post);
    
    // 限制数据库大小
    if (database.posts.length > 100) {
        database.posts = database.posts.slice(0, 100);
    }
    
    updateStats();
    return post;
}

// API路由处理
function handleRequest(req, res) {
    // 设置CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const url = req.url;

    // API路由
    if (url === '/api/data/latest') {
        // 获取最新数据
        const latestPosts = database.posts.slice(0, 10);
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            data: latestPosts
        }));
    } 
    else if (url === '/api/data/hot') {
        // 获取热门数据（按点赞数排序）
        const hotPosts = [...database.posts]
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 10);
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            data: hotPosts
        }));
    }
    else if (url === '/api/data/stats') {
        // 获取统计数据
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            data: database.stats
        }));
    }
    else if (url === '/api/data/all') {
        // 获取所有数据
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            data: {
                latest: database.posts.slice(0, 10),
                hot: [...database.posts].sort((a, b) => b.likes - a.likes).slice(0, 10),
                stats: database.stats
            }
        }));
    }
    else if (url.startsWith('/api/data/platform/')) {
        // 按平台获取数据
        const platform = url.split('/').pop();
        const platformPosts = database.posts
            .filter(post => post.platform === platform)
            .slice(0, 20);
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            data: platformPosts
        }));
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({
            success: false,
            message: 'API endpoint not found'
        }));
    }
}

// 创建HTTP服务器
const server = http.createServer(handleRequest);

// 启动服务器
server.listen(PORT, () => {
    console.log(`🚀 MediaCrawler API服务器运行在 http://localhost:${PORT}`);
    console.log('\n可用的API端点：');
    console.log(`  - http://localhost:${PORT}/api/data/all - 获取所有数据`);
    console.log(`  - http://localhost:${PORT}/api/data/latest - 获取最新数据`);
    console.log(`  - http://localhost:${PORT}/api/data/hot - 获取热门数据`);
    console.log(`  - http://localhost:${PORT}/api/data/stats - 获取统计数据`);
    console.log(`  - http://localhost:${PORT}/api/data/platform/{platform} - 按平台获取数据`);
    console.log('\n开始初始化数据...');
    
    // 初始化数据
    initializeData();
    console.log(`✅ 已生成 ${database.posts.length} 条初始数据`);
    
    // 每10秒模拟添加新数据
    setInterval(() => {
        const newPost = addNewPost();
        console.log(`📝 新增数据: ${newPost.platformLabel} - ${newPost.title}`);
    }, 10000);
});

// 优雅退出
process.on('SIGINT', () => {
    console.log('\n\n👋 服务器关闭');
    server.close();
    process.exit(0);
});
