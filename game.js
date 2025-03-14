const grid = 45;  //Unit size for the grid
const mind = [{
  thinking : false,
  dirY: 5,
  dirX: 1,
  count: 0
},{
  thinking : false,
  dirY: 5,
  dirX: 1,
  count: 0
}];

//Create a canvas element dynamically
const canvas = document.createElement('canvas');
canvas.setAttribute('width', grid*20); 
canvas.setAttribute('height',grid*15); 
document.body.prepend(canvas);
canvas.style.border = "1px solid black";

//Get the 2D rendering context for the canvas
const ctx = canvas.getContext('2d');

//Buttons and Controls
const div1 = document.createElement('div');
document.body.prepend(div1);

const btn1 =  document.createElement('button');
btn1.textContent = 'Turn On Player 2';
div1.prepend(btn1);
btn1.style.backgroundColor = '#FF6347';
btn1.style.color = 'white';
btn1.style.padding = '10px';


const btn =  document.createElement('button');
btn.textContent = 'Turn On Player 1';
div1.prepend(btn);
btn.style.backgroundColor = '#4682B4';
btn.style.color = 'white';
btn.style.padding = '10px';

//Toggle Player AI Thinking States
btn1.addEventListener('click',()=>{
  canvas.focus();
  if(!mind[1].thinking){
    mind[1].thinking = true;
    btn1.textContent = 'Turn Off Player 2';
    btn1.style.backgroundColor = '#32CD32'; 
  }else{
    mind[1].thinking = false;
    btn1.textContent = 'Turn On Player 2';
    btn1.style.backgroundColor = '#FF6347'; 
  }
})


btn.addEventListener('click',(e)=>{
  canvas.focus();
  if(!mind[0].thinking){
    mind[0].thinking = true;
    btn.textContent = 'Turn Off Player 1';
    btn.style.backgroundColor = '#32CD32';
  }else{
    mind[0].thinking = false;
    btn.textContent = 'Turn On Player 1';
    btn.style.backgroundColor = '#4682B4'; 
  }
})

//Players Configuration
const players = [{ 
  color: '#FF4500',
  pos: canvas.width/2 + (canvas.width/4)
},{
  color: '#1E90FF',
  pos: canvas.width/4
}];


//Initialize game state
const game = {
  req: '', //Will hold the ID of the animation frame request
  bullets:[],
  bulletSpeed: 10,
  isGameOver: false
};

//Object to track the state of the arrow keys
const keys = {
  ArrowLeft: false, 
  ArrowRight: false, 
  ArrowDown: false, 
  ArrowUp: false, 
  KeyA: false, 
  KeyS: false,  
  KeyW: false, 
  KeyD: false 
};

//Start Game Function
canvas.addEventListener('click',startGame);

function startGame(){
  cancelAnimationFrame(game.req);
  game.bullets = [];
  players.forEach((player,inde)=>{
    player.indexVal = inde;
    player.score = 0;
    player.cooldown = 100;
    player.speed = Math.ceil(grid/8);
    player.size = grid/2 + 5;
    player.y = canvas.height/2;
    player.x = canvas.width/2 + (inde === 0 ? grid *4 : -grid*4);
  })
  game.isGameOver = false;
  game.req = requestAnimationFrame(draw);
}


//Update key states
document.addEventListener('keydown',(e)=>{
  if (e.code in keys){  
    keys[e.code] = true; 
  }
  if (e.code === "Space" || e.key === " ") {
    e.preventDefault(); // Prevent the default scrolling behavior
    }

  if(e.code === 'Space' && players[0].cooldown <= 0){
    players[0].cooldown = 20;
    game.bullets.push({
      x: players[0].x - players[0].size - 15,
      y: players[0].y -5,
      speed: -game.bulletSpeed,
      size: 10,
      color: '#FFC0CB'
    })
  }

  if(e.code == 'KeyC' && players[1].cooldown <= 0){
    players[1].cooldown = 20;
    game.bullets.push({  
      x: players[1].x + players[1].size + 15,
      y: players[1].y -5,
      speed: game.bulletSpeed,
      size: 10,
      color: '#ADD8E6'
    })
  }

  
})

document.addEventListener('keyup',(e)=>{
  if (e.code in keys){
    keys[e.code] = false; 
  }
})

//Collision Detection
function colDec(a,b){
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.sqrt(dx * dx + dy * dy); //Euclidean distance
  return distance < a.size + b.size; //Compare distance to combined 
}

