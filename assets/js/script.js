/* 
    TODO: put this in submission notes and delete from code.
    Because Moment.js is deprecated, I deviated a little and used luxon 2.0
    to run time-related functions. This is one of the libraries the
    Moment.js docs suggest should be used as an alternative.
*/

let DateTime = luxon.DateTime;
let currTime;

function init() {
    startClock();
    //TODO: check if the day has passed since last entry and clear if so
    clearPreviousDay();
    //TODO: populate calendar with events from local storage

}

/* ~~~ Date Functions ~~~ */

//Update date each min
function startClock() {
    appendCurrentDate("#currentDay");
    setInterval(() => {
        appendCurrentDate("#currentDay")
    }, 60000);
}

//Appends current date to provided element
function appendCurrentDate(id) {
    let dateString = DateTime.now().toFormat("EEEE', 'MMMM d") + ordinalLetters(parseInt(DateTime.now().toFormat("d")));
    $(id).text(dateString);
}

//Helper that appends letters to end of date numbers
function ordinalLetters(n) {
    if(n > 3 && n < 21) {
        return "th";
    }
    switch (n % 10) {
        case 1:
            return "st";
            break;
        case 2: 
            return "nd";
            break;
        case 3:
            return "rd";
            break;
        default:
            return "th";
            break;
    }
}

/* Calendar Functions */

//Clears events if a day has passed
function clearPreviousDay() {
    localStorage.getItem("currDay");
    if(currDay != DateTime.now) {
        localStorage.clear();
        localStorage.setItem(DateTime.now());
    }
}

//Render the calendar from 9am to 5pm
function renderCalendar() {
    
}

//pull hashmap containing time/event 
function getExistingEvents() {

}

/* Adding Events and stuff */

init()
