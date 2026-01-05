// Quiz Questions Data
const questions = [
    { q: "Rahul ka birthday kab hota hai? 🎂", a: ["10 February", "15 August", "01 January"], correct: 0 },
    { q: "KYA AAP CHAHTE HO RAHUL KO KOI OR MIL JAYE? 🏠", a: ["HAAN", "NHI", "HAAN CHALA"], correct: 1 },
    { q: "Rahul ki age kitni hai? 👦", a: ["18", "20", "19"], correct: 0 },
    { q: "Humari fav cheez kya hai? ✨", a: ["Ek dusre ka saath", "Ladhna", "Sirf Sona"], correct: 0 },
    { q: "KYA RAHUL KO MISS KROGE? 👑", a: ["NAA", "BHUL JAUNGI", "HAAN"], correct: 1 },
    { q: "ME APSE KITNA PYAR KRTA HU? ❤️", a: ["Thoda sa", "Nahi", "Baut Jyadaaaa"], correct: 2 },
    { q: "AAP RAHUL KE SATH KHUSH NHI HO? 📱", a: ["nahi", "BHUT KHUSH", "THODA BHUT"], correct: 1 },
    { q: "Rahul ko kya pasand hai? 🧸", a: ["Sakshi ki smile", "Gaming", "Bas Khana"], correct: 0 },
    { q: "Sakshi Rahul ke liye kya hai? 👸", a: ["Sirf Dost", "Sab Kuch (My Queen)", "Pata nahi"], correct: 1 },
    { q: "RAHUL KO APSE ACCHHI LDKI MIL SACTI HAI? 💖", a: ["HAAN", "BILKULL", "KABHI NAHI"], correct: 2 }
];

let currentQ = 0;
let angle = 0;

// Unlock Function
function unlock() {
    document.getElementById('bg-music').play().catch(() => console.log("Music needs interaction"));
    gsap.to("#intro-overlay", { 
        y: "-100%", 
        opacity: 0, 
        duration: 1.5, 
        ease: "expo.inOut", 
        onComplete: () => document.getElementById('intro-overlay').style.display = 'none' 
    });
}

function toggleTab() { document.getElementById('msg-tab').classList.toggle('open'); }

// Perfect 3D Click Rotation Fix
document.getElementById('carousel').onclick = () => {
    angle -= 72; // Since 5 cards: 360 / 5 = 72
    document.getElementById('carousel').style.transform = `rotateY(${angle}deg)`;
};

// Quiz Logic
function openGame() {
    gsap.to("#quiz-start-screen", { opacity: 0, duration: 0.5, onComplete: () => {
        document.getElementById('quiz-start-screen').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        gsap.to("#quiz-container", { opacity: 1, scale: 1, duration: 0.8 });
        loadQuestion();
    }});
}

function loadQuestion() {
    if(currentQ < questions.length) {
        const data = questions[currentQ];
        document.getElementById('q-text').innerText = data.q;
        document.getElementById('q-count').innerText = `SAVAL ${currentQ + 1} / 10`;
        const grid = document.getElementById('options-grid');
        grid.innerHTML = '';
        data.a.forEach((opt, idx) => {
            const b = document.createElement('button');
            b.className = 'p-4 bg-white/70 hover:bg-pink-100 rounded-2xl border-2 border-transparent hover:border-pink-400 transition-all font-bold text-pink-700';
            b.innerText = opt;
            b.onclick = () => {
                if(idx === data.correct) {
                    currentQ++; makeMagic(); loadQuestion();
                } else {
                    gsap.to("#sad-popup", { scale: 1, duration: 0.3 });
                }
            };
            grid.appendChild(b);
        });
    } else {
        document.getElementById('question-box').classList.add('hidden');
        document.getElementById('final-win').classList.remove('hidden');
    }
}

function hideSad() { gsap.to("#sad-popup", { scale: 0, duration: 0.2 }); }

function calcLove() {
    const sName = document.getElementById('name2').value.trim().toLowerCase();
    const resContainer = document.getElementById('love-res-container');
    const resText = document.getElementById('love-res');
    const resMsg = document.getElementById('love-msg');
    const resBar = document.getElementById('love-bar');

    if (sName === "") {
        alert("Pehle apna naam toh likho meri jaan! ❤️");
        return;
    }

    // Always High Love for Sakshi
    let score = 0;
    let message = "";

    if (sName.includes("sakshi")) {
        score = Math.floor(Math.random() * (100 - 97 + 1)) + 97; // 97 to 100
        message = "Mashallah! Ye jodi toh upar wale ne fursat mein banayi hai. 💍✨";
    } else {
        score = Math.floor(Math.random() * 100) + 1;
        message = "Hmm, thodi mehnat aur lagegi, par pyar saccha hai! ❤️";
    }

    // UI Updates
    resContainer.classList.remove('hidden');
    resText.innerText = score + "%";
    resMsg.innerText = message;
    
    // Animate Bar
    setTimeout(() => {
        resBar.style.width = score + "%";
    }, 100);

    // Make Magic
    makeMagic();
    gsap.from("#love-res-container", { scale: 0.5, opacity: 0, duration: 0.5, ease: "back.out" });
}

// Celebration Effects
function makeMagic() {
    for(let i=0; i<25; i++) {
        const d = document.createElement('div');
        d.innerHTML = ["🌸","❤️","✨","🌷"][Math.floor(Math.random()*4)];
        d.style.position = 'fixed'; d.style.left = '50%'; d.style.top = '50%';
        d.style.zIndex = "2000"; d.style.fontSize = "24px"; d.style.pointerEvents = "none";
        document.body.appendChild(d);
        gsap.to(d, { 
            x: (Math.random()-0.5)*window.innerWidth, y: (Math.random()-0.5)*window.innerHeight, 
            opacity: 0, rotation: 360, duration: 1.5, onComplete: () => d.remove() 
        });
    }
}

// Background Hearts Animation
const canvas = document.getElementById('canvas'); const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let heartsArr = [];
class Heart {
    constructor() { 
        this.x = Math.random()*canvas.width; this.y = canvas.height+20; 
        this.speed = Math.random()*2+1; this.opacity = 1; 
        this.char = ['🌸','❤️'][Math.floor(Math.random()*2)]; 
    }
    draw() { ctx.globalAlpha = this.opacity; ctx.font = "20px Arial"; ctx.fillText(this.char, this.x, this.y); }
    update() { this.y -= this.speed; this.opacity -= 0.003; }
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(Math.random()<0.08) heartsArr.push(new Heart());
    heartsArr.forEach((h,i) => { h.update(); h.draw(); if(h.opacity<=0) heartsArr.splice(i,1); });
    requestAnimationFrame(animate);
}

animate();

let pendingSection = "";

// Password check karne ka function
function checkPassword(sectionId) {
    pendingSection = sectionId;
    const modal = document.getElementById('password-modal');
    modal.classList.remove('hidden');
    document.getElementById('passInput').value = ""; 
    document.getElementById('pass-error').classList.add('hidden');
}

// Password verify karne ka function
function verifyPass() {
    const userInput = document.getElementById('passInput').value.toLowerCase().trim();
    const correctPass = "i love you"; // Tumhara password

    if (userInput === correctPass) {
        document.getElementById('password-modal').classList.add('hidden');
        document.getElementById(pendingSection).scrollIntoView({ behavior: 'smooth' });
        makeMagic(); // Celebration
    } else {
        document.getElementById('pass-error').classList.remove('hidden');
        // Shake effect agar password galat ho
        gsap.to("#password-modal .glass", { x: 10, duration: 0.1, yoyo: true, repeat: 5 });
    }
}
