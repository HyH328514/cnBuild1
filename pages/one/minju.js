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
});