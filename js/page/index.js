// 全局共享变量
let currentTimeIndex = 0; // 当前选中的时间轴索引
let imgIndexMap = [1, 2, 3, 4, 5, 6, 7]; // 每个轮播项的当前图片索引(我改的)
// 时间轴标记数据
// 首页文本
const s_textData = [
  `const s_textData = [
  "兴隆洼遗址，位于内蒙古自治区赤峰市敖汉旗宝国吐乡兴隆洼村东南1.3千米丘陵西缘，是新石器时代早期（前10000—前7000）先民聚落遗址，占地面积达6万平方米 [1] [13]。1983年春至1994年秋，中国社会科学院考古研究所等单位对遗址进行了7次发掘，揭露面积4.8万平方米，清理半地穴式房址153座，聚落外围环绕椭圆形壕沟，房址呈东北—西南向整齐排列，中央两座大房址面积各达140平方米，被称为“华夏第一村” [13-15]。
遗址出土石器、陶器、骨器、蚌器及玉器等遗物，其中玉玦、玉斧等是中国已知年代最早的磨光真玉器，遗址内发现的人猪合葬墓和碳化粟黍标本，实证了世界旱作农业起源地 [1] [13-14] [17]。1996年被国务院公布为第四批全国重点文物保护单位 [3]，2013年启动保护规划编制工作 [5]，2019年规划建设国家考古遗址公园 [16]。2021年入选全国“百年百大考古发现” [11]。"
]`,
  `大地湾遗址，位于甘肃省天水市秦安县东北45千米处的五营乡邵店村东侧，坐落在葫芦河支流清水河南岸的二、三级阶地和相接的缓坡山地上，总面积270万平方米 [1]。
大地湾遗址于1958年被首次发现，自1978年8月起，考古人员便开始在河边的阶地部分展开试掘工作。历经17年的发掘，直至1995年，大地湾遗址共发掘了14752平方米的面积。期间，考古人员陆续清理出240座新石器时代的房屋遗迹、98个灶址、2处柱洞、325个灰坑和窖穴、65座墓葬、35座窑址以及12段沟渠。同时，还出土了大量的文物，包括4147件陶器、1931件石器、2227件骨角牙蚌器以及超过17000件的兽骨，此外还有数十万的残陶片。根据地层叠压关系以及出土物的特征，这些文化遗存被划分为五个时期，它们主要涵盖了前仰韶文化、仰韶文化的早、中、晚期以及常山下层文化。 [13]2014年8月至2015年1月期间，中国科学院古脊椎动物与古人类研究所联合兰州大学、甘肃省文物考古研究所及中国人民大学等多个单位，共同组建工作队，对大地湾遗址进行了正式的考古发掘。 [11]大地湾遗址为位于中国甘肃东部的史前考古提供了重要的断代参考，其历史跨度从距今7800年至4800年，不仅构建了相对完备的史前文化发展脉络，还推动了中国西北地区新石器考古的重大突破。 [12]
1988年1月13日，大地湾遗址被中华人民共和国国务院公布为第三批全国重点文物保护单位 [3]。1994年12月，大地湾遗址被中共甘肃省委确定为爱国主义教育基地 [1]。 [7]2025年12月，秦安大地湾遗址入选甘肃文旅新地标。
`,
`河姆渡遗址（Hemudu Site），位于浙江省宁波市余姚市河姆渡镇河姆渡村的东北 [1]，距宁波市区约20千米，是中国南方早期新石器时代（约7000—5000年前）遗址 [2]。
河姆渡遗址总面积达4万平方米，上下叠压着四个文化层。河姆渡遗址出土陶片达几十万片，还有陶器、骨器、石器以及植物遗存、动物遗骸、木构建筑遗迹等大量珍贵文物 [1]。河姆渡遗址以其丰富而鲜明的文化内涵，确立了其在中华民族远古发展史、中国考古学史上的重要地位，被学术界命名为“河姆渡文化”。遗址的发现，为中国史学界和考古界提供了依据，证明长江流域是中华文明的重要发源地之一 [3]。
1982年2月23日 ，河姆渡遗址被中华人民共和国国务院公布为第二批全国重点文物保护单位 [4]。2018年6月，河姆渡遗址被浙江省文物局公布为第二批省级考古遗址公园 [5] [11]。2020年5月，河姆渡遗址入选首批“浙江文化印记”名单。 [6]2021年10月18日，河姆渡遗址入选全国“百年百大考古发现”。 [9]
`,
`
城头山古文化遗址，位于湖南省常德市澧县车溪乡南岳村，是中国南方史前大溪文化至石家河文化时期的遗址，也是迄今中国唯一发现时代最早、文物最丰富、保护最完整的古城遗址，被誉为“中国最早的城市”。 [2] [29]
1979年湖南省文物普查时，澧县考古工作者首次发现城头山遗址。1991年至2011年，由湖南省考古所主持，澧县进行了13次考古发掘，发掘面积近9000平方米，先后出土有古城遗址、氏族墓葬、大型祭坛、灌溉设施完备的水稻田等大批珍贵文物。城头山古文化遗址代表了长江流域新石器时代古文明的发展高度，对研究人类文明的起源、早期城池的建立以及阶级、国家的产生具有重要意义。
1996年11月20日，城头山遗址被中华人民共和国国务院公布为第四批全国重点文物保护单位； [1]2001年，被评为“中国20世纪100项考古大发现”之一，镌刻到“中华世纪坛”的青铜甬道上。
`,
`半坡遗址（Banpo Site），位于陕西省西安市浐河东岸的半坡村，是黄河流域一个典型的母系氏族公社村落遗址，属仰韶文化的一种早期类型，距今约6000年。 [6] [7]
半坡遗址主要是大型聚落，外围有宽约6~8米的大围壕，内为居住区，遗址总面积约5万平方米，分为居住区、制陶区和墓葬区。1953年春，西安市在建设纺织城时发现，发掘面积1万平方米，获得了丰富的文化遗存。计有房屋遗址45座，圈栏2座，窖穴200座，制陶窑址6座，墓葬250座，生产工具及生活用具约万件。半坡遗址首次揭露了中国境内以环壕聚落为特征的新石器时代闭合式聚落形态及其布局特征，同时，展示了仰韶文化不同阶段的文化面貌和社会结构特征，从而为仰韶文化的研究树立了半坡类型、半坡晚期类型两个阶段的标杆，为构建中国新石器时代文化编年标尺提供了标志性参照系。此外，遗址内出土的遗迹遗物，为研究新石器时代的环境、生业形态、建筑材料与建筑技术、埋葬制度与社会结构、彩陶雕塑与早期宗教乃至社会治理方式等重大问题，提供了前所未有的实物资料和开创性的研究成果。 [5-6] [7]
1961年3月4日，半坡遗址被中华人民共和国国务院公布为第一批全国重点文物保护单位。 [1]2021年10月，半坡遗址被国家文物局评为“百年百大考古发现”。
`
]
const z_timeData = [
  { 
    timeLabel: "原始社会",
    buildings: [
      { name: "民居", icon: "🏠", description: "原始洞穴、茅草屋" , url:''},
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
let carouselNums = 9; // 每个时期的图片总数
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
      const finalImgIndex = imgIndex < 1 ? carouselNums : (imgIndex > carouselNums ? 1 : imgIndex);
      const imgSrc = `../../assets/img/${folderName}/img${finalImgIndex}.webp`;
      item.querySelector('img').src = imgSrc;
    });
  }
  initCarouselImgs();

  // 全局更新所有轮播项图片（核心：整体轮播）
  function updateAllCarouselImgs() {
    const folderName = timeNodeFolders[currentTimeIndex]; // 基于当前时间轴选文件夹
    carouselItems.forEach((item, index) => {
      // 计算每个轮播项的图片索引（偏移+自身索引，循环1-carouselNums）
      let imgIndex = index + 1 + carouselOffset;
      imgIndex = imgIndex < 1 ? carouselNums : (imgIndex > carouselNums ? 1 : imgIndex);
      item.querySelector('img').src = `../../assets/img/${folderName}/img${imgIndex}.webp`;
    });
  }

  // 监听轮播图区域滚轮事件：控制7张图整体轮播
  carouselContainer.addEventListener('wheel', function(e) {
    e.preventDefault();
    const isScrollDown = e.deltaY > 0;
    // 滚轮向下：偏移+1（整体向后轮播）；向上：偏移-1（整体向前轮播）
    carouselOffset = isScrollDown ? (carouselOffset + 1) : (carouselOffset - 1);
    // 限制偏移范围
    if (carouselOffset > (carouselNums - itemCount) ) carouselOffset = (carouselNums - itemCount);
    if (carouselOffset < 0 ) carouselOffset = 0;
    // 更新所有7个轮播项的图片

    console.log(`滚轮事件：${isScrollDown ? '向下' : '向上'}，偏移索引: ${carouselOffset}`);

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
  const z_timeline = document.querySelector('.z_timeline');
  const z_progressBar = document.getElementById('z_progressBar');
  const z_progressIndicator = document.getElementById('z_progressIndicator');
  const z_progressThumb = document.getElementById('z_progressThumb');
  const z_timeMarkers = document.getElementById('z_timeMarkers');
  const z_currentPeriod = document.getElementById('z_currentPeriod');
  //时间轴节点个数
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
          // 先判断 url 是否存在，不存在则提示
          if (building.url) {
            window.open(building.url, "_blank");
          } else {
            alert(`暂无${item.timeLabel}${building.name}的相关页面`);
          }
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
    z_updateProgress();
    
    // 联动轮播图：高亮 + 复位图片
    window.updateCarouselByTimeIndex(currentTimeIndex);
    window.resetCarouselItemImg(currentTimeIndex);
  }

 

  // 更新进度条
  function z_updateProgress() {
    const z_progressPercent = (currentTimeIndex * 0.1428 + 0.0714) * 100;
    z_progressIndicator.style.width = `${z_progressPercent}%`;
    z_progressThumb.style.left = `${z_progressPercent}%`;
  }

  // 滚动切换时间轴函数
  function z_handleGlobalWheel(e) {
    // 忽略轮播区域滚动
    if (e.target.closest('.carousel')) return;
    // 阻止默认滚动
    e.preventDefault();
    // 节流处理,防止滚动过快
    if (z_scrollCooldown) return;
    z_scrollCooldown = true;
    setTimeout(() => z_scrollCooldown = false, 150);
    
    const z_direction = e.deltaY > 0 ? 1 : -1;
    z_switchToMark(currentTimeIndex + z_direction);
  }

  // 绑定事件
  function z_bindEvents() {
    // 时间轴区域滚动
    z_timeline.addEventListener('wheel', z_handleGlobalWheel, { passive: false });
    
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
      // 找到最近的时间标记元素
      const marker = e.target.closest('.z_time-marker');
      if (marker) {
        // 获取并校验索引值，避免非数字导致的NaN问题
        const index = parseInt(marker.dataset.index);
        if (!isNaN(index)) {
          // 执行跳转逻辑（核心函数）
          z_switchToMark(index);
      }}
      // 可选：阻止事件冒泡（避免触发父元素的点击事件）
      e.stopPropagation();
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