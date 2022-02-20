trees = [];
barrels = [];
barrelbullets = [];
bushes = [];
keys = [];
window.onload = function() {
  if (window.innerHeight > window.innerWidth) {
    alert("No Support for Vertical orientation");
  } else {
    for (i=0;i<30;i++) {
      var tree = document.createElement("img");
      tree.src = "assets/tree.png"
      tree.style.cssText = "position:absolute;z-index:3;width:35vmin;height:35vmin;";
      var randX = Math.floor(Math.random() * (window.innerWidth*3-window.innerHeight/2.8));
      var randY = Math.floor(Math.random() * (window.innerWidth*3-window.innerHeight/2.8));
      tree.style.left = randX + (window.innerWidth/2-window.innerHeight/20) + 'px';
      tree.style.top = randY + (window.innerHeight/2-window.innerHeight/20) + 'px';
      trees.push(tree);
      document.body.appendChild(tree);
    }

    for (i=0;i<30;i++) {
      var barrel = document.createElement("img");
      barrel.src = "assets/barrel.png"
      barrel.style.cssText = "position:absolute;z-index:1.5;width:10vmin;height:10vmin;";
      var randX = Math.floor(Math.random() * (window.innerWidth*3-window.innerHeight/10));
      var randY = Math.floor(Math.random() * (window.innerWidth*3-window.innerHeight/10));
      var posX = randX + (window.innerWidth/2-window.innerHeight/20);
      var posY = randY + (window.innerHeight/2-window.innerHeight/20);
      barrel.style.left = posX + 'px';
      barrel.style.top = posY + 'px';
      barrels.push(barrel);
      for (x=0;x<trees.length;x++) {
        if (trees[x].offsetLeft>posX-window.innerHeight/2.8 && trees[x].offsetLeft<posX+window.innerHeight/10 && trees[x].offsetTop<posY+window.innerHeight/10 && trees[x].offsetTop>posY-window.innerHeight/2.8) {
          barrel.style.display = "none";
        }
      }
      document.body.appendChild(barrel);
    }

    for (i=0;i<30;i++) {
      var bush = document.createElement("img");
      bush.src = "assets/bush.png"
      bush.style.cssText = "position:absolute;z-index:3;width:15vmin;height:15vmin;";
      var randX = Math.floor(Math.random() * (window.innerWidth*3-window.innerHeight/6.66));
      var randY = Math.floor(Math.random() * (window.innerWidth*3-window.innerHeight/6.66));
      var posX = randX + (window.innerWidth/2-window.innerHeight/20);
      var posY = randY + (window.innerHeight/2-window.innerHeight/20);
      bush.style.left = posX + 'px';
      bush.style.top = posY + 'px';
      bushes.push(bush);
      for (z=0;z<trees.length;z++) {
        if (trees[z].offsetLeft>posX-window.innerHeight/2.8 && trees[z].offsetLeft<posX+window.innerHeight/10 && trees[z].offsetTop<posY+window.innerHeight/10 && trees[z].offsetTop>posY-window.innerHeight/2.8) {
          bush.style.display = "none";
        }
      }
      document.body.appendChild(bush);
    }
  }
}

window.onresize = function() {
  if (window.innerHeight > window.innerWidth) {
    alert("No Support for Vertical orientation");
  }
}

character = document.getElementById("character");
gun = document.getElementById("gun");

window.onkeydown = function(event) {
  if (!(keys.includes(event.key))) {
    keys.push(event.key);
  }
}

window.onkeyup = function(event) {
  keys.splice(keys.indexOf(event.key), 1);
}

window.onmousemove = function() {
  var dy = event.pageY - (pageYOffset + window.innerHeight/2);
  var dx = event.pageX - (pageXOffset + window.innerWidth/2);
  angle = Math.atan2(dy, dx)*180/Math.PI;
  gun.style.transform = 'rotate('+angle+'deg)';
}

bullets = [];
window.onclick = function() {
  var leftoffset = Math.cos(angle*Math.PI/180)*gun.offsetWidth;
  var topoffset = Math.sin(angle*Math.PI/180)*gun.offsetWidth;
  var bullet = document.createElement("div");
  bullet.style.cssText = "background-color:black;width:2vmin;height:2vmin;border-radius:50%;z-index:2;position:absolute;";
  bullet.style.left = (pageXOffset+window.innerWidth/2-window.innerHeight*0.01+leftoffset)+"px";
  bullet.style.top = (pageYOffset+window.innerHeight/2-window.innerHeight*0.01+topoffset)+"px";
  document.body.appendChild(bullet);
  bullets.push(bullet);
  document.getElementById("shootaudio").playbackRate = 3;
  document.getElementById("shootaudio").play();
}

setInterval(bulletshoot, 10);

