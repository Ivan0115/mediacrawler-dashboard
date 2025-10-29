const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const DataReader = require('./dataReader');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 初始化数据读取器
const dataReader = new DataReader();

// API路由

// 获取所有数据（统计、最新、热门）
app.get('/api/data/all', async (req, res) => {
    try {
        const data = await dataReader.getAllData();
        res.json({
            success: true,
            data: data,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('获取数据失败:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// 获取最新数据
app.get('/api/data/latest', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const data = await dataReader.getLatestData(limit);
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// 获取热门数据
app.get('/api/data/hot', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const data = await dataReader.getHotData(limit);
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// 获取统计数据
app.get('/api/data/stats', async (req, res) => {
    try {
        const stats = await dataReader.getStats();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// 按平台获取数据
app.get('/api/data/platform/:platform', async (req, res) => {
    try {
        const platform = req.params.platform;
        const limit = parseInt(req.query.limit) || 20;
        const data = await dataReader.getDataByPlatform(platform, limit);
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// 检查数据源状态
app.get('/api/status', (req, res) => {
    const status = dataReader.getStatus();
    res.json({
        success: true,
        data: status
    });
});

// 主页面路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║                                                          ║');
    console.log('║     🚀 MediaCrawler 数据大屏服务器启动成功！            ║');
    console.log('║                                                          ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    console.log(`📍 本地访问地址: http://localhost:${PORT}`);
    console.log(`📱 大屏地址: http://localhost:${PORT}/dashboard.html`);
    console.log(`\n📊 可用的API端点：`);
    console.log(`   GET /api/data/all            - 获取所有数据`);
    console.log(`   GET /api/data/latest         - 获取最新数据`);
    console.log(`   GET /api/data/hot            - 获取热门数据`);
    console.log(`   GET /api/data/stats          - 获取统计数据`);
    console.log(`   GET /api/data/platform/:name - 按平台获取数据`);
    console.log(`   GET /api/status              - 检查数据源状态`);
    console.log(`\n💡 提示: 数据源配置在 dataReader.js 中\n`);
    
    // 初始化并显示状态
    const status = dataReader.getStatus();
    console.log(`📂 数据源类型: ${status.dataSource}`);
    console.log(`✅ 数据路径: ${status.dataPath || '使用模拟数据'}`);
    console.log(`\n按 Ctrl+C 停止服务器\n`);
});

// 优雅退出
process.on('SIGINT', () => {
    console.log('\n\n👋 服务器关闭中...');
    process.exit(0);
});
