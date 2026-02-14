function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function openSecret(){
  document.getElementById('secretVideo').style.display="flex";
}

const images=[
  "assets/us1.jpeg","assets/us2.jpeg",
  "assets/us3.jpeg","assets/us4.jpeg",
  "assets/us5.jpeg","assets/us6.jpeg",
  "assets/us7.jpeg","assets/us8.jpeg"
];

let cards=[...images,...images];
cards.sort(()=>0.5-Math.random());

const grid=document.getElementById("memoryGrid");
cards.forEach(src=>{
  const div=document.createElement("div");
  div.className="card";
  div.dataset.image=src;
  div.onclick=()=>flip(div);
  grid.appendChild(div);
});

let flipped=[];

function flip(card){
  if(flipped.length<2 && !card.innerHTML){
    card.innerHTML=`<img src="${card.dataset.image}" style="width:100%;height:100%;object-fit:cover;border-radius:12px">`;
    flipped.push(card);
  }
  if(flipped.length===2){
    setTimeout(check,800);
  }
}

function check(){
  if(flipped[0].dataset.image!==flipped[1].dataset.image){
    flipped.forEach(c=>c.innerHTML="");
  }
  flipped=[];
}

function confetti(){
  const canvas=document.getElementById("confetti");
  const ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  for(let i=0;i<200;i++){
    ctx.fillStyle="#b76e79";
    ctx.fillRect(Math.random()*canvas.width,
                 Math.random()*canvas.height,
                 4,4);
  }
}
