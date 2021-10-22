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
var player, fields, fieldsPlayed, fieldsPlayer0, fieldsPlayer1, msg, playButton, result;

player = 0;

fields = [];
fields = document.getElementsByTagName('td');
console.log(fields);

fieldsPlayed = [];

fieldsPlayer0 = [];
fieldsPlayer1 = [];

result = document.querySelector('.result');

msg = document.getElementById('msg');
playButton = document.getElementById('playAgain').addEventListener('click', playAgain);

for (let i = 0; i < fields.length; i++) {
	fields[i].addEventListener('click', play)
}

function play() {
	// game core mechanics, marking the fields
	//console.log('you called me?')
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
		msg.innerHTML = 'Player X won!'
		gameOver();
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
		msg.innerHTML = 'Player O won!'
		gameOver();
	} else if (fieldsPlayed.length == 9) {
		//game is a draw
		msg.innerHTML = 'It\'s a draw '
		gameOver();
	}
}

function gameOver() {
	// ending the game 
	for (let i = 0; i < fields.length; i++) {
		fields[i].removeEventListener('click', play)
	}
	alert('game over');
}

function playAgain() {
	// restart the game

	window.location.reload(true);
}

// const scoreResult1 = document.getElementById('player1')
// const scoreResult2 = document.getElementById('player2')
// let player1 = 0;
// let player2 = 0;
// let player1Score = localStorage.getItem('player1') || 0;
// let player2Score = localStorage.getItem('player2') || 0;
// scoreResult1.textContent = 'Player 1: ' + player1Score;
// scoreResult2.textContent = 'Player 2: ' + player2Score;

function gameStats() {

	//game stats using local storage
	if (localStorage.setItem('player 1: ') || 0) {
		let player1 = localStorage.getItem('Player 1: ');
		player1++
		console.log(player1);

	} else if (localStorage.setItem('player1') || 0) {
		let player2 = localStorage.getItem('Player 2: ');
		player2++;
		console.log(player2);

	} else if (fieldsPlayed.length == 9) {
		localStorage.setItem('Draw: ', 0);
		let draw = localStorage('Draw: ')
		draw++;
		console.log(draw);
	}

}

// function gameStats() {
// 	if(typeof(Storage) !== "undefined") {
// 	  if (localStorage.score) {
// 		localStorage.setItem.score = Number(localStorage.score)+1;
// 	  } else {
// 		localStorage.score = 1;
// 	  }
// 	  document.querySelector(".result").innerHTML = "Player 1: " + localStorage.getItem.score;
// 	} else {
// 	  document.querySelector(".result").innerHTML = "Sorry, your browser does not support web storage...";
// 	}
//   }