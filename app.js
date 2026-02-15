document.addEventListener("DOMContentLoaded", () => {
  const screens = [...document.querySelectorAll(".screen")];

  function go(id){
    screens.forEach(s => s.classList.remove("active"));
    const next = document.getElementById(id);
    if(next) next.classList.add("active");
  }

  // Navigation buttons
  document.querySelectorAll("[data-go]").forEach(btn => {
    btn.addEventListener("click", () => go(btn.dataset.go));
  });

  // Build face-up cards (inject suit + big pip + bottom rank)
  // Build face-up cards ...
// Build face-up cards (random suit + optional random rank)
document.querySelectorAll(".face-card").forEach(card => {
  const suits = ["♥","♦","♣","♠"];
  const ranks = ["A","K","Q","J","10","9","8","7","6","5","4","3","2"];

  // If you want rank from HTML: keep it. Otherwise randomize.
  let rank = card.dataset.rank;
  if(!rank){
    rank = ranks[Math.floor(Math.random() * ranks.length)];
    card.dataset.rank = rank;
  }

  const suit = suits[Math.floor(Math.random() * suits.length)];
  const isRed = true;

  // Clear anything old (important if hot-reloading)
  card.innerHTML = "";

  const suit1 = document.createElement("div");
  suit1.className = "suit";
  suit1.textContent = suit;

  const suit2 = document.createElement("div");
  suit2.className = "suit2";
  suit2.textContent = suit;

  const pip = document.createElement("div");
  pip.className = "pip";
  pip.textContent = suit;

  const rank2 = document.createElement("div");
  rank2.className = "rank2";
  rank2.textContent = rank;

  const ink = isRed ? "rgba(137, 4, 20, 0.88)" : "rgba(20,19,22,.80)";
  suit1.style.color = ink;
  suit2.style.color = ink;

  pip.style.color = isRed ? "rgba(137, 4, 20, 0.88)" : "rgba(20,19,22,.18)";

  card.appendChild(suit1);
  card.appendChild(suit2);
  card.appendChild(pip);
  card.appendChild(rank2);
});


  // Secret video: long-press center photo
  const center = document.getElementById("centerPhoto");
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("secretVideo");

  let pressTimer = null;
  const PRESS_MS = 520;

  function openVideo(){
    if(!modal) return;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    try { video && video.play(); } catch(e) {}
  }

  function closeVideo(){
    if(!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    if(video){
      video.pause();
      video.currentTime = 0;
    }
  }

  document.querySelectorAll('[data-close="video"]').forEach(el => {
    el.addEventListener("click", closeVideo);
  });

  if(center){
    const start = () => {
      clearTimeout(pressTimer);
      pressTimer = setTimeout(openVideo, PRESS_MS);
    };
    const cancel = () => {
      clearTimeout(pressTimer);
      pressTimer = null;
    };

    center.addEventListener("touchstart", start, {passive:true});
    center.addEventListener("touchend", cancel);
    center.addEventListener("touchmove", cancel);
    center.addEventListener("touchcancel", cancel);

    center.addEventListener("mousedown", start);
    center.addEventListener("mouseup", cancel);
    center.addEventListener("mouseleave", cancel);
  }
// Step 3 — Envelope open/close
const envelope = document.getElementById("envelope");

function toggleEnvelope(){
  if(!envelope) return;
  envelope.classList.toggle("open");
}

if(envelope){
  envelope.addEventListener("click", toggleEnvelope);
  envelope.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " ") toggleEnvelope();
  });
}
 // =======================
// MEMORY GAME
// =======================
const memoryGrid = document.getElementById("memoryGrid");
const hudMatches = document.getElementById("hudMatches");
const hudMoves = document.getElementById("hudMoves");
const hudTime = document.getElementById("hudTime");
const restartBtn = document.getElementById("restartGame");
const winModal = document.getElementById("winModal");
const continueAfterWin = document.getElementById("continueAfterWin");
const gameNext = document.getElementById("gameNext");

let firstCard = null;
let lockBoard = false;
let matches = 0;
let moves = 0;
let t0 = null;
let timerId = null;

// PUT YOUR 8 IMAGES HERE (update filenames)
const photos = [
  "assets/us1.jpeg","assets/us2.jpeg","assets/us3.jpeg","assets/us4.jpeg",
  "assets/us5.jpeg","assets/us6.jpeg","assets/us7.jpeg","assets/us8.jpeg",
];