function bulletshoot() {
  for (i=0;i<bullets.length;i++) {
    $(bullets[i]).animate({
      left: pageXOffset+window.innerWidth/2-window.innerHeight*0.01+Math.cos(angle*Math.PI/180)*(window.innerHeight+window.innerWidth)*3+'px', top:pageYOffset+window.innerHeight/2-window.innerHeight*0.01+Math.sin(angle*Math.PI/180)*(window.innerHeight+window.innerWidth)*3+'px'
    }, 3000);
  }
}

setInterval(bulletcheck, 1)

function bulletcheck() {
  for (i=0;i<bullets.length;i++) {
    if (bullets[i].offsetLeft < window.innerWidth/2 - window.innerHeight*0.05 || bullets[i].offsetTop < window.innerHeight/2 - window.innerHeight*0.05 || bullets[i].offsetLeft > window.innerWidth/2 - window.innerHeight*0.05 + window.innerWidth*3 || bullets[i].offsetTop > window.innerHeight/2 - window.innerHeight*0.05 + window.innerWidth*3) {
      bullets[i].remove();
    }
    
    for (x=0;x<barrels.length;x++) {
      if (bullets[i].offsetLeft<barrels[x].offsetLeft+barrels[x].offsetWidth && bullets[i].offsetLeft>barrels[x].offsetLeft-bullets[i].offsetWidth && bullets[i].offsetTop<barrels[x].offsetTop+barrels[x].offsetHeight && bullets[i].offsetTop>barrels[x].offsetTop-bullets[i].offsetHeight) {

        if (barrels[x].getAttribute("src") == "assets/barrel.png") {

          document.getElementById("metalbullethit").playbackRate = 2;
          document.getElementById("metalbullethit").play();
          barrels[x].style.width = (barrels[x].offsetWidth-window.innerHeight*0.01) + 'px';
          barrels[x].style.height = (barrels[x].offsetHeight-window.innerHeight*0.01) + 'px';
          barrels[x].style.left = (barrels[x].offsetLeft+window.innerHeight*0.005) + 'px';
          barrels[x].style.top = (barrels[x].offsetTop+window.innerHeight*0.005) + 'px';
          if (barrels[x].offsetWidth < window.innerHeight*0.06 && barrels[x].offsetHeight < window.innerHeight*0.06) {

            document.getElementById("barrelbreakaudio").play();
            var explosionarray = [];
            for (a=0;a<Math.PI*2;a+=Math.PI/5) {
              
              var bullet = document.createElement("div");
              bullet.style.cssText = "background-color:black;width:2vmin;height:2vmin;border-radius:50%;z-index:2;position:absolute;";
              bullet.style.left = barrels[x].offsetLeft+barrels[x].offsetWidth/2 + Math.cos(a)*window.innerHeight*0.05 + 'px';
              bullet.style.top = barrels[x].offsetTop+barrels[x].offsetHeight/2 + Math.sin(a)*window.innerHeight*0.05 + 'px';
              explosionarray.push(bullet);
              document.body.appendChild(bullet);
              barrelbullets.push(bullet);
              $(bullet).animate({
                left: barrels[x].offsetLeft+barrels[x].offsetWidth/2 + Math.cos(a)*(window.innerHeight+window.innerWidth)*3 + 'px', top: barrels[x].offsetTop+barrels[x].offsetHeight/2 + Math.sin(a)*(window.innerHeight+window.innerWidth)*3 + 'px'
              }, 3000);
            }
            barrels[x].src = "assets/explosionmark.png";
            barrels[x].style.width = window.innerHeight/10 + 'px';
            barrels[x].style.height = window.innerHeight/10 + 'px';
            barrels[x].style.left = barrels[x].offsetLeft-window.innerHeight*0.02+'px';
            barrels[x].style.top = barrels[x].offsetTop-window.innerHeight*0.02+'px';
          }
          bullets[i].remove();
        }
      }
    }
  }

  for (y=0;y<barrelbullets.length;y++) {
    if (barrelbullets[y].offsetLeft < window.innerWidth/2 - window.innerHeight*0.05 || barrelbullets[y].offsetTop < window.innerHeight/2 - window.innerHeight*0.05 || barrelbullets[y].offsetLeft > window.innerWidth/2 - window.innerHeight*0.05 + window.innerWidth*3 || barrelbullets[y].offsetTop > window.innerHeight/2 - window.innerHeight*0.05 + window.innerWidth*3) {
      barrelbullets[y].remove();
    }

    for (z=0;z<barrels.length;z++) {
      if (barrelbullets[y].offsetLeft<barrels[z].offsetLeft+barrels[z].offsetWidth && barrelbullets[y].offsetLeft>barrels[z].offsetLeft-barrelbullets[y].offsetWidth && barrelbullets[y].offsetTop<barrels[z].offsetTop+barrels[z].offsetHeight && barrelbullets[y].offsetTop>barrels[z].offsetTop-barrelbullets[y].offsetHeight && barrels[z].getAttribute("src") == "assets/barrel.png") {
          barrels[z].style.width = (barrels[z].offsetWidth-window.innerHeight*0.01) + 'px';
          barrels[z].style.height = (barrels[z].offsetHeight-window.innerHeight*0.01) + 'px';
          barrels[z].style.left = (barrels[z].offsetLeft+window.innerHeight*0.005) + 'px';
          barrels[z].style.top = (barrels[z].offsetTop+window.innerHeight*0.005) + 'px';
          if (barrels[z].offsetWidth < window.innerHeight*0.06 && barrels[z].offsetHeight < window.innerHeight*0.06) {

            document.getElementById("barrelbreakaudio").play();
            var explosionarray = [];
            for (a=0;a<Math.PI*2;a+=Math.PI/5) {
              
              var bullet = document.createElement("div");
              bullet.style.cssText = "background-color:black;width:2vmin;height:2vmin;border-radius:50%;z-index:2;position:absolute;";
              bullet.style.left = barrels[z].offsetLeft+barrels[z].offsetWidth/2 + Math.cos(a)*window.innerHeight*0.05 + 'px';
              bullet.style.top = barrels[z].offsetTop+barrels[z].offsetHeight/2 + Math.sin(a)*window.innerHeight*0.05 + 'px';
              explosionarray.push(bullet);
              document.body.appendChild(bullet);
              barrelbullets.push(bullet);
              $(bullet).animate({
                left: barrels[z].offsetLeft+barrels[z].offsetWidth/2 + Math.cos(a)*(window.innerHeight+window.innerWidth)*3 + 'px', top: barrels[z].offsetTop+barrels[z].offsetHeight/2 + Math.sin(a)*(window.innerHeight+window.innerWidth)*3 + 'px'
              }, 3000);
            }
            barrels[z].src = "assets/explosionmark.png";
            barrels[z].style.width = window.innerHeight/10 + 'px';
            barrels[z].style.height = window.innerHeight/10 + 'px';
            barrels[z].style.left = barrels[z].offsetLeft-window.innerHeight*0.02+'px';
            barrels[z].style.top = barrels[z].offsetTop-window.innerHeight*0.02+'px';
          }
          barrelbullets[y].remove();
      }
    }
  }
}

