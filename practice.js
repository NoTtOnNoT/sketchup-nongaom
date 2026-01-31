/**
 * 🌐 SKETCHUP ONLINE DATABASE - COMPLETE VERSION
 */

const firebaseConfig = {
    apiKey: "AIzaSyBBMm6f2qM7RJpeQzPy9NUldC9EBjWxeLM",
    authDomain: "nongaom-5536c.firebaseapp.com",
    databaseURL: "https://nongaom-5536c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nongaom-5536c",
    storageBucket: "nongaom-5536c.firebasestorage.app",
    messagingSenderId: "505771734834",
    appId: "1:505771734834:web:7399f2eac20f1427eac92b"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// --- ข้อมูลเครื่องมือและโจทย์ ---
const toolData = [
    { name: "Select (เลือก)", key: "Space", icon: "sketchup22.jpg", hint: "1 คลิก=ผิว, 2 คลิก=ผิว+ขอบ, 3 คลิก=ทั้งหมด" },
    { name: "Make Component", key: "G", icon: "sketchup.jpg", hint: "รวมกลุ่มอัจฉริยะ แก้ตัวหนึ่งเปลี่ยนทั้งหมด" },
    { name: "Paint Bucket", key: "B", icon: "sketchup3.jpg", hint: "เทสี/วัสดุ กด Alt ค้างเพื่อดูดสี" },
    { name: "Eraser (ยางลบ)", key: "E", icon: "sketchup2.jpg", hint: "ลบเส้น กด Ctrl+ลบ เพื่อซ่อนเส้น (Soften)" },
    { name: "Line (วาดเส้น)", key: "L", icon: "sketchup1.jpg", hint: "วาดเส้นตรง ระบุความยาวด้วยตัวเลขได้" },
    { name: "Rectangle (สี่เหลี่ยม)", key: "R", icon: "sketchup5.jpg", hint: "วาดสี่เหลี่ยม พิมพ์ค่า กว้าง,ยาว" },
    { name: "Circle (วงกลม)", key: "C", icon: "sketchup14.jpg", hint: "วาดวงกลม พิมพ์ 48s เพื่อความเนียน" },
    { name: "Arc (เส้นโค้ง)", key: "A", icon: "sketchup10.jpg", hint: "วาดเส้นโค้ง นิยมใช้ทำมุมมน" },
    { name: "Push/Pull (ดัน/ดึง)", key: "P", icon: "sketchup4.jpg", hint: "ยืดผิวให้มีปริมาตร ดับเบิลคลิกเพื่อใช้ระยะเดิม" },
    { name: "Move (ย้าย)", key: "M", icon: "sketchup20.jpg", hint: "ย้ายวัตถุ กด Ctrl เพื่อ Copy" },
    { name: "Rotate (หมุน)", key: "Q", icon: "sketchup21.jpg", hint: "หมุนวัตถุ กด Ctrl เพื่อหมุนพร้อมก๊อปปี้" },
    { name: "Scale (สเกล)", key: "S", icon: "sketchup16.jpg", hint: "ปรับขนาด กด Ctrl ค้างเพื่อปรับจากจุดศูนย์กลาง" },
    { name: "Offset", key: "F", icon: "sketchup12.jpg", hint: "สร้างเส้นขนาน เหมาะสำหรับทำผนัง" },
    { name: "Tape Measure (ตลับเมตร)", key: "T", icon: "sketchup11.jpg", hint: "วัดระยะและสร้างเส้น Guide" },
    { name: "Pan (เลื่อนภาพ)", key: "H", icon: "sketchup19.jpg", hint: "เลื่อนหน้าจอขนานไปกับงาน" },
    { name: "Orbit (หมุนภาพ)", key: "O", icon: "sketchup18.jpg", hint: "หมุนมุมมองรอบวัตถุ (หรือกดปุ่มกลางเมาส์)" }
];

const modelItems = [
    { name: "ม้านั่ง", icon: "ม้านั่ง.jpg", hint: "สร้างด้วย Push/Pull, Move, Rotate" },
    { name: "โต๊ะเรียน", icon: "โต๊ะเรียน.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "เก้าอี้เรียน", icon: "เก้าอี้เรียน.jpg", hint: "สร้างด้วย Push/Pull, Move, Rotate" },
    { name: "โซฟา", icon: "โซฟา.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "โต๊ะกลม", icon: "โต๊ะกลม.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "ตู้หนังสือ", icon: "ตู้หนังสือ.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "เตียง", icon: "เตียง.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "ตู้เสื้อผ้า", icon: "ตู้เสื้อผ้า.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "ชั้นวางของ", icon: "ชั้นวางของ.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "โต๊ะทำงาน", icon: "โต๊ะทำงาน.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "แก้ว", icon: "แก้ว.jpg", hint: "สร้างด้วย Push/Pull, Move, Rotate" },
    { name: "โคมไฟ", icon: "โคมไฟ.jpg", hint: "สร้างด้วย Push/Pull, Move, Rotate" },
    { name: "กระถางต้นไม้", icon: "กระถางต้นไม้.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "ตู้เย็น", icon: "ตู้เย็น.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "ถังขยะ", icon: "ถังขยะ.jpg", hint: "สร้างด้วย Push/Pull, Move, Scale" },
    { name: "ร่ม", icon: "ร่ม.png", hint: "สร้างด้วย Push/Pull, Move, Scale" }
];

let remainingQuestions = [];
let currentPracticeMode = '';
let currentTarget = null;
let score = { correct: 0, total: 0 };
let isSaving = false;

// --- ฟังก์ชันหลัก ---

// ฟังก์ชันเริ่มการฝึก (อัปเดตให้ตรงกับ ID ล่าสุด)
function initPractice(mode) {
    currentPracticeMode = mode;
    score = { correct: 0, total: 0 };
    isSaving = false;

    const modeSelector = document.getElementById('mode-selector');
    const quizArea = document.getElementById('quiz-area');
    const inputContainer = document.getElementById('input-container');
    const randomContainer = document.getElementById('random-control-container');
    const infoContainer = document.getElementById('target-info-container');
    const sidePanel = document.getElementById('side-panel');
    const hintElement = document.getElementById('target-hint'); // ดึง Hint มาเตรียมไว้

    modeSelector.classList.add('hidden');
    quizArea.classList.remove('hidden');

    if (mode === 'random-only') {
        // --- โหมดสุ่มรูปฝึกวาด ---
        if (inputContainer) inputContainer.classList.add('hidden');
        if (randomContainer) randomContainer.classList.remove('hidden');
        if (infoContainer) infoContainer.classList.remove('hidden'); 
        if (sidePanel) sidePanel.classList.add('hidden');
        
        // สั่งซ่อน Hint ทันทีเมื่อเข้าโหมดสุ่มรูป
        if (hintElement) hintElement.classList.add('hidden');
        
        nextpic(); 
    } else {
        // --- โหมดฝึกคีย์ลัด ---
        if (inputContainer) inputContainer.classList.remove('hidden');
        if (randomContainer) randomContainer.classList.add('hidden');
        if (infoContainer) infoContainer.classList.remove('hidden');
        if (sidePanel) sidePanel.classList.remove('hidden');
        
        // สั่งแสดง Hint เมื่อกลับมาโหมดปกติ
        if (hintElement) hintElement.classList.remove('hidden');

        remainingQuestions = mode === 'shortcuts' ? [...toolData] : [...modelItems];
        nextTask();
    }

    document.getElementById('log-list').innerHTML = '';
    updateSidePanelHeader(mode);
}

// 1. ประกาศตัวแปรเก็บรูปก่อนหน้าไว้ (วางไว้นอกฟังก์ชัน)
let lastRandomItem = null;

function nextpic() {
    if (!modelItems || modelItems.length === 0) return;

    let randomIndex;
    let selected;

    do {
        randomIndex = Math.floor(Math.random() * modelItems.length);
        selected = modelItems[randomIndex];
    } while (selected === lastRandomItem && modelItems.length > 1);

    lastRandomItem = selected;

    const nameElement = document.getElementById('target-name');
    const hintElement = document.getElementById('target-hint'); // ดึงมาเพื่อล้างค่า
    const imgElement = document.getElementById('question-img');

    if (nameElement) nameElement.innerText = selected.name;
    
    // ล้างข้อความใน Hint ออกให้ว่างเปล่าในโหมดสุ่มรูป
    if (hintElement && currentPracticeMode === 'random-only') {
        hintElement.innerText = "";
    }

    imgElement.style.opacity = '0';
    setTimeout(() => {
        imgElement.src = selected.icon;
        imgElement.style.opacity = '1';
    }, 200);
}

// สำหรับโหมด 1 และ 2: สุ่มงานแบบเก็บคะแนน/ส่งงาน
function nextTask() {
    if (remainingQuestions.length === 0) {
        finishSession();
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentTarget = remainingQuestions[randomIndex];
    remainingQuestions.splice(randomIndex, 1);

    const questionImg = document.getElementById('question-img');
    questionImg.src = currentTarget.icon;

    // เพิ่มบรรทัดนี้เพื่อเช็คใน Console (กด F12 ใน Chrome เพื่อดู)
    console.log("กำลังเรียกรูปจาก Path:", questionImg.src);

    questionImg.onerror = function () {
        console.error("❌ โหลดรูปไม่สำเร็จ! ตรวจสอบ Path นี้:", this.src);
        this.src = 'https://via.placeholder.com/300?text=Image+Not+Found'; // แสดงรูปสำรองถ้าหาไม่เจอ
    };
    questionImg.classList.add('cursor-zoom-in');
    questionImg.onclick = openImageModal;

    if (currentPracticeMode === 'shortcuts') {
        document.getElementById('target-name').textContent = currentTarget.name;
        document.getElementById('target-hint').textContent = currentTarget.hint;
        const inputField = document.getElementById('shortcut-input');
        inputField.value = "";
        inputField.focus();
    }
}

// --- ฟังก์ชันเสริมและระบบบันทึก (คงเดิมตาม Logic ของน้องอ้อม) ---

function finishSession() {
    if (isSaving || currentPracticeMode === 'random-only') {
        backToMenu();
        return;
    }
    isSaving = true;

    const logContainer = document.getElementById('log-list');
    const currentLogs = logContainer ? Array.from(logContainer.children).map(item => item.innerHTML) : [];

    if (currentLogs.length === 0) {
        isSaving = false;
        backToMenu();
        return;
    }

    const sessionRecord = {
        date: new Date().toLocaleDateString('th-TH') + " " + new Date().toLocaleTimeString('th-TH'),
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        mode: currentPracticeMode === 'shortcuts' ? 'คีย์ลัด' : 'สร้างโมเดล',
        score: `${score.correct}/${score.total}`,
        results: currentLogs
    };

    database.ref('practice_history').push(sessionRecord)
        .then(() => {
            alert(`✅ บันทึกสำเร็จ!\nคะแนนของคุณคือ ${score.correct}/${score.total}`);
            isSaving = false;
            backToMenu();
        })
        .catch((err) => {
            isSaving = false;
            alert("เกิดข้อผิดพลาดในการบันทึก");
        });
}

function addLog(name, status, info, imgData = null) {
    const item = document.createElement('div');
    item.className = `p-4 rounded-2xl flex items-center justify-between border-l-4 mb-2 shadow-sm animate-in fade-in slide-in-from-left duration-300 ${status ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`;

    let content = `
        <div class="flex flex-col text-left">
            <span class="font-bold text-slate-800 text-sm">${name}</span>
            <span class="text-[10px] ${status ? 'text-green-600' : 'text-red-600'} font-bold uppercase">${info}</span>
        </div>
    `;

    if (imgData) {
        content += `<img src="${imgData}" class="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm cursor-zoom-in" onclick="openZoomImage('${imgData}')">`;
    } else {
        content += `<i class="fas ${status ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} text-xl"></i>`;
    }

    item.innerHTML = content;
    document.getElementById('log-list').prepend(item);
}

function updateSidePanelHeader(mode) {
    const logTitle = document.getElementById('log-title');
    const logIcon = document.getElementById('log-icon');
    if (mode === 'shortcuts') {
        logTitle.textContent = "สรุปคีย์ลัดรอบนี้";
        logIcon.className = "fas fa-keyboard mr-2 text-blue-500";
    } else {
        logTitle.textContent = "คลังภาพผลงานรอบนี้";
        logIcon.className = "fas fa-images mr-2 text-purple-500";
    }
}

function backToMenu() {
    document.getElementById('mode-selector').classList.remove('hidden');
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('side-panel').classList.add('hidden');
    remainingQuestions = [];
}

function openImageModal() {
    const src = document.getElementById('question-img').src;
    if (src) {
        document.getElementById('zoom-img').src = src;
        document.getElementById('image-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    document.getElementById('image-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Event Listeners
document.getElementById('shortcut-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const val = this.value.trim().toUpperCase();
        const correct = currentTarget.key.toUpperCase();
        const isCorrect = (val === correct) || (correct === "SPACE" && val === "");
        score.total++;
        if (isCorrect) score.correct++;
        addLog(currentTarget.name, isCorrect, isCorrect ? "ถูกต้อง" : `ผิด (เฉลย: ${currentTarget.key})`);
        nextTask();
    }
});

/**
 * 📜 ฟังก์ชันแสดงประวัติการฝึกจาก Firebase
 */
function showGlobalHistory() {
    const modal = document.getElementById('history-modal');
    const container = document.getElementById('history-content');

    // ตรวจสอบว่ามี Element ในหน้า HTML ไหม
    if (!modal || !container) return;

    // 1. แสดง Modal และแจ้งว่ากำลังโหลด
    modal.classList.remove('hidden');
    container.innerHTML = `
        <div class="text-center py-20 text-slate-400">
            <i class="fas fa-spinner fa-spin text-3xl mb-3"></i>
            <p>กำลังดึงข้อมูลจากฐานข้อมูล...</p>
        </div>
    `;

    // 2. ดึงข้อมูลจาก Path 'practice_history' โดยเรียงจากล่าสุด
    database.ref('practice_history')
        .orderByChild('timestamp')
        .limitToLast(30)
        .once('value', (snapshot) => {
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = `<p class="text-center py-10 text-slate-500">ยังไม่มีประวัติการฝึกในขณะนี้</p>`;
                return;
            }

            let historyHTML = "";
            // กลับด้านข้อมูลเพื่อให้รายการใหม่ล่าสุดอยู่บนสุด
            const sessions = Object.entries(data).reverse();

            sessions.forEach(([key, session]) => {
                historyHTML += `
                    <details class="mb-3 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group">
                        <summary class="p-5 cursor-pointer flex justify-between items-center hover:bg-slate-50 transition-all list-none">
                            <div class="flex flex-col text-left">
                                <span class="font-bold text-slate-700 text-lg">${session.date}</span>
                                <span class="text-xs text-slate-400">โหมด: ${session.mode}</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <span class="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-black">
                                    ${session.score}
                                </span>
                                <i class="fas fa-chevron-down text-slate-300 group-open:rotate-180 transition-transform"></i>
                            </div>
                        </summary>
                        <div class="p-5 bg-slate-50 border-t space-y-2">
                            ${session.results.join('')} 
                        </div>
                    </details>
                `;
            });
            container.innerHTML = historyHTML;
        });
}

/**
 * ❌ ฟังก์ชันปิดหน้าต่างประวัติ
 */
function closeHistory() {
    const modal = document.getElementById('history-modal');
    if (modal) modal.classList.add('hidden');
}

// คลิกพื้นที่ว่างรอบๆ Modal เพื่อปิด
window.onclick = function (event) {
    const modal = document.getElementById('history-modal');
    if (event.target == modal) {
        closeHistory();
    }
}