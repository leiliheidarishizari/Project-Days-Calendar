// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.
import { calculateSpecialDay } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function createCalendarGrid(year, month) {
    const firstDay = (new Date(year, month).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarTable = document.createElement("table");
    const headerRow = document.createElement("tr");

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    dayNames.forEach(dayName => {
        const th = document.createElement("th");
        th.innerText = dayName;
        headerRow.appendChild(th);
    });

    calendarTable.appendChild(headerRow);

    let day = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                cell.innerText = '';
            } else if (day <= daysInMonth) {
                cell.innerText = day;

                // Check and display special days for this date
                daysData.forEach(d => {
                    if (d.monthName === monthNames[month]) {
                        const specialDayDate = calculateSpecialDay(year, month, d);
                        if (specialDayDate === day) {
                            // Highlight special day by adding bold styling
                            cell.style.backgroundColor = "#FFD700";  // Golden background for special days
                            cell.style.fontWeight = "bold";
                            cell.style.color = "black";  // Optional: Make the text color black for contrast
                            cell.style.padding = "10px"; // Add padding for spacing

                            // Add the special day name below the date in the cell
                            const dayName = document.createElement("div");
                            dayName.style.fontSize = "12px";  // Make the special day name smaller
                            dayName.style.marginTop = "5px";  // Add space between the day number and name
                            dayName.style.textAlign = "center";  // Center align the special day name
                            dayName.innerText = d.name;
                            cell.appendChild(dayName);
                        }
                    }
                });

                day++;
            }
            row.appendChild(cell);
        }

        calendarTable.appendChild(row);
        if (day > daysInMonth) break;
    }

    document.querySelector('#calendar').innerHTML = '';
    document.querySelector('#calendar').appendChild(calendarTable);
}

function updateCalendarHeader(year, month) {
    document.querySelector('#month-year').innerText = `${monthNames[month]} ${year}`;
}

function prevMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    createCalendarGrid(currentYear, currentMonth);
    updateCalendarHeader(currentYear, currentMonth);
}

function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    createCalendarGrid(currentYear, currentMonth);
    updateCalendarHeader(currentYear, currentMonth);
}

window.onload = function () {
    createCalendarGrid(currentYear, currentMonth);
    updateCalendarHeader(currentYear, currentMonth);

    // Attach event listeners to the buttons
    document.querySelector('#prevMonth').addEventListener('click', prevMonth);
    document.querySelector('#nextMonth').addEventListener('click', nextMonth);
};


