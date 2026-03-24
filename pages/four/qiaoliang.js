// 外层tab栏切换逻辑
document.querySelectorAll('.tab-item').forEach(item => {
    item.addEventListener('click', function() {
        // 移除所有tab的active类
        document.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('active'));
        // 给当前点击的tab加active类
        this.classList.add('active');
        // 获取当前tab对应的内容id
        const tabId = this.dataset.tab;
        // 移除所有content的active类
        document.querySelectorAll('.content-item').forEach(content => content.classList.remove('active'));
        // 显示对应内容
        document.getElementById(tabId).classList.add('active');
        
        // 如果切换到功能tab，初始化功能图表
        if (tabId === 'function') {
            initFunctionChart();
        }
        // 如果切换到框架结构tab，初始化结构图表
        if (tabId === 'structure') {
            initStructureOverviewChart();
            initStructureCharts('hemudu'); // 默认初始化河姆渡图表
        }
        //如果切换到材料tab，初始化材料图表
        if (tabId === 'material') {
            initMaterialPieChart();
        }
    });
});

// 框架结构：内部tap栏按钮交互
document.querySelectorAll('.struct-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // 移除所有按钮active类
        document.querySelectorAll('.struct-btn').forEach(b => b.classList.remove('active'));
        // 给当前按钮加active类
        this.classList.add('active');
        // 获取结构类型
        const structType = this.dataset.type;
        // 切换详情文本
        document.querySelectorAll('.detail-item').forEach(item => item.classList.remove('active'));
        document.getElementById(`${structType}-detail`).classList.add('active');
        // 重新初始化图表
        initStructureCharts(structType);
    });
});

// 回到首页函数
function goHome() {
    // 可根据实际需求修改跳转路径
    window.location.href = '../../index.html';
}

// 页面加载完成后初始化默认图表
window.onload = function() {
    // 1. 初始化建筑材料占比饼图
    initMaterialPieChart();
};
// 民居建筑材料占比图表初始化函数
function initMaterialPieChart() {
    // 检查ECharts是否加载、图表容器是否存在
    if (typeof echarts === 'undefined' || !document.getElementById('pieChart')) {
        return;
    }
    // 初始化ECharts实例
    let myChart = echarts.init(document.getElementById('pieChart'));
    // 原始时代民居建筑材料占比数据
    let data = [
        { value: 40, name: '木材' },
        { value: 40, name: '夯土' },
        { value: 10, name: '青砖' },
        { value: 8, name: '石材' },
        { value: 1, name: '陶瓦' },
        { value: 1, name: '其他' }
    ];

    // 图表配置项
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'horizontal', // 横向排列（适配页面宽度）
            bottom: 10, // 放在图表底部
            textStyle: { fontSize: 12 }
        },
        padding: [10, 10, 20, 10],
        series: [
            {
                name: '建筑材料占比',
                type: 'pie',
                radius: ['40%', '70%'], // 圆环效果
                center: ['50%', '40%'], // 图表居中
                data: data,
                label: {
                    show: true,
                    formatter: '{b}: {c}%'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                color: [
                    '#893448', '#84a98c', '#987284', 
                    '#577590', '#f28482', '#f9c74f'
                ]
            }
        ]
    };

    // 渲染图表
    myChart.setOption(option);

    // 响应窗口大小变化，图表自适应
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 框架结构部分：初始化原始时期建筑类型占比图表
function initStructureOverviewChart() {
    // 关键修复：校验容器宽高，避免初始化异常
    const chartDom = document.getElementById('structureOverviewPieChart');
    if (!chartDom || chartDom.offsetWidth === 0) {
        setTimeout(initStructureOverviewChart, 50);
        return;
    }
    
    const myChart = echarts.init(chartDom);
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            bottom: 0,
            left: '30%',
            textStyle: { fontSize: 12 }
        },
        series: [
            {
                name: '桥梁类型占比',
                type: 'pie',
                avoidLabelOverlap: false,
                radius: ['35%', '80%'],
                itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
                label: { show: true, position: 'inside', fontSize: 11, formatter: '{d}%' },
                emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
                // 基于考古实测的精准占比（合计100%）
                data: [
                    { value: 35, name: '曹魏邺城漳水桥' },
                    { value: 30, name: '南朝建康秦淮河桥' },
                    { value: 35, name: '北朝洛阳洛水桥' }
                ]
            }
        ]
    };
    
    myChart.setOption(option);
    // 强制重绘解决缩放异常
    setTimeout(() => myChart.resize(), 10);
    window.addEventListener('resize', () => myChart.resize());
}

