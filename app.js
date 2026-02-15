document.addEventListener("DOMContentLoaded", function(){

  function go(id){
    document.querySelectorAll(".screen").forEach(function(s){
      s.classList.remove("active");
    });
    var target = document.getElementById(id);
    if(target) target.classList.add("active");
  }

  document.addEventListener("click", function(e){
    var btn = e.target.closest("[data-go]");
    if(btn){
      go(btn.getAttribute("data-go"));
    }
  });

  // Envelope
  var env = document.getElementById("envelope");
  if(env){
    env.addEventListener("click", function(){
      env.classList.toggle("open");
    });
  }

  // Secret video
  var secretBtn = document.getElementById("secretBtn");
  var modal = document.getElementById("videoModal");
  var close = document.getElementById("closeVideo");

  if(secretBtn){
    secretBtn.addEventListener("click", function(){
      modal.classList.add("show");
    });
  }
  if(close){
    close.addEventListener("click", function(){
      modal.classList.remove("show");
    });
  }

  // Memory Game
  var grid = document.getElementById("grid");
  var images = [
    "assets/us1.jpeg","assets/us2.jpeg",
    "assets/us3.jpeg","assets/us4.jpeg",
    "assets/us5.jpeg","assets/us6.jpeg",
    "assets/us7.jpeg","assets/us8.jpeg"
  ];

  if(grid){
    var deck = images.concat(images);
    deck.sort(function(){return 0.5 - Math.random();});

    var flipped = [];
    var matches = 0;
    var counter = document.getElementById("matchCount");

    deck.forEach(function(src){
      var card = document.createElement("div");
      card.className = "memory";

      card.addEventListener("click", function(){
        if(card.querySelector("img")) return;

        var img = document.createElement("img");
        img.src = src;
        card.appendChild(img);
        flipped.push({card:card,src:src});

        if(flipped.length === 2){
          setTimeout(function(){
            if(flipped[0].src === flipped[1].src){
              matches++;
              counter.textContent = matches;
            } else {
              flipped[0].card.innerHTML = "";
              flipped[1].card.innerHTML = "";
            }
            flipped = [];
          },700);
        }
      });

      grid.appendChild(card);
    });
  }

});
