"use strict";

//returning the first element
const duckContainer = document.querySelector("section");
const resultsButton = document.querySelector("section + div");

const image1 = document.querySelector("section img:first-child");
const image2 = document.querySelector("section img:nth-child(2)");
const image3 = document.querySelector("section img:nth-child(3)");

let allDucks = [];

let clicks = 0;
const maxClicksAllowed = 5;

function getRandomNumber() {
  return Math.floor(Math.random() * allDucks.length);
}

function Duck(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  allDucks.push(this);
}

// number generator
function renderDucks() {
  let duck1 = getRandomNumber();
  let duck2 = getRandomNumber();
  let duck3 = getRandomNumber();

  while (duck1 === duck2 || duck1 === duck3 || duck2 === duck3) {
    duck1 = getRandomNumber();
    duck2 = getRandomNumber();
    duck3 = getRandomNumber();
  }

  image1.src = allDucks[duck1].src;
  console.log(image1.src);
  image2.src = allDucks[duck2].src;
  image3.src = allDucks[duck3].src;
  image1.alt = allDucks[duck1].name;
  image2.alt = allDucks[duck2].name;
  image3.alt = allDucks[duck3].name;
  allDucks[duck1].views++;
  allDucks[duck2].views++;
  allDucks[duck3].views++;
}

function handleDuckClick(event) {
  if (event.target === duckContainer) {
    alert("Please click an image");
  } else {
    clicks++;
    let clickedDuck = event.target.alt;
    for (let i = 0; i < allDucks.length; i++) {
      if (clickedDuck === allDucks[i].name) {
        allDucks[i].clicks++;
        break;
      }
    }
    if (clicks === maxClicksAllowed) {
      duckContainer.removeEventListener("click", handleDuckClick);
      duckContainer.className = "no-voting";
      resultsButton.addEventListener("click", renderResults);
      resultsButton.addEventListener("click", renderChart);
      alert("click on results button to view results");
    } else {
      renderDucks();
    }
  }
}

function renderResults() {
  let ul = document.querySelector("ul");
  for (let i = 0; i < allDucks.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${allDucks[i].name} had ${allDucks[i].views} views and was clicked ${allDucks[i].clicks} times.`;
    ul.appendChild(li);
    resultsButton.removeEventListener("click", renderResults);
  }
}

duckContainer.addEventListener("click", handleDuckClick);

function renderChart() {
  const duckNames = [];
  const duckViews = [];
  const duckClicks = [];

  for (let i = 0; i < allDucks.length; i++) {
    duckNames.push(allDucks[i].name);
    duckViews.push(allDucks[i].views);
    duckClicks.push(allDucks[i].clicks);
  }

  const data = {
    labels: duckNames,
    datasets: [
      {
        label: "clicks",
        data: duckClicks,
        backgroundColor: ["#00BEFF"],
        borderColor: ["#0C30F3"],
        borderWidth: 1,
      },
      {
        label: "views",
        data: duckViews,
        backgroundColor: ["#0C30F3"],
        borderColor: ["#00BEFF"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
  };

  const duckChart = document.getElementById("chart");
  const myChart = new Chart(duckChart, config);
  setLocalStorage();
}

function setLocalStorage() {
  localStorage.setItem("ducks", JSON.stringify(allDucks));
}

function checkLocalStorage() {
  const localDucks = JSON.parse(localStorage.getItem("ducks"));
  console.log(localDucks);
  if (localDucks) {
    allDucks = localDucks;
  } else {
    const bag = new Duck("Bag", "archive/Archive/bag.jpg");
    const banana = new Duck("Banana", "archive/Archive/banana.jpg");
    const bathroom = new Duck("Bathroom", "archive/Archive/bathroom.jpg");
    const boots = new Duck("Boots", "archive/Archive/boots.jpg");
    const breakfast = new Duck("Breakfast", "archive/Archive/breakfast.jpg");
    const bubblegum = new Duck("Bubblegum", "archive/Archive/bubblegum.jpg");
    const chair = new Duck("Chair", "archive/Archive/chair.jpg");
    const cthulhu = new Duck("Cthulhu", "archive/Archive/cthulhu.jpg");
    const dogduck = new Duck("Dog-duck", "archive/Archive/dog-duck.jpg");
    const dragon = new Duck("Dragon", "archive/Archive/dragon.jpg");
    const pen = new Duck("Pen", "archive/Archive/pen.jpg");
    const petsweep = new Duck("Pet-sweep", "archive/Archive/pet-sweep.jpg");
    const scissors = new Duck("Scissors", "archive/Archive/scissors.jpg");
    const shark = new Duck("Shark", "archive/Archive/shark.jpg");
    const sweep = new Duck("Sweep", "archive/Archive/sweep.png");
    const tauntaun = new Duck("Tauntaun", "archive/Archive/tauntaun.jpg");
    const unicorn = new Duck("Unicorn", "archive/Archive/unicorn.jpg");
    const watercan = new Duck("Water-can", "archive/Archive/water-can.jpg");
    const wineglass = new Duck("Wine-glass", "archive/Archive/wine-glass.jpg");
  }
}

checkLocalStorage();
renderDucks();
