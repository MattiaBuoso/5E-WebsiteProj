// Global Timer Variables
let timer;
let timeRemaining = 240; // 4 minutes (240 seconds)

// Timer Display on Page Load
function startTimer() {
    const timerDisplay = document.getElementById('timer');
    timer = setInterval(function () {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.innerHTML = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer);
            alert('Time is up!');
            submitQuiz();
        }
    }, 1000);
}

// Start Timer Once Page Loads
window.onload = function () {
    startTimer();
};
