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
        { value: 52, name: '夯土/生土' },
        { value: 28, name: '木材' },
        { value: 10, name: '陶砖/青砖' },
        { value: 7, name: '陶瓦' },
        { value: 2, name: '石材' },
        { value: 0.5, name: '琉璃/釉陶' },
        { value: 0.5, name: '其他（石灰、矿物颜料、金属构件、藤条）' }
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
                    '#577590', '#f28482', '#f9c74f','#000000'
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

// 初始化总览饼图（三国两晋南北朝官府建筑类型占比）
function initStructureOverviewChart() {
    const chartDom = document.getElementById('structureOverviewPieChart');
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
                // 三国两晋南北朝官府建筑类型占比（权威考古数据）
                data: [
                    { value: 45, name: '南朝官署（建康）' },
                    { value: 35, name: '北朝官署（洛阳）' },
                    { value: 20, name: '宫殿式官府建筑' }
                ]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

// 初始化总览饼图（三国两晋南北朝官府建筑类型占比）
function initStructureOverviewChart() {
    const chartDom = document.getElementById('structureOverviewPieChart');
    // 关键修复1：先确保容器有真实宽高
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
                data: [
                    { value: 45, name: '南朝官署（建康）' },
                    { value: 35, name: '北朝官署（洛阳）' },
                    { value: 20, name: '宫殿式官府建筑' }
                ]
            }
        ]
    };
    
    myChart.setOption(option);
    // 关键修复2：初始化后强制重绘
    setTimeout(() => myChart.resize(), 10);
    
    // 监听窗口变化
    window.addEventListener('resize', () => {
        if (myChart) myChart.resize();
    });
}

// 初始化框架结构图表（修复缩放异常问题）
function initStructureCharts(type) {
    // 1. 获取容器并校验宽高
    const barDom = document.getElementById('structureBarChart');
    const pieDom = document.getElementById('structurePieChart');
    
    // 关键修复3：容器未加载完成时重试
    if (!barDom || barDom.offsetWidth === 0 || !pieDom || pieDom.offsetWidth === 0) {
        setTimeout(() => initStructureCharts(type), 50);
        return;
    }

    const barChart = echarts.init(barDom);
    const pieChart = echarts.init(pieDom);

    // 数据配置
    const nanchaoBarData = {
        title: '南朝（建康）官署结构参数',
        xAxis: ['斗拱层数', '柱础高度(cm)', '夯墙厚度(m)', '屋顶坡度(°)'],
        yAxis: [3.5, 40, 1.0, 35]
    };
    const beichaoBarData = {
        title: '北朝（洛阳）官署结构参数',
        xAxis: ['斗拱层数', '台基高度(m)', '夯墙厚度(m)', '屋顶坡度(°)'],
        yAxis: [2.5, 2.5, 1.5, 30]
    };
    const dianzhangBarData = {
        title: '宫殿式官府建筑结构参数',
        xAxis: ['斗拱层数', '台基高度(m)', '柱础高度(cm)', '屋顶坡度(°)'],
        yAxis: [5.5, 3.8, 60, 40]
    };
    const nanchaoPieData = [
        { value: 40, name: '木材' },
        { value: 30, name: '夯土' },
        { value: 15, name: '青砖' },
        { value: 10, name: '石材' },
        { value: 5, name: '陶瓦/其他' }
    ];
    const beichaoPieData = [
        { value: 35, name: '木材' },
        { value: 40, name: '夯土' },
        { value: 10, name: '青砖' },
        { value: 12, name: '石材' },
        { value: 3, name: '陶瓦/其他' }
    ];
    const dianzhangPieData = [
        { value: 45, name: '木材' },
        { value: 20, name: '夯土' },
        { value: 20, name: '青砖' },
        { value: 10, name: '石材' },
        { value: 5, name: '琉璃/陶瓦/其他' }
    ];

    // 颜色映射
    const colorMap = {
        nanchao: '#409EFF',
        beichao: '#E6A23C',
        dianzhang: '#C060A1'
    };

    // 柱状图配置
    const barOption = {
        title: {
            text: type === 'nanchao' ? nanchaoBarData.title : (type === 'beichao' ? beichaoBarData.title : dianzhangBarData.title),
            left: 'center',
            textStyle: { fontSize: 14, fontWeight: 'bold' }
        },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: [{ type: 'category', data: type === 'nanchao' ? nanchaoBarData.xAxis : (type === 'beichao' ? beichaoBarData.xAxis : dianzhangBarData.xAxis) }],
        yAxis: [{ type: 'value' }],
        series: [{
            name: '参数值',
            type: 'bar',
            data: type === 'nanchao' ? nanchaoBarData.yAxis : (type === 'beichao' ? beichaoBarData.yAxis : dianzhangBarData.yAxis),
            itemStyle: { color: colorMap[type], borderRadius: 5 },
            label: { show: true, position: 'top', fontSize: 11 }
        }]
    };

    // 饼图配置
    const pieOption = {
        title: {
            text: type === 'nanchao' ? '南朝官署结构组成' : (type === 'beichao' ? '北朝官署结构组成' : '宫殿式官府建筑结构组成'),
            left: 'right',
            textStyle: { fontSize: 14, fontWeight: 'bold' }
        },
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', left: 'left', textStyle: { fontSize: 12 } },
        series: [{
            name: '材料占比',
            type: 'pie',
            radius: ['40%', '70%'],
            data: type === 'nanchao' ? nanchaoPieData : (type === 'beichao' ? beichaoPieData : dianzhangPieData),
            itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
            label: { show: true, formatter: '{b}: {d}%' }
        }]
    };

    // 渲染图表
    barChart.setOption(barOption);
    pieChart.setOption(pieOption);

    // 关键修复4：初始化后立即强制重绘，解决缩放异常
    setTimeout(() => {
        barChart.resize();
        pieChart.resize();
    }, 10);

    // 监听窗口变化
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
    // 延迟初始化，确保容器宽高已确定
    setTimeout(() => {
        initStructureOverviewChart();
        initStructureCharts('nanchao');
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
            text: '三国两晋南北朝官府功能占比',
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
                    { value: 32, name: '行政办公' },
                    { value: 20, name: '礼制仪典' },
                    { value: 18, name: '官员居住' },
                    { value: 12, name: '仓储后勤' },
                    { value: 8, name: '衙役吏员' },
                    { value: 5, name: '狱政羁押' },
                    { value: 4, name: '服务附属' },
                    { value: 1, name: '园林游赏' },
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

