const yellow = 'rgb(211, 232, 53)'; // saves the rgb code for a bright yellow into a variable to make the code easier to read
const blue = 'rgb(66, 144, 245)'; // same thing but for a bright blue
const white = 'rgb(255, 255, 255)'; // same thing but for white

let count; // anounces a variable that keeps track of which square is supposed to be clicked next
let key; // anounces a variable that will have a set timeout function, it is made global so that I can clear it in other functions
let shultSquares = document.getElementsByClassName('Shult-Num'); // gets all the squares in the shult table and saves each of them as a object inside an array
function load(){ // a function that is triggered by an onclick, it loads the shult table on the page 
    document.querySelector('div').style.display = 'table'; // changes the shult table display property from none to table which makes it appear and and makes it behave like a table element
    // A section of code that randomly colours all the squares in the shult table in 3 colours using a loop and math.random()  
    let colorPicker; 
    for (let i = 0;i < shultSquares.length; i++){
        colorPicker = Math.floor(Math.random() * 3);
    if(colorPicker === 1){
        shultSquares[i].style.backgroundColor = yellow;
    }else if(colorPicker === 2){
            shultSquares[i].style.backgroundColor = blue;
        }
        else{shultSquares[i].style.backgroundColor = white;}
    } 
    // section end
    // a section of code that sets the numbers in the shult square using loops and arrays
   let randomArrayOfNumbers = [];
    for (let i = 1; i < 26; i++) {
        randomArrayOfNumbers[i] = i;
    }
    randomArrayOfNumbers= randomArrayOfNumbers.sort(() => Math.random() - 0.5);

    for (let index = 0; index < shultSquares.length; index++) {
   shultSquares[index].innerText = randomArrayOfNumbers[index];
 
}
 // section end
count = 1; // sets the count back to the start
timer(); //calls the timer function which sets a timer
}
    
function chooseSquare(color){ // a function that is triggered by a certain key by onkeydown() depending on the key pressed color will be either yellow,white or blue. This function is used to play the game
    // section of code that finds the square which holds the number that should be selected next and saves the squares id into variable matcher
    let matcher;
    for (let i = 0; i < 25;i++) {
       if (Number(shultSquares[i].innerText) === count)
       {matcher = i}
      
    }
    // section end

    if (shultSquares[matcher].style.backgroundColor === color){ // checks if the color that the user selected is the actual color of the square needing to be pressed if so various things explained below will happen
        count = count + 1; // adds 1 to variable count allowing the program to know that another square should be selected next
    shultSquares[matcher].style.backgroundColor = 'grey'; // changes the color of the selected square to grey to indict that the user chose the right color should start looking for the next number
   setTimeout(function(){shultSquares[matcher].style.backgroundColor = color;}, 500); // turns the square back to its normal color after 0.5 milliseconds
    }

    if (count === 25) { // checks if all 25 squares have been selected
        alert('You Finished'); // alerts the user that they finised the game
    clearTimeout(key);  //clears the timer                                                                                                                                                             
    alert(`It took you ${min} minutes and ${sec} seconds to pass!`); // alerts the user how long they took
    // section of code used to register the time of the user to a hidden form
    let hs = `${min} minutes and ${sec} seconds`;
    let rn = min * 60 + sec;
    document.getElementById('hs').value = hs;
    document.getElementById('rn').value = rn;
    // section end
    resetTimer(); // resets the timer and some variables
    document.querySelector('div').style.display = 'none'; // hides the shult table
    count = 1; // resets the count
    }
    
    
   }



let min = 0; // a variable used to represent the amount of minutes 
let sec = 0; // a variable used to represent the amount of seconds

function timer() {
    sec = parseInt(sec); // converts string to number
    min = parseInt(min); // converts string to number


    sec = sec + 1; //adds 1 to the sec variable indicating that one second passes

    if (sec == 60) { // if the amount of seconds is 60 add 1 to minutees and make seconds 0 again
      min = min + 1;
      sec = 0;
    }

    if (min == 60) { // when 1 hour passes it resets the game 
    load();
    resetTimer();
    }

    if (sec < 10 || sec === 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min === 0) {
      min = '0' + min;
    }
   
    key = setTimeout(timer, 1000); // repeats this function every second
  
}

function resetTimer() { // makes the two variables values to zero
    sec = 0;
    min = 0;
}


// Receives the key number of the key pressed on the keyboard and activates various functions depending whether it's f,g,h
document.onkeydown = function(e){
    e = e || window.event;
    var key = e.keyCode || e.which;
    if(key===71){
        chooseSquare(yellow); // passes the  color yellow as an arguement for choosesquare() if the key is g
    }
     if(key===70){
        chooseSquare(white); // passes the  color white as an arguement for choosesquare() if the key is f
    }
    if(key===72){
        chooseSquare(blue); // passes the  color blue as an arguement for choosesquare() if the key is h
    }
};