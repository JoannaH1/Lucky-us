/* =========================
   Navigation (single-page “screens”)
   ========================= */
const screens = Array.from(document.querySelectorAll('.screen'));
let currentScreenId = 'intro';

window.go = function go(id){
  const next = document.getElementById(id);
  if(!next) return;

  // stop timers when leaving game
  if(currentScreenId === 'game' && id !== 'game'){
    stopGameTimer();
  }

  screens.forEach(s => s.classList.remove('active'));
  next.classList.add('active');
  currentScreenId = id;

  // UX: restart typewriter when returning to intro
  if(id === 'intro'){
    restartTypewriter();
  }

  // If entering game, ensure it is ready
  if(id === 'game'){
    // Start fresh each time (feels more “game-like”)
    resetMemoryGame();
  }
};

/* =========================
   Typewriter
   ========================= */
const tw = document.querySelector('.typewriter');
let twTimeout = null;

function restartTypewriter(){
  if(!tw) return;
  if(twTimeout) clearTimeout(twTimeout);
  tw.textContent = '';
  const text = tw.dataset.text || '';
  let i = 0;

  const tick = () => {
    if(i < text.length){
      tw.textContent += text[i];
      i += 1;
      twTimeout = setTimeout(tick, 34);
    }
  };
  tick();
}
restartTypewriter();

/* =========================
   Lucky card: subtle heart burst on tap
   ========================= */
const luckyCard = document.getElementById('luckyCard');
if(luckyCard){
  luckyCard.addEventListener('click', () => heartBurst(luckyCard));
}

function heartBurst(el){
  const burst = document.createElement('div');
  burst.className = 'heart-burst';
  el.appendChild(burst);

  const n = 14;
  for(let i=0;i<n;i++){
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = '♥';
    const angle = (Math.PI * 2) * (i / n);
    const radius = 70 + Math.random() * 40;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;
    h.style.setProperty('--dx', `${dx}px`);
    h.style.setProperty('--dy', `${dy}px`);
    h.style.fontSize = `${14 + Math.random()*12}px`;
    burst.appendChild(h);
  }

  setTimeout(() => burst.remove(), 950);
}

/* =========================
   Memory Game (8 pairs)
   ========================= */
const IMAGE_COUNT = 8;
// Your images: assets/us1.jpg ... assets/us8.jpg
const imagePaths = Array.from({length: IMAGE_COUNT}, (_,i) => `assets/us${i+1}.jpg`);

const grid = document.getElementById('memoryGrid');
const hudMatches = document.getElementById('hudMatches');
const hudMoves = document.getElementById('hudMoves');
const hudTime = document.getElementById('hudTime');
const restartBtn = document.getElementById('restartGame');
const winModal = document.getElementById('winModal');
const continueAfterWin = document.getElementById('continueAfterWin');
const skipAfterWin = document.getElementById('skipAfterWin');

let cards = [];
let firstPick = null;
let secondPick = null;
let locked = false;
let matches = 0;
let moves = 0;

let timerInterval = null;
let startTimeMs = null;

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildDeck(){
  const base = imagePaths.map((src, idx) => ({ key: idx, src }));
  const doubled = [...base, ...base].map((c, i) => ({...c, uid: `${c.key}-${i}`}));
  return shuffle(doubled);
}

