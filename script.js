const tools = [
    // PRINCIPAL
    { name: "Select (เลือก)", cat: "principal", icon: "sketchup22.jpg", win: "Space bar", mac: "Space", desc: "เลือกวัตถุ: 1 คลิก=ผิว, 2 คลิก=ผิว+ขอบ, 3 คลิก=ทั้งหมดที่เชื่อม" },
    { name: "Make Component", cat: "principal", icon: "sketchup.jpg", win: "G", mac: "G", desc: "รวมกลุ่มแบบอัจฉริยะ แก้ไขตัวหนึ่ง ตัวอื่นเปลี่ยนตามทั้งหมด" },
    { name: "Paint Bucket", cat: "principal", icon: "sketchup3.jpg", win: "B", mac: "B", desc: "เทสี/วัสดุ กด Alt ค้างเพื่อใช้เครื่องมือดูดสี (Sample Paint)" },
    { name: "Eraser", cat: "principal", icon: "sketchup2.jpg", win: "E", mac: "E", desc: "ลบเส้น: กด Ctrl+ลบ เพื่อซ่อนเส้น (Soften) กด Shift+ลบ เพื่อ Hide" },

    // DRAWING
    { name: "Line (วาดเส้น)", cat: "drawing", icon: "sketchup1.jpg", win: "L", mac: "L", desc: "วาดเส้นตรง พิมพ์ตัวเลขตามด้วย Enter เพื่อระบุความยาวที่แน่นอน" },
    { name: "Rectangle (สี่เหลี่ยม)", cat: "drawing", icon: "sketchup5.jpg", win: "R", mac: "R", desc: "วาดสี่เหลี่ยม พิมพ์ค่ากว้าง,ยาว เช่น 50,50 เพื่อกำหนดขนาด" },
    { name: "Circle (วงกลม)", cat: "drawing", icon: "sketchup14.jpg", win: "C", mac: "C", desc: "วาดวงกลม พิมพ์ '48s' ก่อนวาดเพื่อให้ขอบกลมเนียนขึ้น" },
    { name: "Arc (เส้นโค้ง)", cat: "drawing", icon: "sketchup10.jpg", win: "A", mac: "A", desc: "วาดเส้นโค้งแบบ 2 จุด (2-Point Arc) นิยมใช้ทำมุมมน" },

    // MODIFICATION
    { name: "Push/Pull (ดัน/ดึง)", cat: "modification", icon: "sketchup4.jpg", win: "P", mac: "P", desc: "ยืดหน้าตัดให้มีปริมาตร ดับเบิลคลิกเพื่อใช้ระยะเดิมซ้ำ" },
    { name: "Move (ย้าย)", cat: "modification", icon: "sketchup20.jpg", win: "M", mac: "M", desc: "ย้ายวัตถุ กด Ctrl เพื่อ Copy หรือใช้ร่วมกับตัวเลขเพื่อ Array" },
    { name: "Rotate (หมุน)", cat: "modification", icon: "sketchup21.jpg", win: "Q", mac: "Q", desc: "หมุนวัตถุตามแกน กด Ctrl เพื่อหมุนพร้อมก๊อปปี้" },
    { name: "Scale (สเกล)", cat: "modification", icon: "sketchup16.jpg", win: "S", mac: "S", desc: "ปรับขนาดวัตถุ กด Ctrl ค้างเพื่อปรับจากจุดศูนย์กลาง" },
    { name: "Follow Me", cat: "modification", icon: "sketchup15.jpg", win: "N/A", mac: "N/A", desc: "ดึงหน้าตัดไปตามเส้นทางที่กำหนด (เช่น บัวพื้น, ท่อน้ำ)" },
    { name: "Offset", cat: "modification", icon: "sketchup12.jpg", win: "F", mac: "F", desc: "สร้างเส้นขนานจากเส้นขอบเดิม เหมาะสำหรับทำผนังห้อง" },
    { name: "Delete", cat: "modification", icon: "sketchup23.jpg", win: "Del", mac: "Del", desc: "ลบวัตถุที่เลือก" },

    // CAMERA
    { name: "Orbit (หมุนภาพ)", cat: "camera", icon: "sketchup18.jpg", win: "Scroll", mac: "Scroll", desc: "คลิกปุ่มลูกกลิ้งเมาส์ค้างไว้เพื่อหมุนมุมมองรอบวัตถุ" },
    { name: "Pan (เลื่อนภาพ)", cat: "camera", icon: "sketchup19.jpg", win: "H", mac: "H", desc: "กดปุ่มลูกกลิ้งเมาส์ + Shift ค้างไว้เพื่อเลื่อนหน้าจอขนานไปกับงาน" },
    { name: "Zoom Extents", cat: "camera", icon: "sketchup24.jpg", win: "Shift+Z", mac: "Shift+Z", desc: "ดึงภาพทั้งหมดกลับมาอยู่ตรงกลางหน้าจอทันทีเมื่อหลงทาง" }
];

function renderTools(data) {
    const container = document.getElementById('tools-container');
    container.innerHTML = data.map((tool, index) => `
        <div class="tool-card animate-in" style="animation-delay: ${index * 0.05}s">
            
            <div class="flex justify-between items-start w-full mb-4">
                <div class="icon-wrapper">
                    <img src="${tool.icon}" alt="${tool.name}" 
                         onerror="this.src='https://via.placeholder.com/40?text=SU';">
                </div>
                <div class="shortcut-badge">
                    <kbd>${tool.win}</kbd>
                </div>
            </div>

            <div class="w-full">
                <span class="text-[9px] uppercase tracking-widest text-red-500 font-bold block mb-1 opacity-80">
                    ${tool.cat}
                </span>
                <h3 class="text-base font-bold text-gray-800 mb-1 leading-tight">
                    ${tool.name}
                </h3>
                <p class="text-gray-500 text-xs leading-relaxed line-clamp-3">
                    ${tool.desc}
                </p>
            </div>

        </div>
    `).join('');
}

// ระบบ Filter (คงเดิม)
function filterTools(cat) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-cat') === cat) btn.classList.add('active');
    });
    const filtered = cat === 'all' ? tools : tools.filter(t => t.cat === cat);
    renderTools(filtered);
}

// ระบบ Search (คงเดิม)
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const searched = tools.filter(t =>
        t.name.toLowerCase().includes(term) ||
        t.desc.toLowerCase().includes(term) ||
        t.win.toLowerCase().includes(term)
    );
    renderTools(searched);
});

window.onload = () => renderTools(tools);

// ฟังก์ชันแสดงการแจ้งเตือน (Toast)
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl z-[100] animate-bounce font-bold';
    toast.innerHTML = `<i class="fas fa-check-circle text-green-400 mr-2"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// คลิกเพื่อคัดลอกคีย์ลัด
document.getElementById('tools-container').addEventListener('click', (e) => {
    const kbd = e.target.closest('kbd');
    if (kbd) {
        navigator.clipboard.writeText(kbd.innerText);
        showToast(`คัดลอกคีย์ลัด ${kbd.innerText} แล้ว!`);
    }
});

// เพิ่มเข้าไปในฟังก์ชัน renderTools หรือต่อท้ายไฟล์
document.getElementById('tools-container').addEventListener('click', (e) => {
    const card = e.target.closest('.tool-card');
    if (card) {
        const key = card.querySelector('kbd').innerText;
        navigator.clipboard.writeText(key);

        // แสดง Toast แจ้งเตือนเล็กๆ
        showToast(`คัดลอกคีย์ลัด "${key}" แล้ว!`);
    }
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl animate-fade-in z-[100] font-bold text-sm border-b-4 border-red-500';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}