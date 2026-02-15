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

  // TYPEWRITER EFFECT
  var tw = document.querySelector(".typewriter");
  if(tw){
    var text = tw.getAttribute("data-text");
    tw.textContent = "";
    var i = 0;

    function type(){
      if(i < text.length){
        tw.textContent += text.charAt(i);
        i++;
        setTimeout(type, 40);
      }
    }

    type();
  }

  // Envelope
  var env = document.getElementById("envelope");
  if(env){
    env.addEventListener("click", function(){
      env.classList.toggle("open");
    });
  }

});
