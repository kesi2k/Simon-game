var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

var comp_moves = [];
var human_moves = [];
var moves = 0;
var error_count = 0;
var strict_state = false;

//Takes element from comp_array and plays 
function run_simon(element) {

  switch (element) {
    case 0:
      greenSound.play();
      $("#green").addClass("green_light").delay(1000).queue(function() {
        $("#green").removeClass("green_light").dequeue();
      });
      break;

    case 1:
      redSound.play();
      $("#red").addClass("red_light").delay(1000).queue(function() {
        $("#red").removeClass("red_light").dequeue();
      });
      break;

    case 2:
      yellowSound.play();
      $("#yellow").addClass("yellow_light").delay(1000).queue(function() {
        $("#yellow").removeClass("yellow_light").dequeue();
      });
      break;

    case 3:
      blueSound.play();
      $("#blue").addClass("blue_light").delay(1000).queue(function() {
        $("#blue").removeClass("blue_light").dequeue();
      });
      break;

  }

}

function user_input() {

  var color = this.id;

  if (color == "green") {
    human_moves.push(0);
  } else if (color == "red") {
    human_moves.push(1);
  } else if (color == "yellow") {
    human_moves.push(2)
  } else if (color == "blue") {
    human_moves.push(3)
  } else { // Not clicking on a color block
    return
  }
  run_simon(human_moves[human_moves.length - 1]);
  console.log(human_moves);

  if (comp_moves.length > 0) {
    check_moves()
  }

}

// Takes in two arrays comp_moves and human_moves on each click and checks the arrays up to length of human input. When arrays are of equal length and therefore sequences were correct, run comp_play()

function check_moves() {
  console.log("comp: ", comp_moves);
  console.log("human: ", human_moves);

  //TODO: Still need to add the changing of the display message 
  for (var i = 0; i < human_moves.length; i++) {
    if (comp_moves[i] != human_moves[i]) {
      
      error_count = error_count + 1;
      alert("Wrong! Move " + i + " should be " + comp_moves[i] + " not " + human_moves[i] + " errors: " + error_count);
      if (strict_state == true) {
        reset();
        break;
      }
      human_moves = [];
      load_simon(comp_moves);
    } else if (comp_moves.length == human_moves.length  && comp_moves[comp_moves.length - 1] == human_moves[human_moves.length - 1]) {
      human_moves = [];
      console.log("Good Job!");
      setTimeout(comp_play, 2000);
    }

  }
}

// Takes array and iterates to pass moves to run_simon delaying one sec between iterations
function load_simon(arr) {

  var i = 0;

  function play_next_move() {
    run_simon(arr[i])
    i++
    if (i < arr.length) {
      setTimeout(play_next_move, 1000);
    }
  }
  play_next_move();

}

//generates random numbers and places these random numbers in an array to pass to load_simon

function comp_play() {
  if (comp_moves.length == 21) {
    alert("Congratulations, you have won!")
    reset();
  }

  console.log("Generating another move");
  moves = moves + 1;
  document.getElementById("display").innerHTML = moves;
  var num = Math.floor(Math.random() * 4);
  comp_moves.push(num);
  load_simon(comp_moves);

}

function reset() {
  comp_moves = [];
  human_moves = [];
  moves = 0;
  error_count = 0;
  document.getElementById("display").innerHTML = "0";
}

function strict() {
  $("#strict_light").toggleClass("red_light");
  strict_state = !strict_state
  console.log("strict state: ", strict_state)
}

$("#strict").on("click", function() {
  strict();
});

$("#reset").on("click", function() {
  reset();
});

$("#start").on("click", function() {
  reset();
  comp_play();
});

$("#green, #red, #yellow, #blue").on("click", user_input);