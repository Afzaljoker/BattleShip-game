// system part
var location1 = 3;
var location2 = 4;
var location3 = 5;
// user part
var guess; 
var hits = 0;
var guesses = 0;

var isSunk = false;

// checking the ship is sunk or not


while (isSunk == false) {
    guess = prompt('Get ready to aim! (Enter number 0-6):');
    if (guess < 0 || guess > 6) {
        alert('please enter a valid numebr from 0-6')
    } else {
        guesses = guesses + 1;

        if (guess == location1 || guess == location2 || guess == location3) {
            hits = hits+1;
            alert ('hit');
            if (hits == 3) {
                isSunk = true;
                alert('you sank my ship!');
                }// end of if hits 
        }else {                 // end of if location
                alert ('miss');    
            }
    }//end if loop guess
}//end while loop
document.write('u have won the game using ' + guesses + '  guesses! ' + '<br>' )
var stats = 'you took' + guesses + 'to sink the battlesip' + 'which means u have shoot: ' +
(3/guesses)  ;
alert(stats );
var hits2 = 0;
hits2 = hits2 + 1;
document.write(hits2);
