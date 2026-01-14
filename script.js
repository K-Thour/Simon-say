const buttons = [
  {
    id: "red",
  },
  {
    id: "blue",
  },
  {
    id: "green",
  },
  {
    id: "yellow",
  },
];

const outerDiv = document.querySelector(".outer-div");
const systemaSequence = [];
const userSequence = [];
let level = 0;
let started = false;

const gameStart = () => {
  if (started) {
    return;
  }
  const p = document.querySelector("p");
  p.innerText = "Game Started!";
  setTimeout(leverUp,500);
  started = true;
};

const leverUp = () => {
  level++;
  const paragraph = document.querySelector("p");
  paragraph.innerText = "Level " + level;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenButton = buttons[randomNumber].id;
  systemaSequence.push(randomChosenButton);
  animatePress(randomChosenButton);
};

const buttonPress = (button) => {
  if (!started) {
    const p = document.querySelector("p");
    p.innerText = "Please Press Any Key to Start";
    return;
  }
  const userChosenColor = button.id;
  userSequence.push(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userSequence.length - 1);
};

const animatePress = (currentColor) => {
  const activeButton = document.getElementById(currentColor);
  activeButton.classList.add("pressed");
  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 100);
};

const resetGame = () => {
    const p = document.querySelector("p");
    const body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(() => {
      body.style.backgroundColor = "";
    }, 200);
    p.innerText = "Game Over, Press Any Key to Restart. your level was " + level;
    started = false;
    level = 0;
    systemaSequence.length = 0;
    userSequence.length = 0;
}

const checkAnswer = (currentLevel) => {
  if (systemaSequence[currentLevel] === userSequence[currentLevel]) {
    if (userSequence.length === systemaSequence.length) {
      const p = document.querySelector("p");
      p.innerText = "Well Done!";
      const body = document.querySelector("body");
      body.style.backgroundColor = "green";
      setTimeout(() => {
        body.style.backgroundColor = "";
        leverUp();
      }, 1000);
      userSequence.length = 0;
    }
  } else {
    resetGame();
  }
};

buttons.forEach((button) => {
  const btn = document.createElement("div");
  btn.id = button.id;
  btn.classList.add("inner-div");
  btn.addEventListener("click", () => buttonPress(button));
  outerDiv.appendChild(btn);
});

document.addEventListener("keypress", gameStart);