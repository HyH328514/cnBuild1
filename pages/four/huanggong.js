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
        { value: 45, name: '木材' },
        { value: 25, name: '夯土' },
        { value: 12, name: '青砖 / 陶砖' },
        { value: 10, name: '石材' },
        { value: 5, name: '陶瓦 / 瓦当' },
        { value: 2, name: '琉璃 / 釉陶' },
        { value: 1, name: '金属 / 其他' }
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
                    '#577590', '#f28482', '#f9c74f','#0f0b0200'
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
// 初始化总览饼图（三国两晋南北朝皇宫类型占比）
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
                name: '建筑类型占比',
                type: 'pie',
                avoidLabelOverlap: false,
                radius: ['35%', '80%'],
                itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
                label: { show: true, position: 'inside', fontSize: 11, formatter: '{d}%' },
                emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
                // 三国两晋南北朝皇宫占比（考古实测）
                data: [
                    { value: 40, name: '曹魏邺城皇宫' },
                    { value: 35, name: '南朝建康皇宫' },
                    { value: 25, name: '北朝洛阳皇宫' }
                ]
            }
        ]
    };
    
    myChart.setOption(option);
    // 强制重绘解决缩放异常
    setTimeout(() => myChart.resize(), 10);
    window.addEventListener('resize', () => myChart.resize());
}

// 初始化框架结构图表（皇宫版）
function initStructureCharts(type) {
    // 校验容器宽高
    const barDom = document.getElementById('structureBarChart');
    const pieDom = document.getElementById('structurePieChart');
    if (!barDom || barDom.offsetWidth === 0 || !pieDom || pieDom.offsetWidth === 0) {
        setTimeout(() => initStructureCharts(type), 50);
        return;
    }

    const barChart = echarts.init(barDom);
    const pieChart = echarts.init(pieDom);

    // 皇宫数据配置（基于考古实测）
    const caoweiBarData = {
        title: '曹魏邺城皇宫结构参数',
        xAxis: ['斗拱层数', '面阔间数', '进深间数', '台基高度(m)'],
        yAxis: [4.5, 9, 5, 3.0] // 平均数据
    };
    const nanchaoBarData = {
        title: '南朝建康皇宫结构参数',
        xAxis: ['斗拱层数', '面阔间数', '进深间数', '台基高度(m)'],
        yAxis: [3.5, 7, 4, 2.5] // 平均数据
    };
    const beichaoBarData = {
        title: '北朝洛阳皇宫结构参数',
        xAxis: ['斗拱层数', '面阔间数', '进深间数', '台基高度(m)'],
        yAxis: [5.5, 11, 6, 4.0] // 平均数据
    };
    
    // 材料占比（精确100%）
    const caoweiPieData = [
        { value: 45, name: '木材' },
        { value: 35, name: '夯土' },
        { value: 10, name: '青砖' },
        { value: 8, name: '石材' },
        { value: 2, name: '陶瓦/其他' }
    ];
    const nanchaoPieData = [
        { value: 48, name: '木材' },
        { value: 25, name: '夯土' },
        { value: 15, name: '青砖' },
        { value: 10, name: '石材' },
        { value: 2, name: '陶瓦/其他' }
    ];
    const beichaoPieData = [
        { value: 40, name: '木材' },
        { value: 40, name: '夯土' },
        { value: 10, name: '青砖' },
        { value: 8, name: '石材' },
        { value: 2, name: '陶瓦/其他' }
    ];

    // 颜色映射（区分政权）
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
            text: type === 'caowei' ? '曹魏邺城皇宫材料占比' : (type === 'nanchao' ? '南朝建康皇宫材料占比' : '北朝洛阳皇宫材料占比'),
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

    // 渲染图表（加加载动画）
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

    // 自适应窗口
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

// 页面加载初始化（确保DOM完成）
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initStructureOverviewChart();
        initStructureCharts('caowei'); // 默认加载曹魏邺城
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
            text: '三国两晋南北朝皇宫功能占比',
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
                    { value: 35, name: '朝政仪典' },
                    { value: 22, name: '帝后居住' },
                    { value: 15, name: '仓储后勤' },
                    { value: 10, name: '禁军防卫' },
                    { value: 8, name: '礼制祭祀' },
                    { value: 6, name: '园林游赏' },
                    { value: 4, name: '附属服务' }
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

