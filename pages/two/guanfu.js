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
            initStructureCharts('hemudu'); // 默认初始化半坡图表
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

// 官府雏形建筑材料占比图表初始化函数
function initMaterialPieChart() {
    // 检查ECharts是否加载、图表容器是否存在
    if (typeof echarts === 'undefined' || !document.getElementById('pieChart')) {
        return;
    }
    // 初始化ECharts实例
    let myChart = echarts.init(document.getElementById('pieChart'));
    // 商周时期官府建筑材料占比数据
    let data = [
        { value: 45, name: '优质木材（松木/柏木）' },
        { value: 30, name: '高强度版筑夯土' },
        { value: 10, name: '陶瓦/陶质脊饰' },
        { value: 8, name: '青石（基座/柱础/台阶）' },
        { value: 5, name: '竹篾/木质格栅' },
        { value: 2, name: '矿物颜料/其他' }
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

// 框架结构部分：初始化新石器时代官府雏形建筑类型占比图表
function initStructureOverviewChart() {
    // 获取图表容器
    const chartDom = document.getElementById('structureOverviewPieChart');
    if (!chartDom || typeof echarts === 'undefined') return;
    const myChart = echarts.init(chartDom);
    // 配置项
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            bottom: 0,
            left: '30%',
            textStyle: {
                fontSize: 12
            }
        },
        series: [
            {
                name: '建筑类型占比',
                type: 'pie',
                avoidLabelOverlap: false,
                radius: ['35%', '80%'],
                itemStyle: {
                    borderRadius: 8,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 11,
                    formatter: '{d}%'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                // 商周时期官府类型占比
                data: [
                    { value: 45, name: '殷墟侯府（商代）' },
                    { value: 55, name: '丰镐卿大夫府（周代）' }
                ]
            }
        ]
    };
    
    // 渲染图表
    myChart.setOption(option);
    // 响应窗口大小变化
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 初始化框架结构图表（殷墟侯府/丰镐卿大夫府）
function initStructureCharts(type) {
    // 检查容器和ECharts是否存在
    const barDom = document.getElementById('structureBarChart');
    const pieDom = document.getElementById('structurePieChart');
    if (!barDom || !pieDom || typeof echarts === 'undefined') return;
    
    // 1. 柱状图：结构参数对比
    const barChart = echarts.init(barDom);
    // 2. 饼图：结构组成占比
    const pieChart = echarts.init(pieDom);

    // 殷墟侯府/丰镐卿大夫府 数据配置
    const hemuduBarData = { // 殷墟侯府（商代）
        title: '殷墟侯府（商代）结构参数',
        xAxis: ['夯土基座厚度(m)', '立柱直径(cm)', '梁架层数', '大堂面积(㎡)'],
        yAxis: [1.5, 50, 3, 120]
    };
    const banpoBarData = { // 丰镐卿大夫府（周代）
        title: '丰镐卿大夫府（周代）结构参数',
        xAxis: ['夯土基座厚度(m)', '立柱直径(cm)', '梁架层数', '建筑群总面积(㎡)'],
        yAxis: [2.0, 60, 4, 300]
    };
    const hemuduPieData = [ // 殷墟侯府结构组成
        { value: 40, name: '夯土' },
        { value: 35, name: '木材' },
        { value: 15, name: '青石' },
        { value: 8, name: '茅草' },
        { value: 2, name: '其他' }
    ];
    const banpoPieData = [ // 丰镐卿大夫府结构组成
        { value: 38, name: '木材' },
        { value: 30, name: '夯土' },
        { value: 12, name: '陶瓦' },
        { value: 10, name: '青石' },
        { value: 6, name: '白灰/彩绘' },
        { value: 4, name: '其他' }
    ];

    // 柱状图配置
    const barOption = {
        title: {
            text: type === 'hemudu' ? hemuduBarData.title : banpoBarData.title,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: type === 'hemudu' ? hemuduBarData.xAxis : banpoBarData.xAxis
        }],
        yAxis: [{ type: 'value' }],
        series: [{
            name: '参数值',
            type: 'bar',
            data: type === 'hemudu' ? hemuduBarData.yAxis : banpoBarData.yAxis,
            itemStyle: {
                color: type === 'hemudu' ? '#67C23A' : '#E6A23C'
            }
        }]
    };

    // 饼图配置
    const pieOption = {
        title: {
            text: type === 'hemudu' ? '殷墟侯府（商代）结构组成' : '丰镐卿大夫府（周代）结构组成',
            left: 'right'
        },
        tooltip: { trigger: 'item' },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: '材料占比',
            type: 'pie',
            radius: ['40%', '70%'],
            data: type === 'hemudu' ? hemuduPieData : banpoPieData,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            }
        }]
    };

    // 渲染图表
    barChart.setOption(barOption);
    pieChart.setOption(pieOption);

    // 自适应窗口大小
    window.addEventListener('resize', () => {
        barChart.resize();
        pieChart.resize();
    });
}

// 初始化功能板块扇形图（商周官府功能占比）
function initFunctionChart() {
    // 获取图表容器
    const chartDom = document.getElementById('functionChart');
    if (!chartDom || typeof echarts === 'undefined') return;
    
    // 初始化ECharts实例
    const myChart = echarts.init(chartDom);
    // 配置项（商周官府功能占比数据）
    const option = {
        title: {
            text: '商周时期官府功能占比',
            left: 'right'
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
                data: [
                    { value: 38, name: '行政办公' },
                    { value: 28, name: '司法审判' },
                    { value: 18, name: '礼仪接待' },
                    { value: 12, name: '物资管理' },
                    { value: 4, name: '其他（祭祀/休闲）' }
                ],
                label: {
                    show: true,
                    formatter: '{b}: {c}%'
                },
                color: [
                    '#893448', '#84a98c', '#987284', 
                    '#577590', '#f28482'
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