const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

//Rose Curve Class

class RoseCurve {

  constructor(x, y, radius, petals, color, precision){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.petals = (petals % 2 == 0) ? petals*0.5 : petals;
    this.phaseShift = 0;
    this.color = color;
    this.precision = precision;
  }

  render(){
    for(let rad = 0; rad < Math.PI*2; rad+= this.precision){
      let magnitude = this.radius*Math.cos(rad*this.petals);
      let x = this.x + magnitude*Math.cos(rad+this.phaseShift);
      let y = this.y + magnitude*Math.sin(rad+this.phaseShift);
      
      context.fillStyle = this.color;
      context.fillRect(x, y, 2, 2);
    }
  }

  rotate(deltaRad){
    this.phaseShift += deltaRad;
    if(deltaRad > Math.PI*2){
      deltaRad = 0;
    }
  }


  scale(scaleFactor){
    this.radius*=scaleFactor;
  }

}


//Create Array of RoseCurves
const roses = [];

function generateRandomColorChannel(){
  return Math.floor(256*Math.random());
}

for(let i = 0; i < 100; i ++){
  const color = `rgb(${generateRandomColorChannel()}, ${generateRandomColorChannel()}, ${generateRandomColorChannel()})`;
  roses.push(new RoseCurve(window.innerWidth*0.5, window.innerHeight*0.5, 100, 64, color, 1/(Math.random()*400)));
  roses[i].rotate(i*2);
}

let currentRose = 0;

//Set Up Animation Loop

const loop = () => {
  context.fillStyle="black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  const rose = roses[currentRose];
  rose.render();
  rose.rotate(-0.01);
  rose.scale(1.01); 
  if(rose.radius > 1000){
    currentRose++;
    if(currentRose == rose.length){
      currentRose = 0;
    }
  }
}

window.setInterval(loop, 1000/30);

document.addEventListener("keydown", (e) => {
  switch(e.key){
    case "a":
      roses[currentRose].precision-=0.0001
      if(roses[currentRose].precision <= 0){
        roses[currentRose].precision=0.01;
      }
      break;
    case "d":
      roses[currentRose].precision+=0.001
      break;
  }
});


