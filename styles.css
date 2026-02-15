:root{
  --bg:#fff1f5;
  --bg2:#ffe1ea;
  --accent:#d6336c;
  --accent2:#ff7aa8;
  --text:#241c22;
  --muted:rgba(36,28,34,.64);
  --stroke:rgba(214,51,108,.16);
  --shadow:0 26px 70px rgba(20,10,18,.14);
}

*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%}
body{
  font-family:'Inter',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  color:var(--text);
  background:var(--bg);
  overflow:hidden;
}

/* romantic premium bg */
.bg{
  position:fixed; inset:0; z-index:-1;
  background:
    radial-gradient(900px 650px at 22% 26%, rgba(255,122,168,.42), transparent 62%),
    radial-gradient(850px 650px at 78% 72%, rgba(214,51,108,.24), transparent 62%),
    radial-gradient(900px 900px at 50% 120%, rgba(255,227,236,.95), transparent 55%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%);
  animation: drift 12s ease-in-out infinite alternate;
}
@keyframes drift{
  from{ transform:scale(1) translateY(0); filter:saturate(1.05); }
  to{ transform:scale(1.04) translateY(-10px); filter:saturate(1.12); }
}

.app{height:100svh; position:relative}

/* iPhone-safe screens */
.screen{
  position:absolute; inset:0;
  display:grid;
  grid-template-rows: 1fr auto 1fr;
  padding:
    max(18px, env(safe-area-inset-top))
    18px
    max(18px, env(safe-area-inset-bottom));
  opacity:0;
  transform:translateY(18px) scale(.99);
  transition:opacity .55s ease, transform .55s cubic-bezier(.77,0,.18,1);
  pointer-events:none;
}
.screen.active{
  opacity:1;
  transform:translateY(0) scale(1);
  pointer-events:auto;
}

.center{
  grid-row:2;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  gap:14px;
}

.nav-bottom{
  grid-row:3;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding-bottom:max(6px, env(safe-area-inset-bottom));
}

.footer-note{
  position:absolute;
  bottom:max(14px, env(safe-area-inset-bottom));
  left:0; right:0;
  text-align:center;
  color:rgba(36,28,34,.40);
  font-size:12px;
}

/* Buttons */
.btn{
  border:none;
  background:transparent;
  color:var(--accent);
  font-weight:600;
  font-size:14px;
  cursor:pointer;
  padding:10px 14px;
  border-radius:999px;
}
.btn:active{transform:scale(.98)}
.btn-primary{
  background:linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
  color:#fff;
  box-shadow:0 18px 45px rgba(214,51,108,.25);
}
.btn-ghost{
  background:rgba(255,255,255,.55);
  backdrop-filter: blur(10px);
  border:1px solid var(--stroke);
  box-shadow:0 12px 30px rgba(20,10,18,.06);
}
.btn-icon{width:40px;height:40px;display:grid;place-items:center;padding:0}
.btn-small{padding:8px 12px;font-size:13px}

/* Intro */
.intro-mark{
  width:58px;height:58px;
  border-radius:18px;
  display:grid; place-items:center;
  background:rgba(255,255,255,.65);
  border:1px solid rgba(255,255,255,.7);
  box-shadow:0 18px 45px rgba(20,10,18,.10);
  color:var(--accent);
  font-size:28px;
}
.typewriter{
  font-family:'Playfair Display',serif;
  font-weight:700;
  font-size:26px;
  line-height:1.35;
  max-width:330px;
  min-height:74px;
}
.subtitle{font-size:13px;color:var(--muted)}
.hint{margin-top:6px;color:var(--muted);font-size:13px}
.subtle{opacity:.75}
.section-title{
  font-size:13px;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:rgba(36,28,34,.55);
  margin-bottom:6px;
}

/* ===== PAGE 2: 3x3 SQUARE REALISTIC PLAYING CARDS ===== */
.card-grid{
  width:min(410px, 94vw);
  aspect-ratio: 1 / 1;
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:12px;
  padding:10px;
}

.sq-card{
  border-radius:18px;
  border:1px solid rgba(20,10,18,.10);
  box-shadow:0 14px 35px rgba(20,10,18,.10);
  background:rgba(255,255,255,.75);
  overflow:hidden;
  position:relative;
}

/* realistic card back */
.sq-card.back{
  background:
    radial-gradient(circle at 25% 25%, rgba(255,255,255,.85), transparent 45%),
    linear-gradient(180deg, rgba(255,255,255,.98), rgba(255,235,242,.90));
}
.sq-card.back::before{
  content:"A";
  position:absolute; top:12px; left:12px;
  font-family:'Playfair Display',serif;
  font-weight:700;
  color:rgba(36,28,34,.85);
  font-size:18px;
}
.sq-card.back::after{
  content:"♥";
  position:absolute; top:36px; left:12px;
  color:var(--accent);
  font-size:18px;
}
.sq-card.back .pattern{
  position:absolute; inset:18%;
  border-radius:14px;
  border:1px solid rgba(214,51,108,.18);
}