//Move Players Based on AI
function moveMind(mind,player){
  let adj1 = player.indexVal === 0 ? -1:1;
  let shootTime = Math.floor(Math.random()*5);

  if(shootTime == 1 && player.cooldown <= 0){
    player.cooldown = Math.floor(Math.random()*20)+9;
    game.bullets.push({  //having same variables as player object makes it easy to handle
      x: player.x + (player.size + 15) * adj1,
      y: player.y -5,
      speed: game.bulletSpeed * adj1,
      size: 10,
      color: 'lightblue'
    })

  }

  if(mind.count > 0){
    mind.count--;

  }else{
    let val = Math.floor(Math.random() * 20);
    let valX = Math.floor(Math.random() *7);
    let valY = Math.floor(Math.random() *2) + 3;
  
  if(valX == 1){
    mind.dirX = -1;
  }else if(valX == 2){
    mind.dirX = 1;
  }else{
    mind.dirX = 0;
  }

  mind.count = 30;

  let oppVal = player.indexVal === 0 ? 1:0;

  if(player.y +  val < players[oppVal].y){
    mind.dirY = valY;
  }else if(player.y + val > players[oppVal].y){
    mind.dirY = -valY;
  } 
  //incoming bullet check
  game.bullets.forEach((bull) =>{
    if(bull.speed < 0 && player.indexVal === 1){
      mind.count = 40;
      if(bull.y <= player.y){
        mind.dirY = -valY;
      }else{
        mind.dirY = valY;
      }
    }

    if(bull.speed > 0 && player.indexVal === 0){
      mind.count = 40;
      if(bull.y <= player.y){
        mind.dirY = -valY;
      }else{
        mind.dirY = valY;
      }
    }
  })

  }
  if(player.indexVal === 1){
    if (player.y <= player.size || player.y >= canvas.height - player.size){
      mind.dirY *= -1;
      mind.count = 0;
    }
    if (player.x <= player.size || player.x >= canvas.width/2 + player.size){
      mind.dirX *= -1;
    
    }
    
  }else{
    if (player.y <= player.size || player.y >= canvas.height - player.size){
      mind.dirY *= -1;
      mind.count = 0;
    }
    if (player.x <= player.size || player.x <= canvas.width/2 + player.size){
      mind.dirX *= -1;
    
    }
  }
 
 

  if(player.indexVal === 0){
    console.log(mind.dirX);
  }
  player.y += mind.dirY;
  player.x += mind.dirX;
}

//Player Movement
function movementPlayer(){
  if(mind[0].thinking){
    moveMind(mind[0],players[1]);  
  }

  if(mind[1].thinking){
    moveMind(mind[1],players[0]);  
  }

  if(keys['ArrowLeft'] && players[0].x > canvas.width/2 + players[0].size) 
    {players[0].x -= players[0].speed;} 
  if(keys['ArrowRight'] && players[0].x < canvas.width - players[0].size)
    {players[0].x += players[0].speed;} 
  if(keys['ArrowUp'] && players[0].y > players[0].size)
    {players[0].y -= players[0].speed;} 
  if(keys['ArrowDown'] && players[0].y < canvas.height - players[0].size) 
    {players[0].y += players[0].speed;} 
  if(keys['KeyA'] && players[1].x > players[1].size)
    {players[1].x -= players[1].speed;} 
  if(keys['KeyD'] && players[1].x < canvas.width/2 - players[1].size)
    {players[1].x += players[1].speed;} 
  if(keys['KeyW'] && players[1].y > players[1].size) 
    {players[1].y -= players[1].speed;} 
  if(keys['KeyS'] && players[1].y < canvas.height - players[1].size)
    {players[1].y += players[1].speed;} 
}

//Display Game Over Screen
function endGame(winner) {
  if(game.isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (winner === 0) {
    alert('Player 2 Wins!');
  } else if (winner === 1) {
    alert('Player 1 Wins!');
  }

  const restartBtn = document.createElement('button');
  restartBtn.textContent = 'Restart Game';
  restartBtn.style.padding = '15px 30px';
  restartBtn.style.fontSize = '20px';
  restartBtn.style.backgroundColor = 'green';
  restartBtn.style.color = 'white';
  restartBtn.style.marginTop = '20px';
  restartBtn.style.display = 'block';
  restartBtn.style.margin = '0 auto';

  
  document.body.appendChild(restartBtn);
  game.isGameOver = true;
  
  restartBtn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      restartBtn.remove();
      startGame();
  });
}


//Drawing Loop
function draw(){
  if (game.isGameOver) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  movementPlayer();

  //Draw bulltes
  for(let bullIndex =  game.bullets.length - 1; bullIndex >= 0; bullIndex--){
    const bull = game.bullets[bullIndex];
    ctx.fillStyle = bull.color;
    ctx.fillRect(bull.x + (bull.size/2),bull.y,bull.size,bull.size);
    bull.x += bull.speed; 

    if(bull.x < 0 || bull.x > canvas.width){
      //remove the bullet if it goes out of bounds
      game.bullets.splice(bullIndex,1);
      continue;
    }

    //check collision with players
    players.forEach((player,playerIndex)=>{
      if(colDec(bull,player)){
        if(playerIndex == 0){
          players[1].score++;
        }else{
          players[0].score++;
        }

        //Remove the bullet after collision
        game.bullets.splice(bullIndex,1);
      }

      //Check for game over
      if (player.score >= 25){
        endGame(playerIndex);
      }
    });

  }

  //Draw Players and Scores
  ctx.beginPath();
  ctx.moveTo(canvas.width/2,0);
  ctx.lineTo(canvas.width/2,canvas.height);
  ctx.stroke();


  players.forEach((player)=>{
    if(player.cooldown > 0){
      player.cooldown--;
    }
    ctx.fillStyle = player.color;
    ctx.font = grid + 'px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Score: ' + player.score,player.pos,grid * 1.5);
    ctx.beginPath();
    ctx.arc(player.x,player.y,player.size,0,Math.PI*2,true);
    ctx.fill();
  })
  
  
  game.req = requestAnimationFrame(draw);

}