function formatTime(ms){
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2,'0')}`;
}

function startGameTimer(){
  if(timerInterval) return;
  startTimeMs = Date.now();
  timerInterval = setInterval(() => {
    if(hudTime) hudTime.textContent = formatTime(Date.now() - startTimeMs);
  }, 250);
}

function stopGameTimer(){
  if(timerInterval){
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function setHUD(){
  if(hudMatches) hudMatches.textContent = String(matches);
  if(hudMoves) hudMoves.textContent = String(moves);
  if(hudTime && !timerInterval){
    hudTime.textContent = '0:00';
  }
}

function createCardElement(card){
  const btn = document.createElement('button');
  btn.className = 'memory-card';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Memory card');
  btn.dataset.key = String(card.key);
  btn.dataset.uid = card.uid;

  btn.innerHTML = `
    <div class="mc-inner">
      <div class="mc-face mc-back">
        <div class="back-pattern"></div>
        <div class="back-pip">♥</div>
      </div>
      <div class="mc-face mc-front">
        <img src="${card.src}" alt="Memory photo" />
      </div>
    </div>
  `;

  btn.addEventListener('click', () => onCardClick(btn));
  return btn;
}

function renderBoard(){
  if(!grid) return;
  grid.innerHTML = '';
  cards.forEach(card => grid.appendChild(createCardElement(card)));
}

function onCardClick(cardEl){
  if(locked) return;
  if(cardEl.classList.contains('is-flipped')) return;
  if(cardEl.classList.contains('is-matched')) return;

  // Start timer on first interaction
  startGameTimer();

  cardEl.classList.add('is-flipped');

  if(!firstPick){
    firstPick = cardEl;
    return;
  }

  secondPick = cardEl;
  moves += 1;
  if(hudMoves) hudMoves.textContent = String(moves);

  const a = firstPick.dataset.key;
  const b = secondPick.dataset.key;

  if(a === b){
    // Match
    firstPick.classList.add('is-matched');
    secondPick.classList.add('is-matched');
    matches += 1;
    if(hudMatches) hudMatches.textContent = String(matches);

    firstPick = null;
    secondPick = null;

    if(matches === IMAGE_COUNT){
      onWin();
    }
    return;
  }

  // Not a match
  locked = true;
  setTimeout(() => {
    firstPick.classList.remove('is-flipped');
    secondPick.classList.remove('is-flipped');
    firstPick = null;
    secondPick = null;
    locked = false;
  }, 680);
}

function onWin(){
  stopGameTimer();

  if(skipAfterWin){
    skipAfterWin.disabled = false;
  }

  // Show modal
  if(winModal){
    winModal.classList.add('show');
    winModal.setAttribute('aria-hidden','false');
  }

  // Small confetti pop for “game win”
  confetti({amount: 110, duration: 1400});
}

function hideWin(){
  if(winModal){
    winModal.classList.remove('show');
    winModal.setAttribute('aria-hidden','true');
  }
}

function resetMemoryGame(){
  hideWin();
  stopGameTimer();
  startTimeMs = null;

  matches = 0;
  moves = 0;
  locked = false;
  firstPick = null;
  secondPick = null;

  if(skipAfterWin){
    skipAfterWin.disabled = true;
  }

  cards = buildDeck();
  renderBoard();
  setHUD();
}

/* wire buttons */
if(restartBtn){
  restartBtn.addEventListener('click', resetMemoryGame);
}
if(continueAfterWin){
  continueAfterWin.addEventListener('click', () => {
    hideWin();
    go('quiz');
  });
}

/* Initialize board once */
resetMemoryGame();

/* =========================
   Mini Quiz (editable)
   ========================= */
const quizBox = document.getElementById('quizBox');

const quiz = [
  {
    title: "Question 1",
    q: "What do I always want right after a long day?",
    options: ["A hug from you", "Coffee", "A nap", "To scroll my phone"],
    correct: 0,
    correctText: "Correct. Always you."
  },
  {
    title: "Question 2",
    q: "What’s my favorite thing about us?",
    options: ["Our laughs", "Our honesty", "Our teamwork", "All of it"],
    correct: 3,
    correctText: "Yes. All of it."
  },
  {
    title: "Question 3",
    q: "The best place is…",
    options: ["Anywhere", "Where we first met", "Where you are", "On vacation"],
    correct: 2,
    correctText: "Where you are."
  }
];

let quizIndex = 0;
let quizScore = 0;

function renderQuiz(){
  if(!quizBox) return;
  const item = quiz[quizIndex];

  quizBox.innerHTML = `
    <h3>${item.title}</h3>
    <div class="q">${item.q}</div>
    <div class="options">
      ${item.options.map((opt,i)=>`<button class="opt" data-i="${i}">${opt}</button>`).join('')}
    </div>
    <div class="result" id="quizResult"></div>
  `;

  quizBox.querySelectorAll('.opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.i);
      const correct = i === item.correct;

      quizBox.querySelectorAll('.opt').forEach(b => b.disabled = true);

      btn.classList.add(correct ? 'correct' : 'wrong');
      const res = document.getElementById('quizResult');
      if(res){
        res.textContent = correct ? item.correctText : "Close… but I still love you.";
      }

      if(correct) quizScore += 1;

      setTimeout(() => {
        quizIndex += 1;
        if(quizIndex >= quiz.length){
          quizBox.innerHTML = `
            <h3>Score</h3>
            <div class="q">You got ${quizScore}/${quiz.length} ♡</div>
            <div class="result">Tap “Next” to see the final page.</div>
          `;
        } else {
          renderQuiz();
        }
      }, 900);
    });
  });
}
renderQuiz();

/* =========================
   Confetti (canvas)
   ========================= */
function confetti(opts={}){
  const canvas = document.getElementById('confetti');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  const amount = opts.amount ?? 160;
  const duration = opts.duration ?? 2200;

  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const resize = () => {
    canvas.width = Math.floor(window.innerWidth * DPR);
    canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  };
  resize();

  const colors = [
    [225,29,72],    // rose
    [15,15,20],     // ink
    [244,244,250]   // soft white
  ];

  const pieces = Array.from({length: amount}, () => {
    const c = colors[Math.floor(Math.random()*colors.length)];
    return {
      x: Math.random()*window.innerWidth,
      y: -20 - Math.random()*window.innerHeight*0.2,
      w: 6 + Math.random()*6,
      h: 8 + Math.random()*8,
      vx: -1.5 + Math.random()*3,
      vy: 2.4 + Math.random()*3.2,
      rot: Math.random()*Math.PI,
      vr: (-0.18 + Math.random()*0.36),
      color: `rgba(${c[0]},${c[1]},${c[2]},${0.85})`
    };
  });

  const start = performance.now();

  function frame(t){
    const elapsed = t - start;
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });

    if(elapsed < duration){
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    }
  }

  requestAnimationFrame(frame);
}

window.addEventListener('resize', () => {
  // keep the canvas correct if user rotates phone
  const canvas = document.getElementById('confetti');
  if(canvas){
    const ctx = canvas.getContext('2d');
    canvas.width = Math.floor(window.innerWidth * (window.devicePixelRatio || 1));
    canvas.height = Math.floor(window.innerHeight * (window.devicePixelRatio || 1));
    ctx.setTransform((window.devicePixelRatio || 1),0,0,(window.devicePixelRatio || 1),0,0);
  }
});