/* center photo card (square) */
.center-card{
  background:#fff;
}
.center-card img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  filter:saturate(1.04);
}
.center-corners .c{
  position:absolute;
  font-family:'Playfair Display',serif;
  font-weight:700;
  font-size:18px;
  color:rgba(255,255,255,.95);
  text-shadow:0 2px 14px rgba(0,0,0,.32);
}
.center-corners .tl{top:12px;left:12px}
.center-corners .br{bottom:12px;right:12px;transform:rotate(180deg)}

/* ===== ENVELOPE (cleaner) ===== */
.envelope{
  width:min(360px, 92vw);
  height:230px;
  position:relative;
  cursor:pointer;
  border:none;
  background:transparent;
  padding:0;
}
.env-shadow{
  position:absolute;
  left:14px; right:14px; bottom:4px;
  height:28px;
  background:rgba(20,10,18,.18);
  filter:blur(18px);
  border-radius:999px;
}
.env-back{
  position:absolute; inset:0;
  background:rgba(255,255,255,.74);
  border:1px solid rgba(214,51,108,.18);
  border-radius:18px;
  box-shadow:0 18px 50px rgba(20,10,18,.08);
}
.env-front{
  position:absolute; inset:0;
  border-radius:18px;
  background:linear-gradient(180deg, rgba(255,255,255,.64), rgba(255,227,236,.86));
  border:1px solid rgba(214,51,108,.12);
  clip-path:polygon(0 40%, 50% 72%, 100% 40%, 100% 100%, 0 100%);
}
.env-flap{
  position:absolute; inset:0;
  border-radius:18px;
  background:linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,227,236,.92));
  border:1px solid rgba(214,51,108,.12);
  clip-path:polygon(0 0, 100% 0, 50% 62%);
  transform-origin:50% 0%;
  transition:transform .6s cubic-bezier(.77,0,.18,1);
}
.env-seal{
  position:absolute;
  left:50%; top:56%;
  transform:translate(-50%,-50%);
  width:46px;height:46px;border-radius:999px;
  display:grid;place-items:center;
  background:linear-gradient(135deg, var(--accent), var(--accent2));
  color:#fff;
  box-shadow:0 14px 30px rgba(214,51,108,.22);
  font-weight:800;
}

/* hidden letter until open */
.env-letter{
  position:absolute;
  left:12px; right:12px;
  bottom:14px;
  height:180px;
  border-radius:14px;
  background:rgba(255,255,255,.96);
  border:1px solid rgba(214,51,108,.12);
  box-shadow:0 18px 45px rgba(20,10,18,.10);
  transform:translateY(92px);
  transition:transform .65s cubic-bezier(.77,0,.18,1);
  overflow:hidden;
}
.env-letter-inner{
  padding:18px 16px;
  text-align:left;
  font-size:14px;
  line-height:1.75;
  color:rgba(36,28,34,.88);
  opacity:0;
  transform:translateY(10px);
  transition:opacity .45s ease, transform .45s ease;
}
.envelope.open .env-letter{ transform:translateY(0); }
.envelope.open .env-flap{ transform:rotateX(180deg); }
.envelope.open .env-letter-inner{ opacity:1; transform:translateY(0); }

/* Letter card */
.letter-card{
  width:min(380px, 92vw);
  background:rgba(255,255,255,.78);
  border:1px solid rgba(255,255,255,.7);
  box-shadow:var(--shadow);
  border-radius:22px;
  padding:26px 22px;
  text-align:left;
  backdrop-filter: blur(10px);
}
.letter-card h2{
  font-family:'Playfair Display',serif;
  font-size:22px;
  margin-bottom:10px;
}
.letter-card p{line-height:1.75;color:rgba(36,28,34,.86);margin:10px 0}
.sign{font-family:'Playfair Display',serif;font-weight:700;margin-top:14px}
.secret-row{
  margin-top:16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding-top:12px;
  border-top:1px solid rgba(214,51,108,.12);
}
.secret-label{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:rgba(36,28,34,.55)}

