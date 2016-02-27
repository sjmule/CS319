var interval;
var x = 0;
var y = 400;
var direction = 1;

function run()
{
	var element = document.getElementById("run");
	if (element.value == "Start")
	{
		element.value = "Stop";
		interval = setInterval(function(){draw()}, 50);
	}
	else if (element.value == "Stop")
	{
		element.value = "Start";
		clearInterval(interval);
	}
}

function turnLeft()
{
	direction = direction + (4 - 1);
	direction %= 4;
}

function turnRight()
{
	direction += 1;
	direction %= 4;
}

function draw()
{
	var canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.lineWidth = 10;
	context.strokeStyle = '#ff0000';
	if (direction == 0)
	{
		context.moveTo(x, y);
		y -= 1;
		context.lineTo(x, y);
		context.stroke();
	}
	else if (direction == 1)
	{
		context.moveTo(x, y);
		x += 1;
		context.lineTo(x, y);
		context.stroke();
	}
	else if (direction == 2)
	{
		context.moveTo(x, y);
		y += 1;
		context.lineTo(x, y);
		context.stroke();
	}
	else if (direction == 3)
	{
		context.moveTo(x, y);
		x -= 1;
		context.lineTo(x, y);
		context.stroke();
	}
}