let dots;
let radius;
var socket;
let playerDot;


function setup(){
  socket = io.connect("http://localhost:3000");
  socket.on('mouse', newPlayer);

  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  background(220, 0, 80);

  radius = 20;


  dots = [];

  playerDot = new Dot(width/2, height/2, radius);
  for (let i = 0; i < 30; i++) {
    dots[i] = new Dot(random(width), random(height), 10);
    //dots.push(dotObject);
  }
}

function draw() {
  background(220, 0, 80);
  Agario();

  console.log(playerDot.pos.x + ',' + playerDot.pos.y)

  //background(220, 0, 80);

  var data = {
    x: playerDot.pos.x,
    y: playerDot.pos.y,
    radius: playerDot.radius,
  }
  socket.emit('mouse', data);
}

function Agario() {
  playerDot.draw();
  playerDot.update();
  for (let i = 0; i < dots.length; i++) {
    dots[i].draw();
    if(dots[i].collide()) {
      dots.splice(i, 1);
    }
  }

}

// function mouseMoved() {
//   console.log(playerDot.pos.x + ',' + playerDot.pos.y)
//
//   //background(220, 0, 80);
//
//   var data = {
//     x: playerDot.pos.x,
//     y: playerDot.pos.y,
//     radius: playerDot.radius,
//   }
//   socket.emit('mouse', data);
//
// }

// function mouseMoved() {
//   console.log(mouseX + ',' + mouseY)
//
//   background(220, 0, 80);
//
//   var data = {
//     x: mouseX,
//     y: mouseY,
//     radius: radius,
//   }
//   socket.emit('mouse', data);
//
//   fill('blue');
//   noStroke();
//   ellipse(mouseX, mouseY, radius);
// }

function newPlayer(data) {
  background(220, 0, 80);
  console.log(data.x + ',' + data.y)


  fill(random(0, 360), 100, 100);
  noStroke();
  ellipse(data.x, data.y, data.radius);
}

class Dot {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = random(360);

  }

  //Method
  draw() {
    // draw the dot
    fill(this.color, 80, 70);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  update() {
    let vel = createVector(mouseX, mouseY);
    vel.sub(this.pos);
    vel.setMag(3);
    this.pos.add(vel);
  }

  collide(other) {
      let hit = collideCircleCircle(
        this.x,
        this.y,
        this.r * 2,
        playerDot.pos.x,
        playerDot.pos.y,
        playerDot.r * 2
      );

      if (hit) {
        playerDot.r += 5;
        console.log("hello");
        return true;
      } else {
        return false;
      }
    }
}
