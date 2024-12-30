var isStop = true;
var min = 0;
var sec = 0;
var msec = 0;
var laps = []; // Array to store lap times

function start() {
    if (isStop === true) {
        isStop = false;
        timer();
    }
}

function timer() {
    if (isStop === false) {
        msec += 10;
        if (msec >= 1000) {
            sec++;
            msec = 0;
        }
        if (sec >= 60) {
            min++;
            sec = 0;
        }

        const formattedTime = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}:${String(msec).padStart(3, '0')}`;
        stopwatch.innerHTML = formattedTime;

        setTimeout(timer, 10); // Recursively call every 10ms
    }
}

function stop() {
    isStop = true;
}

function reset() {
    // Stop the timer if it's running
    isStop = true;  // This will prevent the timer from running
    clearTimeout(timer);  // Clear any scheduled timeouts

    // Reset time variables
    msec = 0;
    sec = 0;
    min = 0;

    // Reset the display to "00:00:00"
    stopwatch.innerHTML = "00:00:00";

    // Clear laps
    laps = [];
    displayLaps();  // Clear the laps from the UI
}

// Lap function to capture the current time
function lap() {
    const lapTime = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}:${String(Math.floor(msec / 10)).padStart(2, '0')}`;
    laps.push(lapTime); // Add the current time to laps array
    displayLaps(); // Update the UI to show laps
}

// Function to display the laps in the UL element
function displayLaps() {
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = ""; // Clear previous lap times

    laps.forEach((lapTime, index) => {
        const li = document.createElement("li");
        li.textContent = `Lap ${index + 1}: ${lapTime}`;  // Display lap number and time
        lapsList.appendChild(li); // Append lap to the list
    });
}
