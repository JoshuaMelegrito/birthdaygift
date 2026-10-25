const CONFIG = {
  name: "My Love",
  birthDate: "2004-10-26",
  togetherSince: "2026-08-15",
  heroLine: "Another year of you existing — and honestly, the world got so lucky. So did I. 🥰",
  finaleLine: "I love you my love. Every single day. 💕",

  gifs: [
    { url: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif", emoji: "🧸" },
    { url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",  emoji: "💖" },
    { url: "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",  emoji: "🌸" },
    { url: "https://media.giphy.com/media/TJ2Bv98cJP8FYlZTDL/giphy.gif", emoji: "💌" },
    { url: "https://media.giphy.com/media/KCI6yNRTfe6O8Dlpqc/giphy.gif", emoji: "🎉" },
    { url: "https://media.giphy.com/media/7dbTnwP4bBXc1XMnw6/giphy.gif", emoji: "😘" },
    { url: "https://media1.tenor.com/m/tOLZn36iWIoAAAAC/love-you.gif", emoji: "💙" },
     { url: "https://media.giphy.com/media/a31Pc1tQLlAZYc1hZa/giphy.gif", emoji: "🫂" },
  ],

  reasons: [
    { icon: "🥰", text: "You make ordinary days feel like little celebrations." },
    { icon: "😂", text: "Your laugh is my absolute favorite sound in the whole world." },
    { icon: "🫶", text: "You have the kindest heart. The way you care for others inspires me especially in your students." },
    { icon: "🌷", text: "You're softer and stronger than you give yourself credit for." },
    { icon: "🐻", text: "You give the best hugs in the entire world." },
    { icon: "✨", text: "Finally, i find the true meaning of home and that is you." }
  ],

   timeline: [
    { year: "The Beginning", title: "The algorithm got it right", text: "We met on an app, but it felt like fate. I saw your profile and knew I had to talk to you. You were the best notification I ever got." },
    { year: "Our First Date", title: "Nervous butterflies",   text: "I remember trying so hard to play it cool, but I was just completely captivated by you." },
    { year: "The First 'I Love You'", title: "When I knew", text: "The moment those three words slipped out, I knew they were the truest thing I'd ever said." },
    { year: "Right Now", title: "Still falling",            text: "With every day that we talk and every day that I spend with you, I fall for you even more than I did before. And I wouldn't have it any other way." }
  ],

  letter: `Happiest birthday my love,

Since I can't be there in person today to actually hand you a gift, I wanted to do something a little different. I built this website for you to give you something you can keep and look at whenever you miss me, even with all these miles between us.

Thank you for being the person who makes everything a little lighter. For the inside jokes, the patience, the way you turn a bad day around without even trying. For giving me peace, and for always being honest with me. I see how much you love your students and honestly, it inspires me more than you know.

I hope this year is kind to you. I hope you get the things you've been quietly hoping for. And I want you to know that whatever happens, you've got me completely, ridiculously, in your corner.

Happy birthday, my favourite person.

Yours, always.`,

  gift: "I know this will be the simplest birthday that you'll receive this year, but I just want you to know that I made this with love. I built this website using the immense love I have for you. Even though we are miles apart right now, I hope you feel how much you are cherished today. Happy birthday, my love. 💌"
};

const qs = s => document.querySelector(s);
const daysSince = d => Math.max(0, Math.floor((Date.now() - new Date(d + 'T00:00:00')) / 86400000));

function render(){
  document.title = `Happiest Birthday, ${CONFIG.name} 💖`;
  qs('#nameOut').textContent     = CONFIG.name;
  qs('#heroLine').textContent    = CONFIG.heroLine;
  qs('#finaleName').textContent  = CONFIG.name;
  qs('#finaleLine').textContent  = CONFIG.finaleLine;

  qs('#statTogether').textContent = daysSince(CONFIG.togetherSince).toLocaleString();
  qs('#statAlive').textContent    = daysSince(CONFIG.birthDate).toLocaleString();

  qs('#gifStrip').innerHTML = CONFIG.gifs.map(g => `
    <div class="gif-box">
      <img src="${g.url}" alt="" loading="lazy" onerror="this.parentNode.classList.add('failed')">
      <span class="gif-fallback">${g.emoji}</span>
    </div>`).join('');

  qs('#reasons').innerHTML = CONFIG.reasons.map((r, i) => `
    <div class="flip" tabindex="0" role="button" aria-label="Reason ${i + 1}">
      <div class="flip-inner">
        <div class="flip-front">${r.icon}</div>
        <div class="flip-back">${r.text}</div>
      </div>
    </div>`).join('');

  qs('#timeline').innerHTML = CONFIG.timeline.map(t => `
    <div class="tl-item">
      <div class="tl-dot"></div>
      <div class="tl-card">
        <span class="tl-year">${t.year}</span>
        <h3>${t.title}</h3>
        <p>${t.text}</p>
      </div>
    </div>`).join('');

  qs('#giftReveal').textContent = CONFIG.gift;
}

const HEART_EMOJIS = ['💖','💕','💗','🌸','✨','🎀','💞','🩷'];

function spawnHearts(n, x, y){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cx = x ?? innerWidth / 2, cy = y ?? innerHeight / 2;
  for (let i = 0; i < n; i++){
    const h = document.createElement('span');
    h.className = 'float-heart';
    h.textContent = HEART_EMOJIS[(Math.random() * HEART_EMOJIS.length) | 0];
    h.style.left = (cx + (Math.random() - .5) * 160) + 'px';
    h.style.top  = (cy + (Math.random() - .5) * 60) + 'px';
    h.style.fontSize = (16 + Math.random() * 24) + 'px';
    h.style.animationDuration = (2.2 + Math.random() * 1.9) + 's';
    h.style.setProperty('--dx', ((Math.random() - .5) * 180) + 'px');
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4400);
  }
}


const musicEl  = qs('#bgMusic');
const musicBtn = qs('#musicBtn');
let isPlaying = false, usingFallback = false;

let audioCtx = null, chimeTimer = null, step = 0;
const SCALE = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66];

