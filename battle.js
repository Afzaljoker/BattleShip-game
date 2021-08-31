// system part
var location1 = 3;
var location2 = 4;
var location3 = 5;
// user part
var guess; 
var hits = 0;
var guesses = 0;
var isSunk = false;

let view = {
    displayMessage : function (msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit : function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    },
    displayMiss : function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    }
}
const parseGuess = (guess) => {
     let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

     if (guess === null || guess.length !== 2) {
         alert('Oops, please enter a letter and a number on the board');
         } else {
             firstChar = guess.charAt(0);
             var row = alphabet.indexOf(firstChar);
             let column = guess.charAt(1);

             if (isNan (row) || isNan (column)) {
                 alert('Oops, thats isnt on the board.');
             }else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
                 alert('Oops, thats off the board!');
             } else {
                 return row + column;
             }
         }
         return null;
}

let controller = {
    guesses: 0,
    processGuess : function (guess) {
        let location = parseGuess(guess)
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage('You snak all my battleships, in' + this.guesses + ' guesses');
            }
        }
    }
}

let model = {
    boardSize : 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk : 0,
    ships : [{ locations : ['0','0','0'], hits : ['','',''],
              locations : ['0','0','0'], hits : ['','',''],
              locations : ['0','0','0'], hits : ['','',''] }],
    fire : function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage('Hit!');
                if (this.isSunk(ship)) {
                    view.displayMessage('you sank the my BattleShip!');
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('you missed.');
        return false;
    },
    isSunk : function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ships.hits[i] !== 'hit') {
                return false;
            }
            
        }
        return true;
    },
    generateShipLocations : function () {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            }while (this.collision(locations)) {
                this.ships[i].locations = locations;
            }
            
        }
    },
    generateShip : function () {
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        }else{
            row = Math.floor(Math.random() * ( this.boardSize - this.shipLength));
            col = math.floor(Math.random() * this.boardSize);
        }
        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1 ) {
                newShipLocations.push(row + '' + (col + i));
            } else{
                newShipLocations.push((row + i) + '' + col);
            }
            
        }
        return newShipLocations;
    },
    collision : function (locations) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = model.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
                
            }
            
        }
        return false;
    }
}

const init = () => {
    let fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;
    let guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}

const handleFireButton = () => {
    let guessInput =document.getElementById('guessInput');
    let guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = '';
}

window.onload = init;


// while (isSunk == false) {
//     guess = prompt('Get ready to aim! (Enter number 0-6):');
//     if (guess < 0 || guess > 6) {
//         alert('please enter a valid numebr from 0-6')
//     } else {
//         guesses = guesses + 1;

//         if (guess == location1 || guess == location2 || guess == location3) {
//             hits = hits+1;
//             alert ('hit');
//             if (hits == 3) {
//                 isSunk = true;
//                 alert('you sank my ship!');
//                 }// end of if hits 
//         }else {                 // end of if location
//                 alert ('miss');    
//             }
//     }//end if loop guess
// }//end while loop
// document.write('u have won the game using ' + guesses + '  guesses! ' + '<br>' )
// var stats = 'you took' + guesses + 'to sink the battlesip' + 'which means u have shoot: ' +
// (3/guesses)  ;
// alert(stats );
// var hits2 = 0;
// hits2 = hits2 + 1;
// document.write(hits2);
