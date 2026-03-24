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
            initStructureCharts('hemudu'); // 默认初始化渭桥图表
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
    // 1. 初始化桥梁材料占比饼图
    initMaterialPieChart();
};

// 桥梁建筑材料占比图表初始化函数
function initMaterialPieChart() {
    // 检查ECharts是否加载、图表容器是否存在
    if (typeof echarts === 'undefined' || !document.getElementById('pieChart')) {
        return;
    }
    // 初始化ECharts实例
    let myChart = echarts.init(document.getElementById('pieChart'));
    // 秦汉时期桥梁建筑材料占比数据
    let data = [
        { value: 55, name: '青石/花岗石' },
        { value: 30, name: '木材（桢楠/铁杉/圆柏）' },
        { value: 8, name: '卵石（含铁质网络）' },
        { value: 4, name: '铁榫/白灰/灰浆' },
        { value: 2, name: '砂岩质石构件' },
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
                name: '桥梁材料占比',
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
                    '#577590', '#f28482', '#7209b7'
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

// 框架结构部分：初始化秦汉时期桥梁类型占比图表
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
                name: '桥梁类型占比',
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
                // 桥梁类型占比数据
                data: [
                    { value: 52, name: '渭桥（厨城门一号桥）' },
                    { value: 48, name: '灞桥（秦汉）' }
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

// 初始化框架结构图表（秦汉桥梁专属数据）
function initStructureCharts(type) {
    // 1. 柱状图：结构参数对比
    const barDom = document.getElementById('structureBarChart');
    const barChart = echarts.init(barDom);
    // 2. 饼图：结构组成占比
    const pieDom = document.getElementById('structurePieChart');
    const pieChart = echarts.init(pieDom);

    // 渭桥（厨城门一号桥）/灞桥（秦汉） 数据配置
    const hemuduBarData = {
        title: '渭桥（厨城门一号桥）结构参数',
        xAxis: ['桥桩间距(m)', '桥桩残长(m)', '桥宽(m)', '桥总长(m)'],
        yAxis: [5.0, 7.5, 15.4, 880] // 平均数据
    };
    const banpoBarData = {
        title: '灞桥（秦汉）结构参数',
        xAxis: ['单拱跨度(m)', '桥墩宽度(m)', '桥面宽度(m)', '分水尖长度(m)'],
        yAxis: [8.0, 4.5, 6.2, 2.8] // 平均数据
    };
    const hemuduPieData = [
        { value: 65, name: '桢楠/铁杉/圆柏木' },
        { value: 20, name: '青石' },
        { value: 8, name: '卵石（铁质网络）' },
        { value: 5, name: '砂岩质石构件' },
        { value: 2, name: '铁榫/白灰' }
    ];
    const banpoPieData = [
        { value: 85, name: '青石' },
        { value: 8, name: '灰浆/榫卯辅料' },
        { value: 5, name: '木材（少量）' },
        { value: 2, name: '其他' }
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
            text: type === 'hemudu' ? '渭桥（厨城门一号桥）结构组成' : '灞桥（秦汉）结构组成',
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

// 初始化功能板块扇形图（秦汉桥梁功能数据）
function initFunctionChart() {
    // 获取图表容器
    const chartDom = document.getElementById('functionChart');
    // 初始化ECharts实例
    const myChart = echarts.init(chartDom);
    // 配置项
    const option = {
        title: {
            text: '秦汉时期桥梁功能占比',
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
                // 秦汉桥梁功能数据
                data: [
                    { value: 48, name: '交通运输（人员/物资/车马）' },
                    { value: 22, name: '政治功能（皇权彰显/重大历史事件）' },
                    { value: 12, name: '军事防御（渡口管控/军事运输）' },
                    { value: 8, name: '祭祀功能（水神祭祀/祈福）' },
                    { value: 6, name: '文化展示（建筑典范/折柳送别）' },
                    { value: 4, name: '其他（应急通行/临时储物）' }
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