function shuffle(arr){
  const a = [...arr];
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(ms){
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2,"0")}`;
}

function startTimer(){
  t0 = Date.now();
  clearInterval(timerId);
  timerId = setInterval(() => {
    if(!t0) return;
    hudTime.textContent = formatTime(Date.now() - t0);
  }, 300);
}

function stopTimer(){
  clearInterval(timerId);
  timerId = null;
}

function resetHUD(){
  matches = 0;
  moves = 0;
  firstCard = null;
  lockBoard = false;
  hudMatches.textContent = "0";
  hudMoves.textContent = "0";
  hudTime.textContent = "0:00";
  if(gameNext) gameNext.setAttribute("disabled", "true");
}

function buildGame(){
  if(!memoryGrid) return;
  memoryGrid.innerHTML = "";
  resetHUD();
  stopTimer();
  t0 = null;

  const deck = shuffle([...photos, ...photos]).map((src, i) => ({
    id: `${src}__${i}`,
    src,
    key: src,
  }));

  deck.forEach((cardData) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mem-card";
    btn.dataset.key = cardData.key;

    btn.innerHTML = `
      <div class="mem-inner">
        <div class="mem-front">
          <div class="mem-suit">♥</div>
          <div class="mem-suit btm">♥</div>
          <div class="mem-monogram">A J</div>
        </div>
        <div class="mem-back">
          <img src="${cardData.src}" alt="memory photo" loading="lazy" />
        </div>
      </div>
    `;

    btn.addEventListener("click", () => flipCard(btn));
    memoryGrid.appendChild(btn);
  });
}

function flipCard(card){
  if(lockBoard) return;
  if(card.classList.contains("matched")) return;
  if(card === firstCard) return;

  if(!t0) startTimer();

  card.classList.add("flipped");

  if(!firstCard){
    firstCard = card;
    return;
  }

  moves += 1;
  hudMoves.textContent = String(moves);

  const isMatch = card.dataset.key === firstCard.dataset.key;

  if(isMatch){
    card.classList.add("matched","locked");
    firstCard.classList.add("matched","locked");
    matches += 1;
    hudMatches.textContent = String(matches);

    firstCard = null;

    if(matches === 8){
      stopTimer();
      if(winModal){
        winModal.classList.add("show");
        winModal.setAttribute("aria-hidden","false");
      }
      if(gameNext) gameNext.removeAttribute("disabled");
    }
  }else{
    lockBoard = true;
    setTimeout(() => {
      card.classList.remove("flipped");
      firstCard.classList.remove("flipped");
      firstCard = null;
      lockBoard = false;
    }, 650);
  }
}

if(restartBtn) restartBtn.addEventListener("click", buildGame);

if(continueAfterWin){
  continueAfterWin.addEventListener("click", () => {
    if(winModal){
      winModal.classList.remove("show");
      winModal.setAttribute("aria-hidden","true");
    }
    go("quiz");
  });
}

// Build immediately on load (and rebuild if you refresh)
buildGame();
// =======================
// QUIZ
// =======================
const quizCard = document.getElementById("quizCard");

const quiz = [
  {
    q: "Where was our first date?",
    a: 1,
    opts: ["Coffee shop", "Dinner", "Cinema", "Walk"]
  },
  {
    q: "What’s my favorite thing you do?",
    a: 4,
    opts: ["Text me good morning", "Hold my hand", "Make me laugh", "Check on me"]
  },
  {
    q: "Our anniversary date is…",
    a: 0,
    opts: ["02.02.2024", "14.02.2024", "01.01.2024", "02.14.2024"]
  }
];

let qi = 0;
let score = 0;

function renderQuiz(){
  if(!quizCard) return;
  const item = quiz[qi];

  quizCard.innerHTML = `
    <div class="quiz-q">${item.q}</div>
    <div class="quiz-opts">
      ${item.opts.map((t,i)=>`<button type="button" class="quiz-opt" data-i="${i}">${t}</button>`).join("")}
    </div>
    <div class="quiz-foot">
      <div class="quiz-pill">Question ${qi+1}/${quiz.length}</div>
      <div class="quiz-pill">Score ${score}</div>
    </div>
  `;

  quizCard.querySelectorAll(".quiz-opt").forEach(btn=>{
    btn.addEventListener("click", ()=>pick(+btn.dataset.i, btn));
  });
}

function pick(i, btn){
  const item = quiz[qi];
  const opts = [...quizCard.querySelectorAll(".quiz-opt")];
  opts.forEach(b => b.disabled = true);

  if(i === item.a){
    score += 1;
    btn.classList.add("correct");
  }else{
    btn.classList.add("wrong");
    opts[item.a].classList.add("correct");
  }

  setTimeout(()=>{
    qi += 1;
    if(qi >= quiz.length){
      quizCard.innerHTML = `
        <div class="quiz-q">You got ${score}/${quiz.length} ♡</div>
        <div style="color:rgba(20,19,22,.65); line-height:1.5; margin-top:10px;">
          That was adorable. I love you.
        </div>
        <div style="margin-top:14px;">
          <button type="button" class="btn primary" data-go="intro">Back to start</button>
        </div>
      `;
      const backBtn = quizCard.querySelector('[data-go="intro"]');
      backBtn && backBtn.addEventListener("click", ()=>go("intro"));
      return;
    }
    renderQuiz();
  }, 750);
}

renderQuiz();

  window.go = go;

});
