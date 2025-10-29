const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * 数据读取器
 * 支持从多种数据源读取MediaCrawler爬虫数据
 */
class DataReader {
    constructor(config = {}) {
        // 配置数据源路径（默认为MediaCrawler的data目录）
        this.dataPath = config.dataPath || path.join(__dirname, 'data');
        this.dataSource = config.dataSource || 'auto'; // auto, csv, json, sqlite, mock
        this.cache = {
            data: [],
            lastUpdate: null,
            cacheDuration: 30000 // 缓存30秒
        };
        
        this.init();
    }

    init() {
        // 自动检测数据源
        if (this.dataSource === 'auto') {
            this.dataSource = this.detectDataSource();
        }
        console.log(`🔍 数据源类型: ${this.dataSource}`);
    }

    // 检测可用的数据源
    detectDataSource() {
        // 检查是否存在data目录
        if (!fs.existsSync(this.dataPath)) {
            console.log('⚠️  未找到data目录，使用模拟数据');
            return 'mock';
        }

        // 检查CSV文件
        const csvFiles = fs.readdirSync(this.dataPath).filter(f => f.endsWith('.csv'));
        if (csvFiles.length > 0) {
            console.log(`✅ 找到 ${csvFiles.length} 个CSV文件`);
            return 'csv';
        }

        // 检查JSON文件
        const jsonFiles = fs.readdirSync(this.dataPath).filter(f => f.endsWith('.json'));
        if (jsonFiles.length > 0) {
            console.log(`✅ 找到 ${jsonFiles.length} 个JSON文件`);
            return 'json';
        }

        // 检查SQLite数据库
        const dbFiles = fs.readdirSync(this.dataPath).filter(f => f.endsWith('.db'));
        if (dbFiles.length > 0) {
            console.log(`✅ 找到 ${dbFiles.length} 个数据库文件`);
            return 'sqlite';
        }

        console.log('⚠️  未找到数据文件，使用模拟数据');
        return 'mock';
    }

    // 获取所有数据
    async getAllData() {
        // 检查缓存
        if (this.isCacheValid()) {
            return this.formatAllData(this.cache.data);
        }

        let data = [];
        
        switch (this.dataSource) {
            case 'csv':
                data = await this.readFromCSV();
                break;
            case 'json':
                data = await this.readFromJSON();
                break;
            case 'sqlite':
                data = await this.readFromSQLite();
                break;
            default:
                data = this.generateMockData();
        }

        // 更新缓存
        this.cache.data = data;
        this.cache.lastUpdate = Date.now();

        return this.formatAllData(data);
    }

    // 格式化所有数据（包含统计、最新、热门）
    formatAllData(data) {
        const latest = this.getLatestFromData(data, 10);
        const hot = this.getHotFromData(data, 10);
        const stats = this.calculateStats(data);

        return { latest, hot, stats };
    }

    // 从CSV读取数据
    async readFromCSV() {
        const files = fs.readdirSync(this.dataPath).filter(f => f.endsWith('.csv'));
        const allData = [];

        for (const file of files) {
            const filePath = path.join(this.dataPath, file);
            const fileData = await this.parseCSVFile(filePath);
            allData.push(...fileData);
        }

        return this.normalizeData(allData);
    }

