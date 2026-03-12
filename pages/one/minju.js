// 回到首页逻辑（根据实际首页路径调整）
function goHome() {
    // 首页路径，根据项目实际路径修改
    window.location.href = '../../index.html'; 
}

// Tab 切换逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有 tab 按钮和内容项
    const tabItems = document.querySelectorAll('.tab-item');
    const contentItems = document.querySelectorAll('.content-item');

    // 绑定 tab 点击事件
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // 1. 移除所有 tab 的 active 类
            tabItems.forEach(item => item.classList.remove('active'));
            // 2. 给当前点击的 tab 添加 active 类
            this.classList.add('active');
            // 3. 获取当前 tab 对应的内容 ID
            const tabId = this.getAttribute('data-tab');
            // 4. 移除所有内容的 active 类
            contentItems.forEach(item => item.classList.remove('active'));
            // 5. 显示对应的内容
            document.getElementById(tabId).classList.add('active');
        });
    });
    //初始化原始时代民居材料占比图表
    initMaterialPieChart();
});

// 图表初始化函数
function initMaterialPieChart() {
    // 检查ECharts是否加载、图表容器是否存在
    if (typeof echarts === 'undefined' || !document.getElementById('pieChart')) {
        return;
    }

    // 初始化ECharts实例
    var myChart = echarts.init(document.getElementById('pieChart'));

    // 原始时代民居建筑材料占比数据
    var data = [
        { value: 45, name: '木材（树枝/树干）' },
        { value: 25, name: '茅草/芦苇' },
        { value: 15, name: '泥土/黏土' },
        { value: 8, name: '石块' },
        { value: 5, name: '兽皮' },
        { value: 2, name: '其他（藤条/树叶）' }
    ];

    // 图表配置项
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'horizontal', // 横向排列（适配页面宽度）
            bottom: 10, // 放在图表底部
            textStyle: { fontSize: 12 }
        },
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
