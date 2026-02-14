/* Navigation */
function go(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if(!el){
    console.error("Missing section id:", id);
    return;
  }
  el.classList.add('active');
}

/* Typewriter */
(function(){
  const tw = document.querySelector(".typewriter");
  if(!tw) return;
  const text = tw.dataset.text || "";
  tw.textContent = "";
  let i = 0;

  function tick(){
    tw.textContent += text.charAt(i);
    i++;
    if(i < text.length) setTimeout(tick, 40);
  }
  tick();
})();

/* Envelope toggle (tap/keyboard) */
(function(){
  const env = document.getElementById("envelope");
  if(!env) return;

  const toggle = () => env.classList.toggle("open");
  env.addEventListener("click", toggle);
  env.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      toggle();
    }
  });
})();

/* Secret video modal */
(function(){
  const btn = document.getElementById("secretBtn");
  const modal = document.getElementById("videoModal");
  const close = document.getElementById("closeVideo");
  if(!btn || !modal || !close) return;

  const open = () => { modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); };
  const shut = () => { modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); };

  btn.addEventListener("click", open);
  close.addEventListener("click", shut);
  modal.addEventListener("click", (e) => { if(e.target === modal) shut(); });
})();

/* Memory game (uses us1..us8 as pairs) */
(function(){
  const grid = document.getElementById("memoryGrid");
  if(!grid) return;

  const hudMatches = document.getElementById("hudMatches");
  const hudMoves = document.getElementById("hudMoves");
  const hudTime = document.getElementById("hudTime");
  const restartBtn = document.getElementById("restart");
  const winModal = document.getElementById("winModal");
  const closeWin = document.getElementById("closeWin");

  const images = [
    "assets/us1.jpeg","assets/us2.jpeg","assets/us3.jpeg","assets/us4.jpeg",
    "assets/us5.jpeg","assets/us6.jpeg","assets/us7.jpeg","assets/us8.jpeg"
  ];

  let timer = null;
  let seconds = 0;

  function fmtTime(s){
    const m = Math.floor(s/60);
    const r = String(s%60).padStart(2,"0");
    return `${m}:${r}`;
  }

  function startTimer(){
    if(timer) return;
    timer = setInterval(() => {
      seconds++;
      hudTime.textContent = fmtTime(seconds);
    }, 1000);
  }

  function stopTimer(){
    clearInterval(timer);
    timer = null;
  }

  let deck = [];
  let flipped = [];
  let matched = 0;
  let moves = 0;
  let lock = false;

  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }

  function makeCard(imgSrc){
    const card = document.createElement("button");
    card.className = "memory-card";
    card.type = "button";
    card.setAttribute("aria-label","memory card");

    const back = document.createElement("div");
    back.className = "face back";
    back.innerHTML = `
      <div class="cardback">
        <div class="rank tl">A</div>
        <div class="suit tl">♥</div>
        <div class="pattern"></div>
        <div class="rank br">J</div>
        <div class="suit br">♥</div>
      </div>
    `;

    const front = document.createElement("div");
    front.className = "face front";
    front.innerHTML = `<img src="${imgSrc}" alt="memory">`;

    card.appendChild(back);
    card.appendChild(front);

    card.dataset.img = imgSrc;
    card.addEventListener("click", () => onFlip(card));
    return card;
  }

  function reset(){
    stopTimer();
    seconds = 0;
    hudTime.textContent = "0:00";

    matched = 0;
    moves = 0;
    flipped = [];
    lock = false;

    hudMatches.textContent = "0";
    hudMoves.textContent = "0";

    winModal.classList.remove("show");
    winModal.setAttribute("aria-hidden","true");

    grid.innerHTML = "";
    deck = shuffle([...images, ...images]);
    deck.forEach(src => grid.appendChild(makeCard(src)));
  }

  function onFlip(card){
    if(lock) return;
    if(card.classList.contains("flipped")) return;

    startTimer();

    card.classList.add("flipped");
    flipped.push(card);

    if(flipped.length === 2){
      moves++;
      hudMoves.textContent = String(moves);
      lock = true;

      const [a,b] = flipped;
      const same = a.dataset.img === b.dataset.img;

      setTimeout(() => {
        if(same){
          matched++;
          hudMatches.textContent = String(matched);
          flipped = [];
          lock = false;

          if(matched === 8){
            stopTimer();
            winModal.classList.add("show");
            winModal.setAttribute("aria-hidden","false");
          }
        }else{
          a.classList.remove("flipped");
          b.classList.remove("flipped");
          flipped = [];
          lock = false;
        }
      }, 700);
    }
  }

  restartBtn.addEventListener("click", reset);
  closeWin.addEventListener("click", () => {
    winModal.classList.remove("show");
    winModal.setAttribute("aria-hidden","true");
  });

  reset();
})();

