$(document).ready(function() {
	$("#nextPage").click(function() {
		 nextQuestion();
	});	
	$("#cry").click(function() {
		reset();
	});
	$("img").click(function() {
		window.location.href = './';
	});
	$('#question').ready(function(){
		refreshQuestion();
	});
});

function nextQuestion() {

	console.log('update');
	
	$.post('/php/updateTurn.php', function(data) {
		console.log(data);
		refreshQuestion();
	});
}

function reset() {

	$.post('/php/ResetTurn.php', function() {
		console.log("turn reset");
		refreshQuestion();
	});
}

function refreshQuestion() {

	$.post('/php/FetchQuestion.php', function(data) {
		console.log('fetch');
		$('#question').html(data);
		console.log(data);
	});

}
