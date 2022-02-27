/*
	
	Stuff to handle ;-):
	1. Make the fields clickable (player0 uses "X", player1 "0")
	2. Keep track of all used fields (fieldsPlayed) and of the fields each player chose (fieldsPlayer0, fieldsPlayer1)
	3. Avoid that úsed fields can be played again and implement feedback like "Field already taken" (alert();)
	4. Check for winning combinations
	5. Implement feedback to the players (winning or game is a draw)
	6. End the game, avoid further playing
	7. Add a "Play again button"
	8. Implement "eternal" game statistics (using local storage!)
	9. Style the game as fancy and responsive as you can ;-)
	
	*/

// global game variables
var player, fields, fieldsPlayed, fieldsPlayer0, fieldsPlayer1, msg, playButton, playerOneScore, playerTwoScore, draw;

player = 0;

fields = [];
fields = document.getElementsByTagName('td');
console.log(fields);

fieldsPlayed = [];
fieldsPlayer0 = [];
fieldsPlayer1 = [];

playerOneScore = 0;
playerTwoScore = 0;
draw = 0;

localStorage.getItem('Player1LS');
localStorage.getItem('Player2LS');
localStorage.getItem('Draw');

if (localStorage.getItem('Player1LS') !== 0) {
	playerOneScore = Number(localStorage.getItem('Player1LS'));
}

if (localStorage.getItem('Player2LS') !== 0) {
	playerTwoScore = Number(localStorage.getItem('Player2LS'));
}

if (localStorage.getItem('Draw') !== 0) {
	draw = Number(localStorage.getItem('Draw'));
}

//displaying score on page
document.getElementById('player1').innerHTML = 'Player X: ' + Number(localStorage.getItem('Player1LS'));
document.getElementById('player2').innerHTML = 'Player O: ' + Number(localStorage.getItem('Player2LS'));
document.getElementById('draw').innerHTML = 'Draw: ' + Number(localStorage.getItem('Draw'));

msg = document.getElementById('msg');
playButton = document.getElementById('playAgain').addEventListener('click', playAgain);
clearButton = document.getElementById('clear').addEventListener('click', clearAll);

function clearAll() {
	//clearing all data from localStorage
	localStorage.clear();
	window.location.reload(true);
};

for (let i = 0; i < fields.length; i++) {
	fields[i].addEventListener('click', play)
}

function play() {
	// game core mechanics, marking the fields
	if (fieldsPlayed.includes(this.id)) {
		alert('No can do')
	}
	if (player === 0 && !fieldsPlayed.includes(this.id)) {
		this.innerHTML = 'X';
		fieldsPlayer0.push(parseInt(this.id));
		this.style.color = 'black';
		player = 1;
	} else if (player === 1 && !fieldsPlayed.includes(this.id)) {
		this.innerHTML = 'O';
		fieldsPlayer1.push(parseInt(this.id));
		this.style.color = 'white';
		player = 0;
	}
	fieldsPlayed.push(this.id);
	console.log(fieldsPlayed);
	win();
}

function win() {
	// analyzing field choices, winning conditions, feedback
	if (
		fieldsPlayer0.includes(1) && fieldsPlayer0.includes(2) && fieldsPlayer0.includes(3) ||
		fieldsPlayer0.includes(4) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(6) ||
		fieldsPlayer0.includes(7) && fieldsPlayer0.includes(8) && fieldsPlayer0.includes(9) ||
		fieldsPlayer0.includes(1) && fieldsPlayer0.includes(4) && fieldsPlayer0.includes(7) ||
		fieldsPlayer0.includes(2) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(8) ||
		fieldsPlayer0.includes(3) && fieldsPlayer0.includes(6) && fieldsPlayer0.includes(9) ||
		fieldsPlayer0.includes(1) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(9) ||
		fieldsPlayer0.includes(3) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(7)

	) {
		// player 0 won
		msg.innerHTML = 'Player X won!';
		msg.style.color = '#E6C3FF';
		playerOneScore++;
		gameOver();
		gameStats();
	} else if (
		fieldsPlayer1.includes(1) && fieldsPlayer1.includes(2) && fieldsPlayer1.includes(3) ||
		fieldsPlayer1.includes(4) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(6) ||
		fieldsPlayer1.includes(7) && fieldsPlayer1.includes(8) && fieldsPlayer1.includes(9) ||
		fieldsPlayer1.includes(1) && fieldsPlayer1.includes(4) && fieldsPlayer1.includes(7) ||
		fieldsPlayer1.includes(2) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(8) ||
		fieldsPlayer1.includes(3) && fieldsPlayer1.includes(6) && fieldsPlayer1.includes(9) ||
		fieldsPlayer1.includes(1) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(9) ||
		fieldsPlayer1.includes(3) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(7)
	) {
		// player 1 won
		msg.innerHTML = 'Player O won!';
		msg.style.color = '#E6C3FF';
		playerTwoScore++;
		gameOver();
		gameStats();
	} else if (fieldsPlayed.length == 9) {
		//game is a draw
		msg.innerHTML = 'It\'s a draw ';
		msg.style.color = '#E6C3FF';
		draw++;
		gameOver();
		gameStats();
	}
}

function gameOver() {
	// ending the game 
	for (let i = 0; i < fields.length; i++) {
		fields[i].removeEventListener('click', play)
	}
	
}

function playAgain() {
	// restart the game
	window.location.reload(true);
}

function gameStats() {
	//setting and getting score from localstorage
	localStorage.setItem('Player1LS', playerOneScore);
	localStorage.setItem('Player2LS', playerTwoScore);
	localStorage.setItem('Draw', draw);

	localStorage.Player1LS = Number(localStorage.Player1LS);
	localStorage.Player2LS = Number(localStorage.Player2LS);
	localStorage.Draw = Number(localStorage.Draw);

	document.getElementById('player1').innerHTML = 'Player X: ' + localStorage.Player1LS;
	document.getElementById('player2').innerHTML = 'Player O: ' + localStorage.Player2LS;
	document.getElementById('draw').innerHTML = 'Draw: ' + localStorage.Draw;
}

