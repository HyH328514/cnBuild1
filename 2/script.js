// 时间轴标记数据（可自定义修改/增删）
const z_timeData = [
    { 
        timeLabel: "原始时期",
        buildings: [
            { name: "民居", icon: "🏠", description: "原始洞穴、茅草屋" },
            { name: "官府", icon: "🏛️", description: "部落议事场所" },
            { name: "皇宫", icon: "👑", description: "部落首领居所" },
            { name: "桥梁", icon: "🌉", description: "简易木桥、石桥" }
        ]
    },
    { 
        timeLabel: "商周时期",
        buildings: [
            { name: "民居", icon: "🏠", description: "半地穴式房屋" },
            { name: "官府", icon: "🏛️", description: "青铜器装饰的官署" },
            { name: "皇宫", icon: "👑", description: "夯土高台宫殿" },
            { name: "桥梁", icon: "🌉", description: "木结构梁桥" }
        ]
    },
    { 
        timeLabel: "秦汉时期",
        buildings: [
            { name: "民居", icon: "🏠", description: "木构架院落" },
            { name: "官府", icon: "🏛️", description: "砖石结构官署" },
            { name: "皇宫", icon: "👑", description: "阿房宫、未央宫" },
            { name: "桥梁", icon: "🌉", description: "石拱桥、廊桥" }
        ]
    },
    { 
        timeLabel: "三国两晋南北朝时期",
        buildings: [
            { name: "民居", icon: "🏠", description: "坞壁、庄园建筑" },
            { name: "官府", icon: "🏛️", description: "府衙、刺史府" },
            { name: "皇宫", icon: "👑", description: "台城、洛阳宫" },
            { name: "桥梁", icon: "🌉", description: "木石混合桥" }
        ]
    },
    { 
        timeLabel: "隋唐五代时期",
        buildings: [
            { name: "民居", icon: "🏠", description: "坊市制里坊住宅" },
            { name: "官府", icon: "🏛️", description: "三省六部官署" },
            { name: "皇宫", icon: "👑", description: "大明宫、太极宫" },
            { name: "桥梁", icon: "🌉", description: "赵州桥（隋）" }
        ]
    },
    { 
        timeLabel: "宋辽金元时期",
        buildings: [
            { name: "民居", icon: "🏠", description: "市井街巷民居" },
            { name: "官府", icon: "🏛️", description: "开封府、临安府" },
            { name: "皇宫", icon: "👑", description: "紫禁城雏形" },
            { name: "桥梁", icon: "🌉", description: "虹桥、卢沟桥" }
        ]
    },
    { 
        timeLabel: "明清时期",
        buildings: [
            { name: "民居", icon: "🏠", description: "四合院、徽派建筑" },
            { name: "官府", icon: "🏛️", description: "衙门、总督府" },
            { name: "皇宫", icon: "👑", description: "北京故宫" },
            { name: "桥梁", icon: "🌉", description: "十七孔桥、玉带桥" }
        ]
    } 
];

// DOM元素获取
const z_progressBar = document.getElementById('z_progressBar');
const z_progressIndicator = document.getElementById('z_progressIndicator');
const z_progressThumb = document.getElementById('z_progressThumb');
const z_timeMarkers = document.getElementById('z_timeMarkers');
const z_currentPeriod = document.getElementById('z_currentPeriod');

// 核心变量
let z_currentIndex = 0;          // 当前标记索引
const z_totalMarks = z_timeData.length; // 总标记数
let z_currentPopup = null;       // 当前显示的弹窗
let z_hoverTimer = null;         // 悬停计时器（用于延迟消失）
let z_scrollCooldown = false;    // 滚动冷却（防止滚动过快）

