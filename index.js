//DOM
const cardsInner = document.querySelectorAll(".inner");
const cardsBack = document.querySelectorAll(".back");
const score = document.querySelector(".score-cnt");
const strikes = document.querySelector(".strikes-cnt");

//ARGS
let gameOver = 15;
let counter = 0;
let turn = 2;
let cardEmoji = [];

const cardsArray = [
  "&#128525;",
  "&#128525;",
  "&#128561;",
  "&#128561;",
  "&#128564;",
  "&#128564;",
  "&#128520;",
  "&#128520;",
  "&#128545;",
  "&#128545;",
  "&#129313;",
  "&#129313;",
];

//FUNCTIONS

setCardsBack();
strikesCnt();
scoreCnt();

cardsInner.forEach((item) => {
  item.addEventListener("click", (event) => {
    turn--;
    console.log(turn);
    item.classList.add("flipped");
    cardEmoji.push(item);
    handleCards();
  });
});

function handleCards() {
  if (turn === 0) {
    turn = 2;
    setTimeout(() => {
      togglePointer();
      if (cardEmoji[0].children[1].innerHTML === cardEmoji[1].children[1].innerHTML) {
        counter += 1;
        scoreCnt();
        cardEmoji.forEach(card => {
        card.children[1].classList.add("foundCard");      
        card.classList.add("pointer-event");     
        });
        cardEmoji.splice(0, cardEmoji.length);
        return;
      } else {
        gameOver--;
        strikesCnt();
        isGameOver();
        for (let i = 0; i < cardEmoji.length; i++) {
          cardEmoji[i].classList.remove("flipped");
        }
        cardEmoji.splice(0, cardEmoji.length);
      }
    }, 500);
    togglePointer();
  };
}

function setCardsBack() {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  shuffle(arr);
  for (let i = 0; i < cardsArray.length; i++) {
    cardsBack[i].innerHTML = cardsArray[arr[i]];
  }
}

function shuffle(array) {
  let currentIndex = array.length - 1,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function scoreCnt() {
  score.innerHTML = "Score:" + counter;
}
function strikesCnt() {
  strikes.innerHTML = "Strikes:" + gameOver;
}

function isGameOver() {
  if (gameOver === 0) {
    alert("GAME OVER");
    location.reload();
  }
}

function restart(){
  location.reload();
}

function togglePointer(){
  for (const card of cardsInner) {
    card.classList.toggle("pointer-event");
  }
}