/* Video modal */
.modal{
  display:none;
  position:fixed; inset:0;
  background:rgba(0,0,0,.55);
  backdrop-filter: blur(8px);
  align-items:center;
  justify-content:center;
  padding:18px;
}
.modal.show{display:flex}
.modal-card{
  width:min(520px, 96vw);
  background:rgba(10,10,12,.92);
  border:1px solid rgba(255,255,255,.12);
  border-radius:18px;
  padding:14px;
  position:relative;
}
.modal-card video{width:100%;border-radius:12px}
.modal-close{position:absolute;top:10px;right:10px;color:#fff;border:1px solid rgba(255,255,255,.18)}

/* Game */
.game-center{gap:10px}
.hud{
  width:min(420px, 96vw);
  display:flex;
  gap:10px;
  flex-wrap:wrap;
  align-items:center;
  justify-content:center;
  margin:6px auto 10px;
}
.hud-pill{
  background:rgba(255,255,255,.60);
  border:1px solid rgba(214,51,108,.14);
  border-radius:999px;
  padding:10px 12px;
  font-size:13px;
  color:rgba(36,28,34,.72);
  backdrop-filter: blur(10px);
}

.game-board{
  width:min(420px, 96vw);
  margin:0 auto;
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  gap:10px;
  justify-content:center;
}

/* memory cards */
.memory-card{
  position:relative;
  aspect-ratio:3/4;
  border-radius:16px;
  background:rgba(255,255,255,.85);
  border:1px solid rgba(20,10,18,.10);
  box-shadow:0 12px 28px rgba(20,10,18,.08);
  transform-style:preserve-3d;
  transition:transform .55s cubic-bezier(.77,0,.18,1);
  cursor:pointer;
  overflow:hidden;
}
.memory-card.flipped{transform:rotateY(180deg)}
.face{position:absolute; inset:0; backface-visibility:hidden}
.front{transform:rotateY(180deg)}
.front img{width:100%;height:100%;object-fit:cover;display:block}

.cardback{
  position:absolute; inset:0;
  background:
    radial-gradient(circle at 30% 25%, rgba(255,255,255,.90), transparent 45%),
    linear-gradient(180deg, rgba(255,255,255,.98), rgba(255,235,242,.90));
}
.cardback .pattern{
  position:absolute; inset:14%;
  border-radius:12px;
  border:1px solid rgba(214,51,108,.18);
  background:
    radial-gradient(circle at 30% 30%, rgba(214,51,108,.10), transparent 45%),
    radial-gradient(circle at 70% 70%, rgba(214,51,108,.10), transparent 45%);
}
.cardback .rank, .cardback .suit{
  position:absolute;
  font-family:'Playfair Display',serif;
  font-weight:700;
  color:rgba(36,28,34,.85);
}
.cardback .rank.tl{ top:10px; left:10px; font-size:16px; }
.cardback .suit.tl{ top:30px; left:10px; font-size:16px; color:var(--accent); }
.cardback .rank.br{ bottom:10px; right:10px; font-size:16px; transform:rotate(180deg); }
.cardback .suit.br{ bottom:30px; right:10px; font-size:16px; color:var(--accent); transform:rotate(180deg); }

/* Win modal */
.win-modal{
  position:fixed; inset:0;
  display:none;
  align-items:center;
  justify-content:center;
  background:rgba(0,0,0,.35);
  backdrop-filter: blur(8px);
  padding:20px;
}
.win-modal.show{display:flex}
.win-card{
  width:min(360px, 92vw);
  background:rgba(255,255,255,.88);
  border:1px solid rgba(255,255,255,.7);
  border-radius:22px;
  padding:22px;
  box-shadow:var(--shadow);
  text-align:center;
}
.win-title{font-family:'Playfair Display',serif;font-size:22px;margin-bottom:6px}
.win-sub{color:rgba(36,28,34,.72);margin-bottom:14px}

/* Final */
.final-card{
  width:min(380px, 92vw);
  background:rgba(255,255,255,.80);
  border:1px solid rgba(255,255,255,.75);
  box-shadow:var(--shadow);
  border-radius:22px;
  padding:26px 22px;
}
.final-title{font-family:'Playfair Display',serif;font-size:34px}
.final-sub{margin-top:6px;font-family:'Playfair Display',serif;font-size:22px;color:rgba(36,28,34,.72)}
.final-note{margin-top:14px;color:rgba(36,28,34,.60);font-size:13px}

.bonus-photo{
  width:min(320px, 82vw);
  border-radius:18px;
  overflow:hidden;
  border:1px solid rgba(20,10,18,.10);
  box-shadow:0 18px 45px rgba(20,10,18,.10);
  position:relative;
}
.bonus-photo img{width:100%;height:100%;object-fit:cover;display:block}
.bonus-cap{
  position:absolute;
  left:12px; bottom:12px;
  padding:8px 12px;
  border-radius:999px;
  background:rgba(255,255,255,.60);
  border:1px solid rgba(255,255,255,.7);
  backdrop-filter: blur(10px);
  color:rgba(36,28,34,.78);
  font-weight:600;
}

/* Confetti */
#confetti{position:fixed; inset:0; pointer-events:none}
