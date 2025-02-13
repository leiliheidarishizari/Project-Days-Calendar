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
                            // Highlight special day
                            cell.style.backgroundColor = "#FFD700";
                            cell.style.fontWeight = "bold";
                            cell.style.color = "black";
                            cell.style.padding = "10px";

                            // Add special day name below date
                            const dayName = document.createElement("div");
                            dayName.style.fontSize = "12px";
                            dayName.style.marginTop = "5px";
                            dayName.style.textAlign = "center";
                            dayName.innerText = d.name;
                            cell.appendChild(dayName);

                            // Add click event to show special day description
                            cell.addEventListener("click", () => fetchSpecialDayDescription(d.descriptionURL, d.name));
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
    updateCalendar();
}

function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    updateCalendar();
}

function updateCalendar() {
    createCalendarGrid(currentYear, currentMonth);
    updateCalendarHeader(currentYear, currentMonth);
    document.querySelector("#monthSelector").value = currentMonth;
    document.querySelector("#yearSelector").value = currentYear;

    // Hide the description box when switching months
    document.querySelector("#description-box").style.display = "none";
}

// Function to fetch and display the special day description inside the page
async function fetchSpecialDayDescription(url, dayName) {
    try {
        const response = await fetch(url);
        const text = await response.text();

        // Show the description in the description box
        document.querySelector("#description-box").style.display = "block";
        document.querySelector("#description-title").innerText = dayName;
        document.querySelector("#description-text").innerText = text;
    } catch (error) {
        console.error("Error fetching description:", error);
    }
}

// Populate dropdown selectors for month & year
function populateMonthYearSelectors() {
  const monthSelector = document.querySelector("#monthSelector");
  const yearSelector = document.querySelector("#yearSelector");

  // Populate month dropdown efficiently
  monthSelector.innerHTML = monthNames.map((m, i) => `<option value="${i}">${m}</option>`).join('');

  // Efficient way to populate year dropdown
  yearSelector.innerHTML = Array.from({ length: 201 }, (_, i) => `<option value="${1900 + i}">${1900 + i}</option>`).join('');

  monthSelector.value = currentMonth;
  yearSelector.value = currentYear;

  monthSelector.addEventListener("change", (e) => {
      currentMonth = parseInt(e.target.value);
      updateCalendar();
  });

  yearSelector.addEventListener("change", (e) => {
      currentYear = parseInt(e.target.value);
      updateCalendar();
  });
}

// Initialize everything when the page loads
window.onload = function () {
    createCalendarGrid(currentYear, currentMonth);
    updateCalendarHeader(currentYear, currentMonth);

    // Attach event listeners to navigation buttons
    document.querySelector('#prevMonth').addEventListener('click', prevMonth);
    document.querySelector('#nextMonth').addEventListener('click', nextMonth);

    // Populate dropdowns
    populateMonthYearSelectors();
};


export { fetchSpecialDayDescription };