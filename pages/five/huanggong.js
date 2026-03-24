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
        { value: 23, name: '青砖' },
        { value: 15, name: '夯土' },
        { value: 10, name: '石材' },
        { value: 7, name: '琉璃瓦' },
        { value: 3, name: '普通青瓦' },
        { value: 1, name: '灰泥 / 白灰' },
        { value: 1, name: '金属构件（铁 / 铜件）' }
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

// 页面加载完成后初始化所有图表
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化（确保DOM完全渲染，宽高计算准确）
    setTimeout(() => {
        initStructureOverviewChart();
        initStructureCharts('changan');
        bindStructBtnEvent();
    }, 300);
});

// 1. 初始化皇宫类型占比总图表（新增强制resize+宽高校验）
function initStructureOverviewChart() {
    const chartDom = document.getElementById('structureOverviewPieChart');
    if (!chartDom) return;

    // 强制设置容器最小宽高（避免初始宽高为0）
    chartDom.style.minWidth = '100%';
    chartDom.style.minHeight = '180px';
    
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
                    { value: 45, name: '长安皇宫' },
                    { value: 40, name: '洛阳皇宫' },
                    { value: 15, name: '五代皇宫' }
                ]
            }
        ]
    };
    
    myChart.setOption(option);
    // 强制触发resize（核心修复：初始化后立即重绘）
    setTimeout(() => myChart.resize(), 100);
    // 自适应窗口大小
    window.addEventListener('resize', () => myChart.resize());
}

// 2. 初始化框架结构图表（新增宽高强制赋值+延迟resize）
function initStructureCharts(type) {
    const barDom = document.getElementById('structureBarChart');
    const pieDom = document.getElementById('structurePieChart');
    if (!barDom || !pieDom) return;

    // 强制设置容器宽高（解决初始宽高为0的问题）
    barDom.style.width = '100%';
    barDom.style.height = '300px';
    pieDom.style.width = '100%';
    pieDom.style.height = '300px';

    const barChart = echarts.init(barDom);
    const pieChart = echarts.init(pieDom);

    const dataMap = {
        'changan': {
            bar: {
                title: '长安大明宫结构参数',
                xAxis: ['金柱直径(m)', '台基高度(m)', '屋顶坡度(°)', '墙体厚度(m)'],
                yAxis: [0.48, 15, 20, 3.2]
            },
            pie: [
                { value: 40, name: '木材' },
                { value: 23, name: '青砖' },
                { value: 15, name: '夯土' },
                { value: 10, name: '石材' },
                { value: 7, name: '琉璃瓦' },
                { value: 3, name: '普通青瓦' },
                { value: 1, name: '灰泥/白灰' },
                { value: 1, name: '金属构件' }
            ],
            color: '#409EFF'
        },
        'luoyang': {
            bar: {
                title: '洛阳紫微城结构参数',
                xAxis: ['金柱直径(m)', '台基高度(m)', '屋顶坡度(°)', '墙体厚度(m)'],
                yAxis: [0.42, 12, 28, 2.8]
            },
            pie: [
                { value: 38, name: '木材' },
                { value: 25, name: '青砖' },
                { value: 14, name: '夯土' },
                { value: 9, name: '石材' },
                { value: 12, name: '琉璃瓦' },
                { value: 1, name: '普通青瓦' },
                { value: 1, name: '灰泥/白灰' },
                { value: 0, name: '金属构件' }
            ],
            color: '#67C23A'
        },
        'wudai': {
            bar: {
                title: '五代皇宫结构参数',
                xAxis: ['金柱直径(m)', '台基高度(m)', '屋顶坡度(°)', '墙体厚度(m)'],
                yAxis: [0.38, 8, 24, 3.5]
            },
            pie: [
                { value: 40, name: '木材' },
                { value: 22, name: '青砖' },
                { value: 18, name: '夯土' },
                { value: 11, name: '石材' },
                { value: 7, name: '琉璃瓦' },
                { value: 1, name: '普通青瓦' },
                { value: 1, name: '灰泥/白灰' },
                { value: 0, name: '金属构件' }
            ],
            color: '#E6A23C'
        }
    };

    const barOption = {
        title: { text: dataMap[type].bar.title, left: 'center' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: [{ type: 'category', data: dataMap[type].bar.xAxis }],
        yAxis: [{ type: 'value' }],
        series: [{
            name: '参数值',
            type: 'bar',
            data: dataMap[type].bar.yAxis,
            itemStyle: { color: dataMap[type].color }
        }]
    };

    const pieTitleMap = {
        'changan': '长安大明宫材料占比',
        'luoyang': '洛阳紫微城材料占比',
        'wudai': '五代皇宫材料占比'
    };
    const pieOption = {
        title: { text: pieTitleMap[type], left: 'right' },
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', left: 'left' },
        series: [{
            name: '材料占比',
            type: 'pie',
            radius: ['40%', '70%'],
            data: dataMap[type].pie,
            itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 }
        }]
    };

    // 渲染图表后强制resize
    barChart.setOption(barOption);
    pieChart.setOption(pieOption);
    
    // 核心修复：延迟触发resize，确保宽高计算准确
    setTimeout(() => {
        barChart.resize();
        pieChart.resize();
    }, 100);

    window.addEventListener('resize', () => {
        barChart.resize();
        pieChart.resize();
    });
}

// 3. 绑定切换按钮事件（新增切换后强制resize）
function bindStructBtnEvent() {
    const btns = document.querySelectorAll('.struct-btn');
    const details = document.querySelectorAll('.detail-item');
    
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            btns.forEach(b => b.classList.remove('active'));
            details.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            const type = this.dataset.type;
            const targetDetail = document.getElementById(`${type}-detail`);
            if (targetDetail) {
                targetDetail.classList.add('active');
                initStructureCharts(type);
                // 切换后强制触发窗口resize（兜底修复）
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 150);
            }
        });
    });
}

// 初始化隋唐五代皇宫功能板块扇形图
function initFunctionChart() {
    // 获取图表容器
    const chartDom = document.getElementById('functionChart');
    // 初始化ECharts实例
    const myChart = echarts.init(chartDom);
    // 配置项
    const option = {
        title: {
            text: '隋唐五代皇宫功能占比',
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
                // 隋唐五代皇宫功能数据（精确100%，贴合文本描述）
                data: [
                    { value: 27, name: '朝会理政（政务/诏令）' },
                    { value: 24, name: '帝后寝居（起居/休憩）' },
                    { value: 15, name: '礼仪祭祀（宗庙/祈福）' },
                    { value: 12, name: '宫廷苑囿（休闲/展示）' },
                    { value: 10, name: '内侍服务（膳房/库房）' },
                    { value: 6, name: '储政文教（史馆/弘文馆）' },
                    { value: 5, name: '守卫门禁（宫门/宿卫）' },
                    { value: 1, name: '作坊仓储（手工业/军备）' }
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
