const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 7;

playerLivesCount.textContent = playerLives;

const getData = () => [
  { imgSrc: "./images/chucky.jpeg", name: "chucky" },
  { imgSrc: "./images/freddy_krueger.jpeg", name: "freddy krueger" },
  { imgSrc: "./images/jason.jpeg", name: "jason" },
  { imgSrc: "./images/jigsaw.jpeg", name: "jigsaw" },
  { imgSrc: "./images/michael_myers.jpeg", name: "michael myers" },
  { imgSrc: "./images/pennywise.jpeg", name: "pennywise" },
  { imgSrc: "./images/ring.jpeg", name: "ring" },
  { imgSrc: "./images/scream.jpeg", name: "scream" },
  { imgSrc: "./images/chucky.jpeg", name: "chucky" },
  { imgSrc: "./images/freddy_krueger.jpeg", name: "freddy krueger" },
  { imgSrc: "./images/jason.jpeg", name: "jason" },
  { imgSrc: "./images/jigsaw.jpeg", name: "jigsaw" },
  { imgSrc: "./images/michael_myers.jpeg", name: "michael myers" },
  { imgSrc: "./images/pennywise.jpeg", name: "pennywise" },
  { imgSrc: "./images/ring.jpeg", name: "ring" },
  { imgSrc: "./images/scream.jpeg", name: "scream" },
];

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const cardGenerator = () => {
  const cardData = randomize();

  const cards = document.querySelectorAll(".card");
  cardData.forEach((item, index) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  console.log(flippedCards);

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("You did not survive!!!⚰️");
      }
    }
  }

  if (toggleCard.length === 16) {
    restart("You Survived!!! 🍬");
  }
};

const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");

    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 7;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};
cardGenerator();
