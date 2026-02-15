function go(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* MEMORY GAME */

const images = [
"assets/us1.jpeg","assets/us2.jpeg","assets/us3.jpeg","assets/us4.jpeg",
"assets/us5.jpeg","assets/us6.jpeg","assets/us7.jpeg","assets/us8.jpeg"
];

let cards = [...images, ...images];
cards.sort(()=>0.5 - Math.random());

const grid = document.getElementById("memoryGrid");

cards.forEach(src=>{
  const div=document.createElement("div");
  div.className="card";
  div.dataset.src=src;
  div.addEventListener("click",flip);
  grid.appendChild(div);
});

let flipped=[];

function flip(){
  if(this.classList.contains("matched")||flipped.length===2) return;

  this.innerHTML=`<img src="${this.dataset.src}">`;
  flipped.push(this);

  if(flipped.length===2){
    if(flipped[0].dataset.src===flipped[1].dataset.src){
      flipped.forEach(c=>c.classList.add("matched"));
      flipped=[];
    }else{
      setTimeout(()=>{
        flipped.forEach(c=>c.innerHTML="");
        flipped=[];
      },800);
    }
  }
}

/* SECRET VIDEO */

let trigger = document.getElementById("secretTrigger");
let clickCount=0;

trigger.addEventListener("click",()=>{
  clickCount++;
  if(clickCount===5){
    document.getElementById("videoModal").classList.add("active");
  }
});

function closeVideo(){
  document.getElementById("videoModal").classList.remove("active");
}
