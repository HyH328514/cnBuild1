// 外层tab栏切换逻辑（无修改，保留原有逻辑）
document.querySelectorAll('.tab-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('active'));
        this.classList.add('active');
        const tabId = this.dataset.tab;
        document.querySelectorAll('.content-item').forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        
        if (tabId === 'function') {
            initFunctionChart();
        }
        if (tabId === 'structure') {
            initStructureOverviewChart();
            initStructureCharts('hemudu');
        }
        if (tabId === 'material') {
            initMaterialPieChart();
        }
    });
});

// 框架结构内部按钮交互（无修改，保留原有逻辑）
document.querySelectorAll('.struct-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.struct-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const structType = this.dataset.type;
        document.querySelectorAll('.detail-item').forEach(item => item.classList.remove('active'));
        document.getElementById(`${structType}-detail`).classList.add('active');
        initStructureCharts(structType);
    });
});

// 回到首页函数（无修改）
function goHome() {
    window.location.href = '../../index.html';
}

// 页面加载初始化（无修改）
window.onload = function() {
    initMaterialPieChart();
};

// 1. 建筑材料占比饼图（修改为秦汉数据）
function initMaterialPieChart() {
    if (typeof echarts === 'undefined' || !document.getElementById('pieChart')) {
        return;
    }
    let myChart = echarts.init(document.getElementById('pieChart'));
    // 秦汉皇宫建筑材料占比数据
    let data = [
        { value: 35, name: '珍贵木材（楠木/柏木/紫檀）' },
        { value: 25, name: '青砖' },
        { value: 15, name: '瓦件（青瓦/黄瓦/琉璃瓦）' },
        { value: 10, name: '汉白玉/青白石' },
        { value: 8, name: '金砖（细磨方砖）' },
        { value: 7, name: '夯土（基座）' }
    ];

    let option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            bottom: 10,
            textStyle: { fontSize: 12 }
        },
        padding: [10, 10, 20, 10],
        series: [
            {
                name: '秦汉皇宫建筑材料占比',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '40%'],
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

    myChart.setOption(option);
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 2. 框架结构-秦汉皇宫类型占比（修改为咸阳宫/未央宫数据）
function initStructureOverviewChart() {
    const chartDom = document.getElementById('structureOverviewPieChart');
    if (!chartDom) return;
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
            textStyle: {
                fontSize: 12
            }
        },
        series: [
            {
                name: '秦汉皇宫建筑类型占比',
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
                // 咸阳宫 vs 未央宫 占比数据
                data: [
                    { value: 33, name: '咸阳宫（秦代）' },
                    { value: 67, name: '未央宫（汉代）' }
                ]
            }
        ]
    };
    
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 3. 框架结构-柱状图+饼图数据（修改为秦汉数据）
function initStructureCharts(type) {
    const barDom = document.getElementById('structureBarChart');
    const pieDom = document.getElementById('structurePieChart');
    if (!barDom || !pieDom) return;
    
    const barChart = echarts.init(barDom);
    const pieChart = echarts.init(pieDom);

    // 咸阳宫（秦代）/未央宫（汉代）数据配置
    const hemuduBarData = { // 咸阳宫（秦代）
        title: '咸阳宫结构参数',
        xAxis: ['夯土基座高度(m)', '木柱直径(cm)', '斗拱复杂度(%)', '总面积(km²)'],
        yAxis: [8, 50, 60, 2.5] // 平均数据
    };
    const banpoBarData = { // 未央宫（汉代）
        title: '未央宫结构参数',
        xAxis: ['夯土基座高度(m)', '木柱直径(cm)', '斗拱复杂度(%)', '总面积(km²)'],
        yAxis: [15, 55, 85, 5.0] // 平均数据
    };
    const hemuduPieData = [ // 咸阳宫结构组成
        { value: 38, name: '珍贵木材' },
        { value: 25, name: '青砖' },
        { value: 15, name: '瓦件' },
        { value: 10, name: '汉白玉' },
        { value: 12, name: '夯土基座' }
    ];
    const banpoPieData = [ // 未央宫结构组成
        { value: 35, name: '珍贵木材' },
        { value: 28, name: '青砖' },
        { value: 18, name: '瓦件（含琉璃瓦）' },
        { value: 12, name: '汉白玉/青白石' },
        { value: 7, name: '其他（金砖/园林构件）' }
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
            text: type === 'hemudu' ? '咸阳宫结构组成' : '未央宫结构组成',
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

    barChart.setOption(barOption);
    pieChart.setOption(pieOption);

    window.addEventListener('resize', () => {
        barChart.resize();
        pieChart.resize();
    });
}

// 4. 功能板块图表（修改为秦汉功能占比）
function initFunctionChart() {
    const chartDom = document.getElementById('functionChart');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: '秦汉皇宫功能占比',
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
                    { value: 35, name: '政务大典（登基/朝贺/阅兵）' },
                    { value: 20, name: '王室居住（后宫/日常政务）' },
                    { value: 15, name: '休闲游乐（御花园/太液池）' },
                    { value: 12, name: '仓储军事（太仓/兵器库）' },
                    { value: 10, name: '文化医疗（翰林院/太医院）' },
                    { value: 8, name: '服务保障（禁军/御膳房）' }
                ],
                label: {
                    show: true,
                    formatter: '{b}: {c}%'
                },
                color: [
                    '#893448', '#84a98c', '#987284', 
                    '#577590', '#f28482', '#f9c74f'
                ]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}