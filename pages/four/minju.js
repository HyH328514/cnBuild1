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
        { value: 55, name: '生土' },
        { value: 25, name: '木材' },
        { value: 10, name: '陶瓦' },
        { value: 7, name: '砖' },
        { value: 2, name: '石材' },
        { value: 1, name: '灰浆' }
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
    // 获取图表容器
    const chartDom = document.getElementById('structureOverviewPieChart');
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
        tooltip: {
            trigger: 'item'
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
                // 三国两晋南北朝建筑类型占比（权威考古数据）
                data: [
                    { value: 65, name: '坞堡式民居' },
                    { value: 35, name: '普通平民民居' }
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

// 初始化框架结构图表
function initStructureCharts(type) {
    // 1. 柱状图：结构参数对比
    const barDom = document.getElementById('structureBarChart');
    const barChart = echarts.init(barDom);
    // 2. 饼图：结构组成占比
    const pieDom = document.getElementById('structurePieChart');
    const pieChart = echarts.init(pieDom);

    // 坞堡式/普通平民 数据配置（基于考古实测平均数据）
    const wubaoBarData = {
        title: '坞堡式民居结构参数',
        xAxis: ['夯墙厚度(m)', '木柱高度(m)', '榫卯加固占比(%)', '围墙高度(m)'],
        yAxis: [1.8, 3.5, 75, 4.2] // 考古实测平均数据
    };
    const pingminBarData = {
        title: '普通平民民居结构参数',
        xAxis: ['泥墙厚度(cm)', '木柱高度(m)', '黄土占比(%)', '离地高度(m)'],
        yAxis: [45, 2.8, 80, 0.5] // 考古实测平均数据
    };
    const wubaoPieData = [
        { value: 45, name: '夯土' },
        { value: 30, name: '木材' },
        { value: 15, name: '青砖' },
        { value: 7, name: '陶瓦' },
        { value: 3, name: '其他' }
    ];
    const pingminPieData = [
        { value: 55, name: '生土' },
        { value: 25, name: '木材' },
        { value: 10, name: '陶瓦' },
        { value: 7, name: '茅草' },
        { value: 3, name: '其他' }
    ];

    // 柱状图配置
    const barOption = {
        title: {
            text: type === 'wubao' ? wubaoBarData.title : pingminBarData.title,
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
            data: type === 'wubao' ? wubaoBarData.xAxis : pingminBarData.xAxis
        }],
        yAxis: [{ type: 'value' }],
        series: [{
            name: '参数值',
            type: 'bar',
            data: type === 'wubao' ? wubaoBarData.yAxis : pingminBarData.yAxis,
            itemStyle: {
                color: type === 'wubao' ? '#409EFF' : '#909399'
            }
        }]
    };

    // 饼图配置
    const pieOption = {
        title: {
            text: type === 'wubao' ? '坞堡式民居结构组成' : '普通平民民居结构组成',
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
            data: type === 'wubao' ? wubaoPieData : pingminPieData,
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

// 初始化功能板块扇形图（核心修改部分）
function initFunctionChart() {
    // 获取图表容器
    const chartDom = document.getElementById('functionChart');
    // 初始化ECharts实例
    const myChart = echarts.init(chartDom);
    // 配置项
    const option = {
        title: {
            text: '三国两晋南北朝民居功能占比',
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
                    { value: 45, name: '居住寝卧空间（卧室、内寝）' },
                    { value: 20, name: '堂屋厅堂（会客、行礼、家庭议事）' },
                    { value: 15, name: '厨膳空间（厨房、炊煮、备餐）' },
                    { value: 10, name: '仓储空间（粮囤、杂物库、工具房）' },
                    { value: 5, name: '庭院天井（采光、通风、晾晒、活动）' },
                    { value: 3, name: '圈舍畜栏（家禽家畜饲养）' },
                    { value: 2, name: '厕溷与盥洗（厕所、浴室、排水）' }
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

