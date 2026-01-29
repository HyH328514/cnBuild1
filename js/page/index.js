// 全局共享变量
let currentTimeIndex = 0; // 当前选中的时间轴索引
let imgIndexMap = [1, 2, 3, 4, 5, 6, 7]; // 每个轮播项的当前图片索引(我改的)
// 时间轴标记数据
const z_timeData = [
  { 
    timeLabel: "原始社会",
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
    timeLabel: "三国两晋南北朝",
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
// 时间轴节点对应文件夹名称
const timeNodeFolders = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven'
];

// ===================== 轮播图逻辑 =====================
function initCarousel() {
  const carouselContainer = document.querySelector('.myImage .carousel');
  const carouselUl = carouselContainer.querySelector('ul');
  const carouselItems = Array.from(carouselUl.querySelectorAll('li'));
  const itemCount = carouselItems.length; // 固定7个DOM
  let carouselOffset = 0; // 轮播整体偏移索引（控制7张图整体滚动）

  // 初始化：加载一个时期的七个图片,默认加载原始社会时期
  function initCarouselImgs(input = 0) {
    const folderName = timeNodeFolders[input];
    carouselItems.forEach((item, index) => {
      // 初始显示：img1-img7（偏移为0时）
      const imgIndex = index + 1 + carouselOffset;
      const finalImgIndex = imgIndex < 1 ? 8 : (imgIndex > 8 ? 1 : imgIndex);
      const imgSrc = `../../assets/img/${folderName}/img${finalImgIndex}.png`;
      item.querySelector('img').src = imgSrc;
    });
  }
  initCarouselImgs();

  // 全局更新所有轮播项图片（核心：整体轮播）
  function updateAllCarouselImgs() {
    const folderName = timeNodeFolders[currentTimeIndex]; // 基于当前时间轴选文件夹
    carouselItems.forEach((item, index) => {
      // 计算每个轮播项的图片索引（偏移+自身索引，循环1-8）
      let imgIndex = index + 1 + carouselOffset;
      imgIndex = imgIndex < 1 ? 8 : (imgIndex > 8 ? 1 : imgIndex);
      // 边界处理：超过8则从1开始，小于1则到8
      if (imgIndex > 8) imgIndex = 1;
      if (imgIndex < 1) imgIndex = 8;
      item.querySelector('img').src = `../../assets/img/${folderName}/img${imgIndex}.png`;
    });
  }

  // 监听轮播图区域滚轮事件：控制7张图整体轮播
  carouselContainer.addEventListener('wheel', function(e) {
    e.preventDefault();
    const isScrollDown = e.deltaY > 0;
    // 滚轮向下：偏移+1（整体向后轮播）；向上：偏移-1（整体向前轮播）
    carouselOffset = isScrollDown ? (carouselOffset + 1) : (carouselOffset  - 1);
    // 限制偏移范围（可选：避免偏移过大，仅保留1-8循环）
    if (carouselOffset > 1) carouselOffset = 0;
    if (carouselOffset < -1) carouselOffset = 0;
    // 更新所有7个轮播项的图片
    updateAllCarouselImgs();
  }, { passive: false });

  // 暴露重置轮播项图片的方法（供时间轴调用）
  window.resetCarouselItemImg = function() {
    carouselOffset = 0; // 重置偏移为0
    initCarouselImgs(currentTimeIndex); // 重新加载当前时期初始图
  };

  // 暴露时间轴切换时更新轮播图的方法（核心联动）
  window.updateCarouselByTimeIndex = function(timeIndex) {
    carouselOffset = 0; // 切换时期时重置轮播偏移
    initCarouselImgs(timeIndex); // 加载对应时期的初始7张图
  };
}

// ===================== 时间轴逻辑 =====================
function initTimeline() {
  // DOM元素获取
  const z_progressBar = document.getElementById('z_progressBar');
  const z_progressIndicator = document.getElementById('z_progressIndicator');
  const z_progressThumb = document.getElementById('z_progressThumb');
  const z_timeMarkers = document.getElementById('z_timeMarkers');
  const z_currentPeriod = document.getElementById('z_currentPeriod');

  const z_totalMarks = z_timeData.length; 
  let z_currentPopup = null;       
  let z_hoverTimer = null;         
  let z_scrollCooldown = false;    

  // 初始化时间轴标记
  function z_initTimeline() {
    z_timeData.forEach((item, index) => {
      const z_markerEl = document.createElement('div');
      z_markerEl.className = 'z_time-marker';
      z_markerEl.textContent = item.timeLabel;
      z_markerEl.dataset.index = index;
      
      // 创建弹窗元素
      const z_popupEl = document.createElement('div');
      z_popupEl.className = 'z_time-popup';
      z_popupEl.dataset.index = index;
      
      const z_titleEl = document.createElement('div');
      z_titleEl.className = 'z_popup-title';
      z_titleEl.textContent = `${item.timeLabel}建筑类型`;
      
      const z_gridEl = document.createElement('div');
      z_gridEl.className = 'z_popup-grid';
      
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
        z_itemEl.addEventListener('click', (e) => {
          e.stopPropagation();
          alert(`您选择了${item.timeLabel}的${building.name}：${building.description}`);
        });
        z_gridEl.appendChild(z_itemEl);
      });
      
      z_popupEl.appendChild(z_titleEl);
      z_popupEl.appendChild(z_gridEl);
      z_markerEl.appendChild(z_popupEl);
      
      // 悬停事件
      z_markerEl.addEventListener('mouseenter', z_handleMarkerMouseEnter);
      z_markerEl.addEventListener('mouseleave', z_handleMarkerMouseLeave);
      
      z_timeMarkers.appendChild(z_markerEl);
    });
    
    z_updateCurrentPeriod();
    z_updateProgress();
    window.updateCarouselByTimeIndex(currentTimeIndex);
  }

  // 处理标记悬停
  function z_handleMarkerMouseEnter(e) {
    clearTimeout(z_hoverTimer);
    if (z_currentPopup) z_currentPopup.classList.remove('show');
    
    const z_marker = e.currentTarget;
    const z_popup = z_marker.querySelector('.z_time-popup');
    z_popup.classList.add('show');
    z_currentPopup = z_popup;
    z_adjustPopupPosition(z_popup);
  }

  function z_handleMarkerMouseLeave(e) {
    const z_marker = e.currentTarget;
    const z_popup = z_marker.querySelector('.z_time-popup');
    
    z_hoverTimer = setTimeout(() => {
      z_popup.classList.remove('show');
      z_currentPopup = null;
    }, 200);
  }

  // 调整弹窗位置
  function z_adjustPopupPosition(z_popup) {
    const z_rect = z_popup.getBoundingClientRect();
    if (z_rect.right > window.innerWidth - 10) {
      z_popup.style.left = 'auto';
      z_popup.style.right = '0';
      z_popup.style.transform = 'translateX(0)';
    } else if (z_rect.left < 10) {
      z_popup.style.left = '0';
      z_popup.style.right = 'auto';
      z_popup.style.transform = 'translateX(0)';
    } else {
      z_popup.style.left = '50%';
      z_popup.style.right = 'auto';
      z_popup.style.transform = 'translateX(-50%)';
    }
  }

  // 切换时间轴标记（核心联动）
  function z_switchToMark(index) {
    index = Math.max(0, Math.min(index, z_totalMarks - 1));
    if (currentTimeIndex === index) return;
    
    currentTimeIndex = index;
    z_updateCurrentPeriod();
    z_updateProgress();
    
    // 联动轮播图：高亮 + 复位图片
    window.updateCarouselByTimeIndex(currentTimeIndex);
    window.resetCarouselItemImg(currentTimeIndex);
  }

  // 更新当前时期显示
  function z_updateCurrentPeriod() {
    const z_currentData = z_timeData[currentTimeIndex];
    z_currentPeriod.textContent = z_currentData.timeLabel;
    z_currentPeriod.classList.add('show');
    
    z_currentPeriod.style.transform = 'translateX(-50%) scale(1.1)';
    setTimeout(() => {
      z_currentPeriod.style.transform = 'translateX(-50%) scale(1)';
    }, 200);
  }

  // 更新进度条
  function z_updateProgress() {
    const z_progressPercent = (currentTimeIndex / (z_totalMarks - 1)) * 100;
    z_progressIndicator.style.width = `${z_progressPercent}%`;
    z_progressThumb.style.left = `${z_progressPercent}%`;
  }

  // 全局滚动切换时间轴
  function z_handleGlobalWheel(e) {
    if (e.target.closest('.carousel')) return;
    
    e.preventDefault();
    if (z_scrollCooldown) return;
    z_scrollCooldown = true;
    setTimeout(() => z_scrollCooldown = false, 150);
    
    const z_direction = e.deltaY > 0 ? 1 : -1;
    z_switchToMark(currentTimeIndex + z_direction);
  }

  // 绑定事件
  function z_bindEvents() {
    // 全局滚动
    document.addEventListener('wheel', z_handleGlobalWheel, { passive: false });
    
    // 点击进度条跳转
    z_progressBar.addEventListener('click', (e) => {
      const z_rect = z_progressBar.getBoundingClientRect();
      const z_clickX = e.clientX - z_rect.left;
      const z_clickPercent = z_clickX / z_rect.width;
      const z_targetIndex = Math.round(z_clickPercent * (z_totalMarks - 1));
      z_switchToMark(z_targetIndex);
    });

    // 拖拽滑块
    let z_isDragging = false;
    z_progressThumb.addEventListener('mousedown', (e) => {
      z_isDragging = true;
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (!z_isDragging) return;
      const z_rect = z_progressBar.getBoundingClientRect();
      const z_dragX = e.clientX - z_rect.left;
      const z_dragPercent = Math.min(Math.max(z_dragX / z_rect.width, 0), 1);
      const z_targetIndex = Math.round(z_dragPercent * (z_totalMarks - 1));
      z_switchToMark(z_targetIndex);
    });
    document.addEventListener('mouseup', () => z_isDragging = false);
    document.addEventListener('mouseleave', () => z_isDragging = false);
    
    // 弹窗事件
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.z_time-popup')) clearTimeout(z_hoverTimer);
    });
    document.addEventListener('mouseleave', (e) => {
      if (e.target.closest('.z_time-popup')) {
        const z_popup = e.target.closest('.z_time-popup');
        z_hoverTimer = setTimeout(() => {
          z_popup.classList.remove('show');
          z_currentPopup = null;
        }, 200);
      }
    });
    
    // 点击时间标记切换
    z_timeMarkers.addEventListener('click', (e) => {
      const marker = e.target.closest('.z_time-marker');
      if (marker) {
        const index = parseInt(marker.dataset.index);
        z_switchToMark(index);
      }
    });
  }

  z_initTimeline();
  z_bindEvents();
  
  // 隐藏提示
  setTimeout(() => {
    const z_hint = document.querySelector('.z_scroll-hint');
    z_hint.style.transition = 'opacity 1s ease';
    z_hint.style.opacity = '0';
    setTimeout(() => z_hint.style.display = 'none', 1000);
  }, 3000);
  
  setTimeout(() => {
    z_currentPeriod.style.transition = 'opacity 1s ease';
    z_currentPeriod.style.opacity = '0';
    setTimeout(() => z_currentPeriod.classList.remove('show'), 1000);
  }, 5000);
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
  initCarousel();
  initTimeline();
});