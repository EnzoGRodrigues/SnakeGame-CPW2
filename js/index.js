// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('assets/food.mp3');
const gameOverSound = new Audio('assets/gameover.mp3');
const moveSound = new Audio('assets/move.mp3');
const musicSound = new Audio('assets/music.mp3');

let obstacle = {x: 8, y: 10}; // posição do obstáculo
let speed = 12; // velocidade da cobra
let score = 0; // pontuação
let lastPaintTime = 0; //
let snakeArr = [ // posição inicial da cobra
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// ============= Funções =============
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){ // velocidade da cobra
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}




// ============= Funções de colisão =============
function isCollide(snake) {
    // Se você esbarrar em si mesmo
    for (let i = 1; i < snakeArr.length; i++) { // posição inicial da cobra
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){ 
            return true;
        }
    }
    // Se você esbarrar na parede
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){ 
        return true;
    }
    // Se você esbarrar no obstáculo
    if(snake[0].x === obstacle.x && snake[0].y === obstacle.y){
        return true;
    }
        
    return false;
}



// ============= Funções do jogo =============
function gameEngine(){ 
    // Atualizando a matriz de cobras e alimentos
    if(isCollide(snakeArr)){ // Se a colisão for verdadeira, então o jogo acabou
        gameOverSound.play();
        //musicSound.pause();
        inputDir =  {x: 0, y: 0};  
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        //musicSound.play();
        score = 0; 
    }

    // Se você comeu a comida, aumente a pontuação e regenere a comida
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){ // Atualizando o recorde
            hiscoreval = score; 
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Recorde: " + hiscoreval;
        }
        scoreBox.innerHTML = "Pontuação: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        
        if (Math.random() < 0.2) {
            obstacle.x = Math.round(2 + 14 * Math.random());
            obstacle.y = Math.round(2 + 14 * Math.random());
        }
    }

    // Movendo a cobra
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Exibir a cobra, a comida e o obstáculo
    // Display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    // Display obstacle
    obstacleElement = document.createElement('div');
    obstacleElement.style.gridRowStart = obstacle.y;
    obstacleElement.style.gridColumnStart = obstacle.x;
    obstacleElement.classList.add('obstacle');
    board.appendChild(obstacleElement);
}



// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Recorde: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Começo do jogo
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});