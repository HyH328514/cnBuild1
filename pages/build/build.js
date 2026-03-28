// 全局变量
let gameLevel = 3; // 默认难度（题目数量）
let score = 0; // 得分
let currentQuestionIndex = 0; // 当前题目索引
// 中国古建题库
const GJ_QUESTIONS = [
    {
        question: "以下哪座建筑是故宫的核心建筑？",
        options: ["太和殿", "岳阳楼", "黄鹤楼", "滕王阁"],
        answer: 0
    },
    {
        question: "苏州园林中以“假山”闻名的是哪一个？",
        options: ["拙政园", "狮子林", "留园", "网师园"],
        answer: 1
    },
    {
        question: "大雁塔位于以下哪个城市？",
        options: ["西安", "洛阳", "开封", "南京"],
        answer: 0
    },
    {
        question: "长城中被称为“天下第一关”的是？",
        options: ["居庸关", "山海关", "嘉峪关", "雁门关"],
        answer: 1
    },
    {
        question: "福建土楼主要分布在哪个地区？",
        options: ["闽南", "闽西", "闽北", "闽东"],
        answer: 1
    },
    {
        question: "天坛的主要功能是？",
        options: ["祭祀孔子", "祭祀天地", "皇帝居住", "科举考试"],
        answer: 1
    },
    {
        question: "平遥古城位于哪个省份？",
        options: ["山西省", "陕西省", "河南省", "河北省"],
        answer: 0
    },
    {
        question: "应县木塔的正式名称是？",
        options: ["释迦塔", "千寻塔", "嵩岳寺塔", "飞虹塔"],
        answer: 0
    },
    {
        question: "颐和园中昆明湖模仿的是哪个湖泊？",
        options: ["西湖", "太湖", "洞庭湖", "鄱阳湖"],
        answer: 0
    },
    {
        question: "悬空寺位于哪个山脉？",
        options: ["恒山", "华山", "黄山", "泰山"],
        answer: 0
    }
];
let selectedQuestions = []; // 随机选中的题目

// 初始化游戏
function initGame() {
    score = 0;
    currentQuestionIndex = 0;
    document.querySelector('.score-count').textContent = score;
    
    // 根据难度随机选择题目
    selectedQuestions = shuffleArray([...GJ_QUESTIONS]).slice(0, gameLevel);
    
    // 新增：更新进度条和题目计数
    updateProgress();
    updateQuestionCount();
    
    // 渲染当前题目
    renderCurrentQuestion();
}

// 洗牌算法（打乱数组）
function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

// 渲染当前题目
function renderCurrentQuestion() {
    const questionCard = document.querySelector('.question-card');
    const questionText = questionCard.querySelector('.question-text');
    const optionsContainer = questionCard.querySelector('.options');
    
    // 清空选项容器
    optionsContainer.innerHTML = '';
    
    // 如果题目已做完，显示通关弹窗
    if (currentQuestionIndex >= selectedQuestions.length) {
        // 新增：设置最终得分和等级
        setFinalScoreLevel();
        document.querySelector('.final-score').textContent = score;
        document.querySelector('.success-modal').style.display = 'flex';
        return;
    }
    
    // 获取当前题目
    const currentQ = selectedQuestions[currentQuestionIndex];
    questionText.textContent = currentQ.question;
    
    // 生成选项按钮
    currentQ.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = option;
        btn.dataset.index = index;
        
        // 绑定点击事件
        btn.addEventListener('click', () => checkAnswer(index, btn));
        optionsContainer.appendChild(btn);
    });
}

// 检查答案
function checkAnswer(selectedIndex, btn) {
    const currentQ = selectedQuestions[currentQuestionIndex];
    const allOptions = document.querySelectorAll('.option-btn');
    
    // 禁用所有选项
    allOptions.forEach(btn => btn.disabled = true);
    
    // 新增：答题音效（可自行替换为实际音效链接）
    if (selectedIndex === currentQ.answer) {
        playSound('success'); // 正确音效
        btn.classList.add('correct');
        score += 10; // 每题10分
        document.querySelector('.score-count').textContent = score;
    } else {
        playSound('error'); // 错误音效
        btn.classList.add('wrong');
        // 标记正确答案
        allOptions[currentQ.answer].classList.add('correct');
    }
    
    // 延迟进入下一题
    setTimeout(() => {
        currentQuestionIndex++;
        // 新增：更新进度和计数
        updateProgress();
        updateQuestionCount();
        renderCurrentQuestion();
    }, 1500);
}

// 新增：更新答题进度条
function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progress = (currentQuestionIndex / selectedQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// 新增：更新题目计数（如 1/3）
function updateQuestionCount() {
    const questionCount = document.querySelector('.question-count');
    questionCount.textContent = `${currentQuestionIndex + 1}/${selectedQuestions.length}`;
}

// 新增：播放答题反馈音效（模拟，可替换为实际音频）
function playSound(type) {
    // 实际项目中可替换为 Audio 对象播放音效
    if (type === 'success') {
        console.log('播放正确音效 🎵');
        // const audio = new Audio('success.mp3');
        // audio.play();
    } else {
        console.log('播放错误音效 🚨');
        // const audio = new Audio('error.mp3');
        // audio.play();
    }
}

// 新增：设置最终得分等级
function setFinalScoreLevel() {
    const scoreLevel = document.querySelector('.score-level');
    const totalScore = gameLevel * 10;
    const scoreRatio = score / totalScore;
    
    if (scoreRatio === 1) {
        scoreLevel.textContent = '🏆 古建大师！';
        scoreLevel.style.color = '#8b4513';
    } else if (scoreRatio >= 0.7) {
        scoreLevel.textContent = '🌟 古建达人！';
        scoreLevel.style.color = '#b98846';
    } else if (scoreRatio >= 0.4) {
        scoreLevel.textContent = '📚 继续努力！';
        scoreLevel.style.color = '#d4a76a';
    } else {
        scoreLevel.textContent = '💡 加油学习！';
        scoreLevel.style.color = '#e0b880';
    }
}

// 事件绑定
document.addEventListener('DOMContentLoaded', () => {
    // 难度选择
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameLevel = parseInt(btn.dataset.level);
            initGame();
        });
    });
    
    // 重新开始按钮
    document.querySelector('.restart-btn').addEventListener('click', initGame);
    
    // 关闭弹窗按钮
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.querySelector('.success-modal').style.display = 'none';
        initGame();
    });
    
    // 默认选中简单难度并初始化
    document.querySelector('.diff-btn[data-level="3"]').classList.add('active');
    initGame();
});