// 初始化时间轴（生成标记+初始进度）
function z_initTimeline() {
    // 动态生成时间标记
    z_timeData.forEach((item, index) => {
        const z_markerEl = document.createElement('div');
        z_markerEl.className = 'z_time-marker';
        z_markerEl.textContent = item.timeLabel;
        z_markerEl.dataset.index = index;
        
        // 创建弹窗元素（但先隐藏）
        const z_popupEl = document.createElement('div');
        z_popupEl.className = 'z_time-popup';
        z_popupEl.dataset.index = index;
        
        // 弹窗标题
        const z_titleEl = document.createElement('div');
        z_titleEl.className = 'z_popup-title';
        z_titleEl.textContent = `${item.timeLabel}建筑类型`;
        
        // 弹窗内容网格
        const z_gridEl = document.createElement('div');
        z_gridEl.className = 'z_popup-grid';
        
        // 添加四个选项
        item.buildings.forEach(building => {
            const z_itemEl = document.createElement('div');
            z_itemEl.className = 'z_popup-item';
            z_itemEl.innerHTML = `
                <span class="z_popup-item-icon">${building.icon}</span>
                <div class="z_popup-item-text">
                    <strong>${building.name}</strong><br>
                    <small style="font-size: 0.8rem; opacity: 0.7;">${building.description}</small>
                </div>
            `;
            // 点击选项的事件
            z_itemEl.addEventListener('click', (e) => {
                e.stopPropagation();
                alert(`您选择了${item.timeLabel}的${building.name}：${building.description}`);
            });
            z_gridEl.appendChild(z_itemEl);
        });
        
        // 组装弹窗
        z_popupEl.appendChild(z_titleEl);
        z_popupEl.appendChild(z_gridEl);
        
        // 将弹窗附加到标记元素
        z_markerEl.appendChild(z_popupEl);
        
        // 绑定悬停事件
        z_markerEl.addEventListener('mouseenter', z_handleMarkerMouseEnter);
        z_markerEl.addEventListener('mouseleave', z_handleMarkerMouseLeave);
        
        z_timeMarkers.appendChild(z_markerEl);
    });
    
    // 设置当前时期显示
    z_updateCurrentPeriod();
    
    // 更新初始进度和当前时期显示
    z_updateProgress();
}

// 处理鼠标进入标记
function z_handleMarkerMouseEnter(e) {
    clearTimeout(z_hoverTimer);
    
    // 如果已有弹窗显示，先隐藏
    if (z_currentPopup) {
        z_currentPopup.classList.remove('show');
    }
    
    // 获取当前标记的弹窗
    const z_marker = e.currentTarget;
    const z_popup = z_marker.querySelector('.z_time-popup');
    
    // 显示弹窗
    z_popup.classList.add('show');
    z_currentPopup = z_popup;
    
    // 确保弹窗在可视区域内
    z_adjustPopupPosition(z_popup);
}

// 处理鼠标离开标记
function z_handleMarkerMouseLeave(e) {
    const z_marker = e.currentTarget;
    const z_popup = z_marker.querySelector('.z_time-popup');
    
    // 延迟隐藏，避免鼠标移动到弹窗时立即消失
    z_hoverTimer = setTimeout(() => {
        z_popup.classList.remove('show');
        if (z_currentPopup === z_popup) {
            z_currentPopup = null;
        }
    }, 200);
}

// 调整弹窗位置（防止超出屏幕）
function z_adjustPopupPosition(z_popup) {
    const z_rect = z_popup.getBoundingClientRect();
    
    // 如果弹窗超出右侧屏幕边界
    if (z_rect.right > window.innerWidth - 10) {
        z_popup.style.left = 'auto';
        z_popup.style.right = '0';
        z_popup.style.transform = 'translateX(0)';
        // 调整箭头位置
        z_popup.style.setProperty('--z-arrow-offset', '90%');
    } 
    // 如果弹窗超出左侧屏幕边界
    else if (z_rect.left < 10) {
        z_popup.style.left = '0';
        z_popup.style.right = 'auto';
        z_popup.style.transform = 'translateX(0)';
        z_popup.style.setProperty('--z-arrow-offset', '10%');
    } 
    // 正常居中显示
    else {
        z_popup.style.left = '50%';
        z_popup.style.right = 'auto';
        z_popup.style.transform = 'translateX(-50%)';
        z_popup.style.removeProperty('--z-arrow-offset');
    }
}

// 切换到指定索引的标记
function z_switchToMark(index) {
    if (index < 0) index = 0;
    if (index >= z_totalMarks) index = z_totalMarks - 1;
    
    // 如果索引没变，直接返回
    if (z_currentIndex === index) return;
    
    z_currentIndex = index;
    z_updateCurrentPeriod();
    z_updateProgress();
}

