// Game constant and Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
	{x: 13, y: 15}
]
food = {x: 6, y: 7};	
let score  = 0;

// Game functions
function main(ctime){
	window.requestAnimationFrame(main);
	// console.log(ctime);
	if((ctime - lastPaintTime)/1000 < 1/speed){
		return;
	}
	lastPaintTime = ctime;
	gameEngine();
	// console.log(ctime);
}

function isCollide(snake){
	// return false;
	//if snake bump into itself
	for( let i = 1; i < snakeArr.length; i++){
		// const element = array[index];
		if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
			return true;
		}
	}
	if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
		return true;
	}
}

function gameEngine(){
	//Part 1 : Updating the snake array
	if(isCollide(snakeArr)){
		gameOverSound.play();
		musicSound.pause();
		inputDir = { x: 0, y: 0};
		alert("Press any key to play the again");
		snakeArr = [{x: 13, y: 15}];
		musicSound.play();
		score = 0;
	}

	//If you have eaten the food increase the score and regenerate the food
	if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
		foodSound.play();
		score += 1;
		if(score>hiscoreval){
			hiscoreval = score;
			localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
			hiscoreBox.innerHTML = "HiScore : " + hiscoreval; 
		}
		scoreBox.innerHTML = "Score : "+score;
		snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
		let a = 2;
		let b = 16;
		food = {x: Math.round(a + (b - a)* Math.random()), y: Math.round(a + (b - a)* Math.random())}
	}

	//Moving the snake
	for(let i = snakeArr.length-2; i >= 0; i--){
		// const element = array[i];
		snakeArr[i+1] = {...snakeArr[i]};
	}
	snakeArr[0].x += inputDir.x;
	snakeArr[0].y += inputDir.y;

	//Part 2 : Render the Snake and Food
	// Display the snake
	board.innerHTML = "";
	snakeArr.forEach((e, index)=>{
		snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;
		snakeElement.classList.add('snake');
		if(index === 0){
			snakeElement.classList.add('head');
		}else{
			snakeElement.classList.add('snake');
		}
		board.appendChild(snakeElement);
	});

	//Display the food
	foodElement = document.createElement('div');
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add('food');
	board.appendChild(foodElement);

}


//Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
	hiscoreval = 0;
	localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}else{
	hiscoreval = JSON.parse(hiscore);
	hiscoreBox.innerHTML = "HiScore : "+ hiscore; 
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
	inputDir = {x: 0, y: 1}  //start the game
	moveSound.play();
	switch(e.key){
		case "ArrowUp":
			inputDir.x = 0;
			inputDir.y = -1;
			break;
		case "ArrowDown":
			inputDir.x = 0;
			inputDir.y = 1;
			break;
		case "ArrowLeft":
			inputDir.x = -1;
			inputDir.y = 0;
			break;
		case "ArrowRight":
			inputDir.x = 1;
			inputDir.y = 0;
			break;
		default:
			break;
	}
});