setInterval(barrelcheck, 0.1);

function barrelcheck() {
  for (i=0;i<barrels.length;i++) {
    var barpos = barrels[i].getBoundingClientRect();
    var charpos = character.getBoundingClientRect();
    if (charpos.right>barpos.left && charpos.top<barpos.bottom && charpos.bottom>barpos.top && charpos.left<barpos.right && barrels[i].getAttribute("src") == "assets/barrel.png") {
      $("html").stop(true);
      var dy = (charpos.top+charpos.height/2) - (barpos.top+barpos.height/2);
      var dx = (charpos.left+charpos.width/2) - (barpos.left+barpos.width/2);
      var angle = Math.atan2(dy, dx);
      $("html").animate({
        scrollLeft:"+="+Math.cos(angle)*window.innerHeight*0.05
      }, 1);
      $("html").animate({
        scrollTop:"+="+Math.sin(angle)*window.innerHeight*0.05
      }, 1);
    }
  }
}

setInterval(bushcheck, 10);

function bushcheck() {
  for (i=0;i<bushes.length;i++) {
    for (x=0;x<bullets.length;x++) {
      var bushpos = bushes[i].getBoundingClientRect();
      var bulletpos = bullets[x].getBoundingClientRect();
      var charpos = character.getBoundingClientRect();
      if (bushpos.right>bulletpos.left && bushpos.top<bulletpos.bottom && bushpos.bottom>bulletpos.top && bushpos.left<bulletpos.right) {
        document.getElementById("bushbullethit").play();
      }

      if (bushpos.right>charpos.left && bushpos.top<charpos.bottom && bushpos.bottom>bulletpos.top && bushpos.left<bulletpos.right) {
        document.getElementById("bushbullethit").play();
      }
    }
  }
}

setInterval(keyCheck, 10);

function keyCheck() {
  if (keys.includes('w')) {
    window.scrollBy(0, -(window.innerHeight/250));
  }
  if (keys.includes('a')) {
    window.scrollBy(-(window.innerHeight/250), 0);
  }
  if (keys.includes('s')) {
    window.scrollBy(0, window.innerHeight/250);
  }
  if (keys.includes('d')) {
    window.scrollBy(window.innerHeight/250, 0);
  }
}
