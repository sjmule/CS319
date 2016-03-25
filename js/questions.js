$(document).ready(function() {
	window.setInterval(function() {
		nextQuestion();
	}, 5000);
});


function nextQuestion() {
	$.get("/php/questions.php", function(data) {
		if(data.update)
			$("#question").text(data.question);
		else
			console.log(data.data);
	}, "json");
}
