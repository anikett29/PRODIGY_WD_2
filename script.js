// Get DOM elements
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

let timer;
let startTime;
let pausedTime = 0;

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);

function startTimer() {
    if (!timer) {
        startTime = Date.now() - pausedTime;
        timer = setInterval(updateTime, 10);
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
}

function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        startButton.disabled = false;
        pauseButton.disabled = true;
        pausedTime = Date.now() - startTime;
    }
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    pausedTime = 0;
    display.textContent = "00:00:00";
    startButton.disabled = false;
    pauseButton.disabled = false;
    lapList.innerHTML = "";
}

function updateTime() {
    const currentTime = Date.now() - startTime + pausedTime;
    const timeInSeconds = Math.floor(currentTime / 1000);
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function recordLap() {
    if (timer) {
        const lapTime = display.textContent;
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
    }
}