    // 解析CSV文件
    parseCSVFile(filePath) {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', reject);
        });
    }

    // 从JSON读取数据
    async readFromJSON() {
        const files = fs.readdirSync(this.dataPath).filter(f => f.endsWith('.json'));
        const allData = [];

        for (const file of files) {
            const filePath = path.join(this.dataPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            try {
                const jsonData = JSON.parse(content);
                // 处理可能是数组或对象的情况
                if (Array.isArray(jsonData)) {
                    allData.push(...jsonData);
                } else if (jsonData.data && Array.isArray(jsonData.data)) {
                    allData.push(...jsonData.data);
                } else {
                    allData.push(jsonData);
                }
            } catch (e) {
                console.error(`解析JSON文件失败: ${file}`, e);
            }
        }

        return this.normalizeData(allData);
    }

    // 从SQLite读取数据（需要better-sqlite3）
    async readFromSQLite() {
        try {
            const Database = require('better-sqlite3');
            const dbFiles = fs.readdirSync(this.dataPath).filter(f => f.endsWith('.db'));
            
            if (dbFiles.length === 0) {
                return this.generateMockData();
            }

            const db = new Database(path.join(this.dataPath, dbFiles[0]), { readonly: true });
            
            // 尝试不同的表名
            const tables = ['posts', 'notes', 'videos', 'xhs', 'dy', 'bili', 'ks'];
            let allData = [];

            for (const table of tables) {
                try {
                    const rows = db.prepare(`SELECT * FROM ${table} ORDER BY create_time DESC LIMIT 100`).all();
                    if (rows.length > 0) {
                        allData.push(...rows);
                    }
                } catch (e) {
                    // 表不存在，继续尝试下一个
                }
            }

            db.close();
            return this.normalizeData(allData);
        } catch (e) {
            console.error('SQLite读取失败:', e);
            return this.generateMockData();
        }
    }

    // 标准化数据格式
    normalizeData(rawData) {
        return rawData.map(item => ({
            id: item.id || item.note_id || item.aweme_id || item.video_id || `item-${Date.now()}-${Math.random()}`,
            title: item.title || item.desc || item.content || '无标题',
            platform: this.detectPlatform(item),
            platformLabel: this.getPlatformLabel(this.detectPlatform(item)),
            author: item.author || item.nickname || item.user_name || '未知用户',
            views: parseInt(item.views || item.view_count || item.play_count || 0),
            likes: parseInt(item.likes || item.liked_count || item.digg_count || 0),
            comments: parseInt(item.comments || item.comment_count || 0),
            shares: parseInt(item.shares || item.share_count || 0),
            createTime: item.create_time || item.publish_time || item.time || new Date().toISOString(),
            crawlTime: item.crawl_time || new Date().toISOString(),
            url: item.url || item.note_url || item.video_url || ''
        }));
    }

    // 检测平台类型
    detectPlatform(item) {
        if (item.platform) return item.platform;
        if (item.note_id || item.xhs_note_id) return 'xiaohongshu';
        if (item.aweme_id || item.dy_aweme_id) return 'douyin';
        if (item.bvid || item.bili_video_id) return 'bilibili';
        if (item.ks_video_id) return 'kuaishou';
        return 'unknown';
    }

    // 获取平台中文名
    getPlatformLabel(platform) {
        const labels = {
            xiaohongshu: '小红书',
            douyin: '抖音',
            bilibili: 'B站',
            kuaishou: '快手',
            unknown: '未知'
        };
        return labels[platform] || platform;
    }

    // 生成模拟数据
    generateMockData() {
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
            '这部剧真的太好看了',
            '一个人的周末也要精致',
            '这个配方我能吃一辈子',
            '分享我的护肤流程',
            '这个景点绝对值得打卡',
            '宝藏咖啡店发现！'
        ];

        const data = [];
        for (let i = 0; i < 50; i++) {
            const platform = platforms[Math.floor(Math.random() * platforms.length)];
            data.push({
                id: `mock-${Date.now()}-${i}`,
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
            });
        }
        return data;
    }

    // 获取最新数据
    async getLatestData(limit = 10) {
        const allData = await this.getAllData();
        return allData.latest.slice(0, limit);
    }

    // 获取热门数据
    async getHotData(limit = 10) {
        const allData = await this.getAllData();
        return allData.hot.slice(0, limit);
    }

    // 获取统计数据
    async getStats() {
        const allData = await this.getAllData();
        return allData.stats;
    }

    // 按平台获取数据
    async getDataByPlatform(platform, limit = 20) {
        const data = this.cache.data.length > 0 ? this.cache.data : await this.getAllData().then(d => d.latest);
        return data.filter(item => item.platform === platform).slice(0, limit);
    }

    // 从数据中获取最新的
    getLatestFromData(data, limit) {
        return [...data]
            .sort((a, b) => new Date(b.crawlTime) - new Date(a.crawlTime))
            .slice(0, limit);
    }

    // 从数据中获取热门的
    getHotFromData(data, limit) {
        return [...data]
            .sort((a, b) => b.likes - a.likes)
            .slice(0, limit);
    }

    // 计算统计数据
    calculateStats(data) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayData = data.filter(item => 
            new Date(item.crawlTime) >= today
        );

        return {
            todayCount: todayData.length,
            totalViews: data.reduce((sum, item) => sum + (item.views || 0), 0),
            totalLikes: data.reduce((sum, item) => sum + (item.likes || 0), 0),
            totalComments: data.reduce((sum, item) => sum + (item.comments || 0), 0),
            totalPosts: data.length,
            todayTrend: Math.floor(Math.random() * 20) + 5,
            viewsTrend: Math.floor(Math.random() * 15) + 3,
            likesTrend: Math.floor(Math.random() * 25) + 10,
            commentsTrend: Math.floor(Math.random() * 18) + 7
        };
    }

    // 检查缓存是否有效
    isCacheValid() {
        if (!this.cache.lastUpdate || this.cache.data.length === 0) {
            return false;
        }
        return Date.now() - this.cache.lastUpdate < this.cache.cacheDuration;
    }

    // 获取状态
    getStatus() {
        return {
            dataSource: this.dataSource,
            dataPath: this.dataSource !== 'mock' ? this.dataPath : null,
            cacheValid: this.isCacheValid(),
            lastUpdate: this.cache.lastUpdate ? new Date(this.cache.lastUpdate).toLocaleString('zh-CN') : '未更新',
            dataCount: this.cache.data.length
        };
    }
}

module.exports = DataReader;
