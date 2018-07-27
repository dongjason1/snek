let canvas;
let ctx;
let rc;

let width = 30;
let height = 20;
let blockLength = 20;
let delay = 75;

let headX, headY, tailX, tailY, vx, vy, fx, fy,gameOver;

function initCanvas() {
	canvas = document.getElementById('canvas');
	canvas.width = (width+3)*blockLength-2;
	canvas.height= (height+3)*blockLength-2;

	ctx = canvas.getContext('2d');
	rc = rough.canvas(canvas);

	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keypress', onKeyPress);

	initVariables();
	
	setInterval(draw, delay);
}

function draw() {
	clear();
	if(tailX.length>0){
		tailX.push(headX);
		tailY.push(headY);
		tailX.shift();
		tailY.shift();
	}
	headX+=vx;
	headY-=vy;

	//draw snake
	Square(headX,headY,"#ffa8f7").draw();
	for(let i = 0; i<tailX.length;i++){
		Square(tailX[i],tailY[i],"#f9c9ff").draw();
	}
	//draw apple
	Square(fx,fy,"#a8edc3").draw();
	if(headX===fx && headY===fy) {
		tailX.push(headX);
		tailY.push(headY);
		fx = Math.floor(Math.random()*width);
		fy = Math.floor(Math.random()*height);
	}
	if(headX<0||headX>width||headY<0||headY>height){
		lose();
	}
	if (gameOver) {
      	ctx.fillStyle = "#000000";
		ctx.font = 48+'px Gaegu';
  		ctx.fillText('Game over', (width-7)*blockLength/2, height*blockLength/2);
  		ctx.fillStyle = "#afafaf";
  		ctx.font = 28+'px Gaegu';
  		ctx.fillText('Hit enter to play again',(width-10)*blockLength/2, (height+8)*blockLength/2);
	}
	
}

function lose() {
	clear();
	tailX=tailY=[];
	headX=headY=-1;
	vx=vy=0;
	fx=fy=-1;
	gameOver = true;
}

function Square(x, y, color) {
	let l = blockLength;
	this.x = x*(l+2);
	this.y = y*(l+2);
	this.length = l;
	this.color = color;
	this.draw = function() {
		rc.rectangle(this.x,this.y,this.length,this.length,{fill:this.color});
	}
	return this;
}

function clear() {
	ctx.fillStyle = 'rgba(255, 255, 255, 1)';
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

function onKeyPress(e) {
	var key = e.which;
	switch (key){
		case 13:
			initVariables();
			break;
	}
}

function onKeyDown(e) {
	var key = e.which;
	switch (key){
		case 87:
		case 38: //up
			if(vy===-1)
				break;
			vx = 0;
			vy = 1;
			break;
		case 68:
		case 39: //right
			if(vx===-1)
				break;
			vx = 1;
			vy = 0;
			break;
		case 65:
		case 37: //left
			if(vx===1)
				break;
			vx = -1;
			vy = 0;
			break;
		case 83:
		case 40: //down
			if(vy===1)
				break;
			vx = 0;
			vy = -1;
			break;
	}
}

function initVariables(){
	headX = Math.floor(Math.random()*width);
	headY = Math.floor(Math.random()*height);
	tailX = [];
	tailY = [];
	vx = 0;
	vy = 0;

	fx = Math.floor(Math.random()*width);
	fy = Math.floor(Math.random()*height);

	gameOver=false;
}