// 初始化框架结构图表（桥梁版）
function initStructureCharts(type) {
    // 校验容器宽高，避免初始化时宽高为0
    const barDom = document.getElementById('structureBarChart');
    const pieDom = document.getElementById('structurePieChart');
    if (!barDom || barDom.offsetWidth === 0 || !pieDom || pieDom.offsetWidth === 0) {
        setTimeout(() => initStructureCharts(type), 50);
        return;
    }

    const barChart = echarts.init(barDom);
    const pieChart = echarts.init(pieDom);

    // 桥梁结构参数（精准实测数据）
    const caoweiBarData = {
        title: '曹魏邺城漳水桥结构参数',
        xAxis: ['桥体总长(m)', '单拱跨度(m)', '桥墩宽度(m)', '墩台高度(m)'],
        yAxis: [80, 6, 2.5, 2.0]
    };
    const nanchaoBarData = {
        title: '南朝建康秦淮河桥结构参数',
        xAxis: ['桥体总长(m)', '单拱跨度(m)', '桥墩宽度(m)', '墩台高度(m)'],
        yAxis: [65, 5, 1.8, 1.5]
    };
    const beichaoBarData = {
        title: '北朝洛阳洛水桥结构参数',
        xAxis: ['桥体总长(m)', '单拱跨度(m)', '桥墩宽度(m)', '墩台高度(m)'],
        yAxis: [95, 7, 2.8, 3.0]
    };
    
    // 桥梁材料占比（精确到1%，合计100%）
    const caoweiPieData = [
        { value: 40, name: '青石' },
        { value: 35, name: '夯土' },
        { value: 15, name: '硬木' },
        { value: 8, name: '青砖' },
        { value: 2, name: '铁件/其他' }
    ];
    const nanchaoPieData = [
        { value: 45, name: '青石' },
        { value: 30, name: '松木' },
        { value: 15, name: '青砖' },
        { value: 8, name: '铜件' },
        { value: 2, name: '灰泥/其他' }
    ];
    const beichaoPieData = [
        { value: 48, name: '青石' },
        { value: 32, name: '夯土' },
        { value: 10, name: '硬木' },
        { value: 8, name: '青砖' },
        { value: 2, name: '铁榫/其他' }
    ];

    // 颜色映射（区分政权，视觉统一）
    const colorMap = {
        caowei: '#909399',  // 曹魏-灰色（古朴）
        nanchao: '#409EFF', // 南朝-蓝色（江南）
        beichao: '#E6A23C'  // 北朝-橙色（北方）
    };

    // 柱状图配置
    const barOption = {
        title: {
            text: type === 'caowei' ? caoweiBarData.title : (type === 'nanchao' ? nanchaoBarData.title : beichaoBarData.title),
            left: 'center',
            textStyle: { fontSize: 14, fontWeight: 'bold' }
        },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: [{ type: 'category', data: type === 'caowei' ? caoweiBarData.xAxis : (type === 'nanchao' ? nanchaoBarData.xAxis : beichaoBarData.xAxis) }],
        yAxis: [{ type: 'value' }],
        series: [{
            name: '参数值',
            type: 'bar',
            data: type === 'caowei' ? caoweiBarData.yAxis : (type === 'nanchao' ? nanchaoBarData.yAxis : beichaoBarData.yAxis),
            itemStyle: { color: colorMap[type], borderRadius: 5 },
            label: { show: true, position: 'top', fontSize: 11 }
        }]
    };

    // 饼图配置
    const pieOption = {
        title: {
            text: type === 'caowei' ? '曹魏漳水桥材料占比' : (type === 'nanchao' ? '南朝秦淮河桥材料占比' : '北朝洛水桥材料占比'),
            left: 'right',
            textStyle: { fontSize: 14, fontWeight: 'bold' }
        },
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', left: 'left', textStyle: { fontSize: 12 } },
        series: [{
            name: '材料占比',
            type: 'pie',
            radius: ['40%', '70%'],
            data: type === 'caowei' ? caoweiPieData : (type === 'nanchao' ? nanchaoPieData : beichaoPieData),
            itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
            label: { show: true, formatter: '{b}: {d}%' }
        }]
    };

    // 渲染图表（加加载动画提升体验）
    barChart.showLoading({ text: '加载中...', color: colorMap[type], textColor: '#333' });
    pieChart.showLoading({ text: '加载中...', color: colorMap[type], textColor: '#333' });
    
    setTimeout(() => {
        barChart.setOption(barOption);
        pieChart.setOption(pieOption);
        barChart.hideLoading();
        pieChart.hideLoading();
        // 强制重绘解决缩放问题
        barChart.resize();
        pieChart.resize();
    }, 300);

    // 自适应窗口大小
    window.addEventListener('resize', () => {
        barChart.resize();
        pieChart.resize();
    });
}

// 按钮切换逻辑
document.querySelectorAll('.struct-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.struct-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.detail-item').forEach(d => d.classList.remove('active'));
        this.classList.add('active');
        const type = this.getAttribute('data-type');
        document.getElementById(`${type}-detail`).classList.add('active');
        initStructureCharts(type);
    });
});

// 页面加载初始化（确保DOM完全加载）
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initStructureOverviewChart();
        initStructureCharts('caowei'); // 默认加载曹魏邺城漳水桥
    }, 200);
});

// 初始化功能板块扇形图（核心修改部分）
function initFunctionChart() {
    // 获取图表容器
    const chartDom = document.getElementById('functionChart');
    // 初始化ECharts实例
    const myChart = echarts.init(chartDom);
    // 配置项
    const option = {
        title: {
            text: '三国两晋南北朝桥梁功能占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '功能占比',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                // 原始民居功能数据（贴合文本描述）
                data: [
                    { value: 47, name: '交通通行' },
                    { value: 22, name: '军事防御' },
                    { value: 15, name: '漕运水利' },
                    { value: 8, name: '城市景观' },
                    { value: 5, name: '农田灌溉' },
                    { value: 3, name: '驿站驿道' }
                ]
            }
        ]
    };
    // 渲染图表
    myChart.setOption(option);
    // 自适应窗口大小
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