/* Quiz (you can change the questions anytime) */
(function(){
  const box = document.getElementById("quizBox");
  if(!box) return;

  const questions = [
    { q: "When is our anniversary?", opts: ["2.2.2024", "2.14.2024", "1.1.2024", "3.3.2024"], a: 0 },
    { q: "A perfect date is…", opts: ["Simple + cozy", "Very fancy", "Super loud", "Always rushed"], a: 0 },
    { q: "My favorite thing about you is…", opts: ["Your heart", "Your shoes", "Your phone", "Your emails"], a: 0 },
    { q: "Us in one word:", opts: ["Lucky", "Temporary", "Random", "Meh"], a: 0 },
    { q: "What do I want most?", opts: ["A life with you", "More drama", "Less love", "Nothing"], a: 0 },
  ];

  let i = 0;
  let score = 0;

  function render(){
    const item = questions[i];
    box.innerHTML = `
      <div class="quiz-q">${item.q}</div>
      <div class="quiz-opts">
        ${item.opts.map((t,idx)=>`<button class="opt" data-idx="${idx}">${t}</button>`).join("")}
      </div>
      <div class="quiz-progress">Question ${i+1} / ${questions.length}</div>
    `;

    box.querySelectorAll(".opt").forEach(btn=>{
      btn.addEventListener("click", () => {
        const pick = Number(btn.dataset.idx);
        const correct = pick === item.a;

        if(correct){
          btn.classList.add("correct");
          score++;
        }else{
          btn.classList.add("wrong");
          const correctBtn = box.querySelector(`.opt[data-idx="${item.a}"]`);
          if(correctBtn) correctBtn.classList.add("correct");
        }

        box.querySelectorAll(".opt").forEach(b=>b.disabled=true);

        setTimeout(() => {
          i++;
          if(i < questions.length){
            render();
          }else{
            box.innerHTML = `
              <div class="quiz-q">You finished ♡</div>
              <div style="margin-top:8px; color: rgba(36,28,34,.75); line-height:1.6">
                Score: <b>${score}</b> / ${questions.length}<br>
                (But honestly… you’re perfect anyway.)
              </div>
              <div class="quiz-progress" style="margin-top:14px;">Tap Next →</div>
            `;
          }
        }, 650);
      });
    });
  }

  render();
})();

/* Confetti */
function confetti(){
  const canvas = document.getElementById("confetti");
  if(!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({length:170}).map(() => ({
    x: Math.random()*canvas.width,
    y: -20 - Math.random()*canvas.height,
    s: 3 + Math.random()*5,
    v: 1 + Math.random()*3,
    w: (Math.random()*2-1)*1.2
  }));

  let t = 0;
  function draw(){
    t++;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(const p of pieces){
      p.y += p.v;
      p.x += p.w;
      ctx.fillStyle = (Math.random() > .5) ? "#d6336c" : "#ff7aa8";
      ctx.fillRect(p.x, p.y, p.s, p.s);

      if(p.y > canvas.height + 20){
        p.y = -30;
        p.x = Math.random()*canvas.width;
      }
    }

    if(t < 240) requestAnimationFrame(draw);
  }
  draw();
}