function playNote(freq, t, dur = 1.1, vol = 0.055){
  const o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(audioCtx.destination);
  o.start(t); o.stop(t + dur + 0.1);
}
function startChimes(){
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const tick = () => {
    if (!isPlaying || !usingFallback) return;
    const t = audioCtx.currentTime + 0.05;
    const idx = [0, 2, 4, 2, 1, 3, 5, 3][step % 8];
    playNote(SCALE[idx], t, 1.1);
    if (step % 4 === 0) playNote(SCALE[idx] / 2, t, 1.8, 0.038);
    step++;
    chimeTimer = setTimeout(tick, 400);
  };
  tick();
}
function stopChimes(){ clearTimeout(chimeTimer); }

musicEl.addEventListener('error', () => { usingFallback = true; });

function startMusic(){
  if (usingFallback){ startChimes(); isPlaying = true; updateBtn(); return; }
  musicEl.volume = 0.4;
  const p = musicEl.play();
  if (p && p.then){
    p.then(() => { isPlaying = true; updateBtn(); })
     .catch(() => { usingFallback = true; startChimes(); isPlaying = true; updateBtn(); });
  } else { isPlaying = true; updateBtn(); }
}
function stopMusic(){
  musicEl.pause(); stopChimes();
  isPlaying = false; updateBtn();
}
function updateBtn(){
  musicBtn.classList.toggle('on', isPlaying);
  musicBtn.textContent = isPlaying ? '❚❚' : '♪';
}
musicBtn.addEventListener('click', () => isPlaying ? stopMusic() : startMusic());


const slides  = [...document.querySelectorAll('.slide')];
const prevBtn = qs('#prevBtn');
const nextBtn = qs('#nextBtn');
let current = 0;

function goTo(i){
  i = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((s, k) => s.classList.toggle('active', k === i));
  slides[i].scrollTop = 0;
  current = i;
  updateNav();

  const name = slides[i].dataset.slide;
  if (name === 'letter') typeLetter();
  if (name === 'finale'){
    setTimeout(() => spawnHearts(24, innerWidth / 2, innerHeight * 0.45), 250);
  }
}

function updateNav(){
  prevBtn.disabled = current === 0;
  const isLast = current === slides.length - 1;
  nextBtn.textContent = isLast ? '↺ Start over' : 'Next →';
}

nextBtn.addEventListener('click', () => {
  if (current === slides.length - 1){
    goTo(0);
    spawnHearts(20, innerWidth / 2, innerHeight * 0.6);
  } else {
    goTo(current + 1);
  }
});
prevBtn.addEventListener('click', () => goTo(current - 1));

// keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { e.preventDefault(); nextBtn.click(); }
  if (e.key === 'ArrowLeft')  { e.preventDefault(); prevBtn.click(); }
});

// swipe
let touchStartX = 0, touchStartY = 0;
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  const dy = e.changedTouches[0].screenY - touchStartY;
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4){
    dx < 0 ? nextBtn.click() : prevBtn.click();
  }
}, { passive: true });


qs('#openBtn').addEventListener('click', e => {
  qs('#gate').classList.add('hide');
  document.body.classList.add('open');
  spawnHearts(26, e.clientX, e.clientY);
  startMusic();
  goTo(0);
});


let letterStarted = false;
function typeLetter(){
  if (letterStarted) return;
  letterStarted = true;
  const el = qs('#letterText'), txt = CONFIG.letter;
  let i = 0; el.textContent = '';
  (function tick(){
    if (i >= txt.length){ el.classList.add('done'); return; }
    const ch = txt[i++];
    el.textContent += ch;
    setTimeout(tick, ch === '\n' ? 220 : 16);
  })();
}


document.addEventListener('click', e => {
  const f = e.target.closest('.flip');
  if (f) f.classList.toggle('flipped');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' '){
    const el = document.activeElement;
    if (el && el.classList.contains('flip')){
      e.preventDefault();
      el.classList.toggle('flipped');
    }
  }
});


let hugCount = 0;
qs('#hugBtn').addEventListener('click', e => {
  hugCount++;
  qs('#statHugs').textContent = hugCount.toLocaleString();
  spawnHearts(14, e.clientX, e.clientY);
});

qs('#moreHearts').addEventListener('click', e => {
  spawnHearts(28, e.clientX, e.clientY);
});


let blownOut = 0;
const candles = [...document.querySelectorAll('.candle')];
candles.forEach(c => {
  c.addEventListener('click', e => {
    if (c.classList.contains('out')) return;
    c.classList.add('out');
    blownOut++;
    spawnHearts(4, e.clientX, e.clientY);
    if (blownOut === candles.length){
      qs('#wishMsg').classList.add('show');
      spawnHearts(30, innerWidth / 2, innerHeight * 0.55);
    }
  });
});


const giftBox = qs('#giftBox');
function openGift(){
  if (giftBox.classList.contains('opened')) return;
  giftBox.classList.add('opened');
  qs('#giftReveal').classList.add('show');
  const r = giftBox.getBoundingClientRect();
  spawnHearts(26, r.left + r.width / 2, r.top);
}
giftBox.addEventListener('click', openGift);
giftBox.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openGift(); }
});


render();
