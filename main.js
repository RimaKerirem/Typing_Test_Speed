let levels = document.querySelectorAll("aside ul li a");
let titleDiv = document.querySelector("section .title");

let textDiv = document.querySelector("section .text");
let startbutton = document.querySelector("section .text .start");
let levelSpan = document.querySelector("section .text h1 .level");
let secondsSpan = document.querySelector("section .text h1 .seconds");

let gameDiv = document.querySelector("section .game");
let input = document.querySelector("section .game input");
let wordBox = document.querySelector("section .game .word-box");
let wordsDiv = document.querySelector("section .game .words");
let level;

let timeLeft = document.querySelector("section .calculate .seconds-box .time");
let score = document.querySelector("section .calculate .score-box .score");
let globalScore = document.querySelector(
  "section .calculate .score-box .global-score"
);

let msgDiv = document.querySelector("section .msg");

// Define seconds for each level
let lvls = {
  Easy: 6,
  Normal: 5,
  Hard: 4,
};

// Choose a level from ul liste
levels.forEach((elt) => {
  elt.addEventListener("click", function () {
    level = this.dataset.level;

    titleDiv.style.display = "none";
    gameDiv.style.display = "none";
    msgDiv.innerHTML = "";
    textDiv.style.display = "block";

    levelSpan.innerHTML = `[ ${level} ]`;
    secondsSpan.innerHTML = `[ ${lvls[level]} ]`;
  });
});

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Function to start the game
startbutton.onclick = function () {
  textDiv.style.display = "none";
  titleDiv.style.display = "none";
  gameDiv.style.display = "block";

  input.focus();

  if (level === "Easy") {
    easy();
  } else if (level === "Normal") {
    normal();
  } else {
    hard();
  }
};

// Function for easy level
function easy() {
  let easyWords = [
    "PHP",
    "HTML",
    "CSS",
    "Java",
    "C++",
    "React",
    "VueJS",
    "MySQL",
    "SQL",
    "Word",
    "Excel",
    "UML",
    "Web",
    "Flask",
    "Access",
    "Server",
    "Linux",
    "MacOS",
  ];

  timeLeft.innerHTML = lvls[level];
  globalScore.innerHTML = easyWords.length;
  score.innerHTML = "0";

  // Call generate word function
  generateWord(easyWords);
}

// Function for normal level
function normal() {
  let normalWords = [
    "Oracle",
    "Angular",
    "Python",
    "PowerPoint",
    "PL/SQL",
    "Delphi",
    "Android",
    "Django",
    "Bootstrap",
    "Windows",
    "Apache",
    "Google",
    "Youtube",
    "Facebook",
    "Twitter",
    "Snapchat",
  ];

  timeLeft.innerHTML = lvls[level];
  globalScore.innerHTML = normalWords.length;
  score.innerHTML = "0";

  // Call generate word function
  generateWord(normalWords);
}

// Function for hard level
function hard() {
  let hardWords = [
    "Programming",
    "Developers",
    "Front-End",
    "Conception",
    "Back-End",
    "Full-Stack",
    "PHPMyAdmin",
    "Javascript",
    "SQL Server",
    "FireFox Mozilla",
    "Instagram",
    "SQL Developer",
    "Visual Studio Code",
    "Business Intelligence",
  ];

  timeLeft.innerHTML = lvls[level];
  globalScore.innerHTML = hardWords.length;
  score.innerHTML = "0";

  generateWord(hardWords);
}

// Function to generate word
function generateWord(arr) {
  // Get th e word
  let generateWord = arr[Math.floor(Math.random() * arr.length)];

  // Add the generating word to word-box
  wordBox.innerHTML = generateWord;

  // Get th index of the word
  let index = arr.indexOf(generateWord);

  // Remove the generating word
  arr.splice(index, 1);

  // Empty the Words div
  wordsDiv.innerHTML = "";

  // Add the rest of the words in wordsDiv
  arr.forEach((elt) => {
    let spanWord = document.createElement("span");
    spanWord.className = "word";
    spanWord.appendChild(document.createTextNode(elt));
    wordsDiv.appendChild(spanWord);
  });

  startPlaying(arr);
}

function startPlaying(arr) {
  timeLeft.innerHTML = lvls[level];
  let start = setInterval(() => {
    timeLeft.innerHTML--;

    if (timeLeft.innerHTML == "0") {
      clearInterval(start);

      if (input.value.toLowerCase() === wordBox.innerHTML.toLowerCase()) {
        input.value = "";
        score.innerHTML++;
        if (arr.length > 0) {
          generateWord(arr);
        } else {
          gameDiv.style.display = "none";
          let msg = document.createElement("span");
          msg.className = "good";
          msg.appendChild(document.createTextNode("Congratulation"));
          msgDiv.appendChild(msg);
        }
      } else {
        input.value = "";
        gameDiv.style.display = "none";
        let msg = document.createElement("span");
        msg.className = "bad";
        msg.appendChild(document.createTextNode("Ooops, Time Is Up"));
        msgDiv.appendChild(msg);
      }
    }
  }, 1000);
}
