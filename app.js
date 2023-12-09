window.addEventListener("DOMContentLoaded", (event) => {
  const content = document.querySelector("body");
  content.style.opacity = "1";
});

let timer;
let flag = false;

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
startBtn.addEventListener("click", startWatch);
pauseBtn.addEventListener("click", stopWatch);
resetBtn.addEventListener("click", reset);

// start function
function startWatch() {
  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
  timer = setInterval(updateWatch, 10);
  flag = true;
  record.disabled = false;
}
// stop function
function stopWatch() {
  pauseBtn.style.display = "none";
  startBtn.style.display = "inline-block";
  clearInterval(timer);
  flag = false;
  record.disabled = true;
}

// reset function
let h = document.getElementById("hours");
let m = document.getElementById("minutes");
let s = document.getElementById("seconds");
let ms = document.getElementById("milliseconds");
function reset() {
  stopWatch();
  h.textContent = "00";
  m.textContent = "00";
  s.textContent = "00";
  ms.textContent = "00";

  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;

  // resetting laps
  const lapRecords = document.querySelector(".lap-records tbody");
  lapRecords.style.maxHeight = "400px"; // Resetting the max height
  lapRecords.innerHTML = ""; // Clearing lap records
  document.querySelector(".lap-records").style.visibility = "hidden";
  tableHidden = false;
  record.disabled = true;
  lapCount = 1;
}

// update timer
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
function updateWatch() {
  milliseconds++;
  if (milliseconds >= 100) {
    milliseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  h.textContent = hours > 9 ? hours : "0" + hours;
  m.textContent = minutes > 9 ? minutes : "0" + minutes;
  s.textContent = seconds > 9 ? seconds : "0" + seconds;
  ms.textContent = milliseconds > 9 ? milliseconds : "0" + milliseconds;
}

// laps function
const record = document.getElementById("lap-btn");
record.disabled = true;
let lapCount = 1;
let tableHidden = false;
record.addEventListener("click", recordLaps);
function recordLaps() {
  tableHidden = true;
  if (tableHidden) {
    document.querySelector(".lap-records").style.visibility = "visible";
  }

  let lapTime = `${h.textContent} : ${m.textContent} : ${s.textContent} : ${ms.textContent}`;

  let newRow = document.createElement("tr");
  let lapCell = document.createElement("td");
  let timeCell = document.createElement("td");

  lapCell.textContent = lapCount;
  timeCell.textContent = lapTime;

  newRow.appendChild(lapCell);
  newRow.appendChild(timeCell);

  let tbody = document.querySelector(".lap-records tbody");
  tbody.insertAdjacentElement("afterBegin", newRow);

  lapCount++;
}

// full screen
const fullscreen = document.getElementById("fullscreen");
fullscreen.addEventListener("click", fullScreenMode);
function fullScreenMode() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Side navbar settings
function navbarAppear() {
  //appear - sttings
  const div = document.querySelector(".side-navbar-wrapper");
  div.classList.add("appear");
}
const sideNavbarBtnOpen = document.getElementById("open-settings");
sideNavbarBtnOpen.addEventListener("click", navbarAppear);

function navbarDisappear() {
  //disappear - settings
  const div = document.querySelector(".side-navbar-wrapper");
  div.classList.remove("appear");
}
const sideNavbarBtnClose = document.getElementById("close-settings");
sideNavbarBtnClose.addEventListener("click", navbarDisappear);

// keyboard shortcuts
document.addEventListener("keydown", () => {
  // play/pause
  if (event.keyCode === 32 || event.key === " ") {
    if (flag) {
      stopWatch();
    } else {
      startWatch();
    }
  }

  // reset
  if (event.keyCode === 82 || event.key === "r") {
    reset();
  }

  // fullscreen
  if (event.keyCode === 70 || event.keyCode === "f") {
    fullScreenMode();
  }

  // record laps
  if (event.keyCode === 86 || event.keyCode === "v") {
    recordLaps();
  }
});
