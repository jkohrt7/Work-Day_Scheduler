let DateTime = luxon.DateTime;

//Initializes some essential portions of the app on load
function init() {
    startClock();
    //clearPreviousDay();
    renderCalendar();
    setInterval(renderCalendar, 3600000);
    
}

/* ~~~ Date Functions ~~~ */

//Every minute, writes the date at the top in the form [weekday], [month] #[th, st or rd]
function startClock() {
    appendCurrentDate("#currentDay");
    setInterval(() => {
        appendCurrentDate("#currentDay")
    }, 60000);
}

//Given a tag, changes the inner text to the current date.
function appendCurrentDate(id) {
    let dateString = DateTime.now().toFormat("EEEE', 'MMMM d") + ordinalLetters(parseInt(DateTime.now().toFormat("d")));
    $(id).text(dateString);
}

//Helper function that appends letters to end of date numbers
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

//Clears events if a day has passed
function clearPreviousDay() {
    let currDay = localStorage.getItem("currDay");
    if(currDay != DateTime.now().day) {
        localStorage.clear();
        localStorage.setItem("currDay", DateTime.now().day);
    }
}

/* Calendar Functions */
//Create and render 1 event tag (hour, content and save box) for every event in the eventArray
function renderCalendar() {
    let eventsObj = getExistingEvents();
    let hourTag;
    let hoursInDay = 9;

    for(let i = 0; i < hoursInDay; i++) {
        console.log("i");
        hourTag = createEventTag(i, eventsObj);
        $(".container").append(hourTag); 
    }
}

//Pull object containing time/event pairs
function getExistingEvents() {
    let eventsObj = JSON.parse(window.localStorage.getItem("events"));
    
    if(eventsObj === null) {
        eventsObj = {
            "9" : [" 9AM", ""],
            "10": ["10AM", ""],
            "11": ["11AM", ""],
            "12": ["12PM", ""],
            "13" : [" 1PM", ""],
            "14" : [" 2PM", ""],
            "15" : [" 3PM", ""],
            "16" : [" 4PM", ""],
            "17" : [" 5PM", ""]
        };
        localStorage.setItem("events", JSON.stringify(eventsObj));
    }
    return eventsObj;
}

//When a save button is clicked, this function places the textArea's contents in localStorage
function handleSaveEvent(e) {
    let eventText = e.target.parentNode.querySelector("textarea").value;
    let eventsObj = JSON.parse(localStorage.getItem("events"));
    let eventHour = "" + e.target.getAttribute("hour-data");

    eventsObj[eventHour][1] = eventText;
    localStorage.setItem("events", JSON.stringify(eventsObj));
}

//Creates a single calendar event based on current time, existing events
function createEventTag(i, eventsObj) {
    let $_leftDiv   = $("<div>", {class: "time-container"}).text("" + eventsObj[Object.keys(eventsObj)[i]][0]);
    let keys = Object.keys(eventsObj);

    //determines background color based on current time
    let $_middleDiv = $("<textarea>").val(eventsObj[keys[i]][1]);
    if(DateTime.now().hour === parseInt(keys[i])) {
        $_middleDiv.addClass("active-hour");
    }
    else if (DateTime.now().hour > parseInt(keys[i])){
        $_middleDiv.addClass("inactive-hour")
    }
    else {
        $_middleDiv.addClass("future-hour")
    }

    let $_rightDiv  = $("<div>", {class: "save-event", "hour-data": Object.keys(eventsObj)[i]}).text("????");

    return $("<div>", {class: "event-container"}).append($_leftDiv).append($_middleDiv).append($_rightDiv);
}

// Adds onClick listeners to save buttons. Only executes after the calendar has rendered.
$(document).ready(function(){
    let saveElementList = document.querySelectorAll(".save-event");
    for(let i = 0; i < saveElementList.length; i++) {
        saveElementList[i].addEventListener("click", handleSaveEvent)
    }
    //$(".save-event").on("click", handleSaveEvent(e))
});

init();