// 更新当前时期显示
function z_updateCurrentPeriod() {
    const z_currentData = z_timeData[z_currentIndex];
    z_currentPeriod.textContent = z_currentData.timeLabel;
    z_currentPeriod.classList.add('show');
    
    // 添加动画效果
    z_currentPeriod.style.transform = 'translateX(-50%) scale(1.1)';
    setTimeout(() => {
        z_currentPeriod.style.transform = 'translateX(-50%) scale(1)';
    }, 200);
}

// 更新进度条和滑块位置
function z_updateProgress() {
    const z_progressPercent = (z_currentIndex / (z_totalMarks - 1)) * 100;
    z_progressIndicator.style.width = `${z_progressPercent}%`;
    z_progressThumb.style.left = `${z_progressPercent}%`;
}

// 处理全局滚动事件
function z_handleGlobalWheel(e) {
    e.preventDefault();
    
    // 防止滚动过快
    if (z_scrollCooldown) return;
    
    // 设置滚动冷却
    z_scrollCooldown = true;
    setTimeout(() => {
        z_scrollCooldown = false;
    }, 150); // 150ms冷却时间
    
    // 判断滚动方向
    const z_direction = e.deltaY > 0 ? 1 : -1;
    
    // 切换到下一个或上一个时期
    const z_newIndex = z_currentIndex + z_direction;
    z_switchToMark(z_newIndex);
}

// 绑定所有交互事件
function z_bindEvents() {
    // 阻止页面默认滚动
    document.addEventListener('wheel', z_handleGlobalWheel, { passive: false });
    
    // 点击进度条跳转对应标记
    z_progressBar.addEventListener('click', (e) => {
        const z_rect = z_progressBar.getBoundingClientRect();
        const z_clickX = e.clientX - z_rect.left;
        const z_clickPercent = z_clickX / z_rect.width;
        // 计算点击位置对应的标记索引
        const z_targetIndex = Math.round(z_clickPercent * (z_totalMarks - 1));
        const z_finalIndex = Math.min(Math.max(z_targetIndex, 0), z_totalMarks - 1);
        z_switchToMark(z_finalIndex);
    });

    // 拖拽滑块调整标记
    let z_isDragging = false;
    // 按下滑块开始拖拽
    z_progressThumb.addEventListener('mousedown', (e) => {
        z_isDragging = true;
        e.preventDefault();
    });
    // 拖动鼠标更新位置
    document.addEventListener('mousemove', (e) => {
        if (!z_isDragging) return;
        const z_rect = z_progressBar.getBoundingClientRect();
        const z_dragX = e.clientX - z_rect.left;
        const z_dragPercent = z_dragX / z_rect.width;
        // 限制拖拽范围在0-100%
        const z_finalPercent = Math.min(Math.max(z_dragPercent, 0), 1);
        const z_targetIndex = Math.round(z_finalPercent * (z_totalMarks - 1));
        const z_finalIndex = Math.min(Math.max(z_targetIndex, 0), z_totalMarks - 1);
        z_switchToMark(z_finalIndex);
    });
    // 松开鼠标结束拖拽
    document.addEventListener('mouseup', () => {
        z_isDragging = false;
    });
    // 鼠标离开页面也结束拖拽
    document.addEventListener('mouseleave', () => {
        z_isDragging = false;
    });
    
    // 弹窗相关事件
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.z_time-popup')) {
            clearTimeout(z_hoverTimer);
        }
    });
    
    document.addEventListener('mouseleave', function(e) {
        if (e.target.closest('.z_time-popup')) {
            const z_popup = e.target.closest('.z_time-popup');
            z_hoverTimer = setTimeout(() => {
                z_popup.classList.remove('show');
                z_currentPopup = null;
            }, 200);
        }
    });
}

// 初始化函数
function z_init() {
    z_initTimeline();
    z_bindEvents();
    
    // 3秒后淡出提示
    setTimeout(() => {
        const z_hint = document.querySelector('.z_scroll-hint');
        z_hint.style.transition = 'opacity 1s ease';
        z_hint.style.opacity = '0';
        setTimeout(() => z_hint.style.display = 'none', 1000);
    }, 3000);
    
    // 5秒后隐藏当前时期显示
    setTimeout(() => {
        z_currentPeriod.style.transition = 'opacity 1s ease';
        z_currentPeriod.style.opacity = '0';
        setTimeout(() => z_currentPeriod.classList.remove('show'), 1000);
    }, 5000);
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', z_init);