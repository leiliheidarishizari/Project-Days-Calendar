// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

// State to keep track of the current month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Function to create the calendar grid
function createCalendarGrid(year, month) {
    // Get the first day of the month and the total number of days in the month
    const firstDay = (new Date(year, month).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create the table for the calendar
    const calendarTable = document.createElement("table");
    const headerRow = document.createElement("tr");

    // Days of the week header
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    dayNames.forEach(dayName => {
        const th = document.createElement("th");
        th.innerText = dayName;
        headerRow.appendChild(th);
    });

    calendarTable.appendChild(headerRow);

    let day = 1;
    for (let i = 0; i < 6; i++) { // Maximum of 6 rows
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                // Empty cells before the start of the month
                cell.innerText = '';
            } else if (day <= daysInMonth) {
                cell.innerText = day;
                
                // Check if there is a commemorative day for the given date
                const date = `${monthNames[month]} ${day}, ${year}`;
                const dayData = daysData.filter(d => 
                    d.monthName === monthNames[month] && 
                    d.occurence === 'second' && 
                    d.dayName === dayNames[j]
                );
                dayData.forEach(d => {
                    const dayText = d.name;
                    const tooltip = document.createElement("span");
                    tooltip.classList.add("tooltip");
                    tooltip.innerText = dayText;
                    cell.appendChild(tooltip);
                });

                day++;
            }
            row.appendChild(cell);
        }

        calendarTable.appendChild(row);
        if (day > daysInMonth) break; // Stop after all the days are added
    }

    // Append the table to the body
    document.querySelector('#calendar').innerHTML = ''; // Clear previous grid
    document.querySelector('#calendar').appendChild(calendarTable);
}

// Update the month and year in the header
function updateCalendarHeader(year, month) {
    document.querySelector('#month-year').innerText = `${monthNames[month]} ${year}`;
}

// Function to handle "Previous Month" button click
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

// Function to handle "Next Month" button click
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

// Initial setup
window.onload = function () {
    createCalendarGrid(currentYear, currentMonth);
    updateCalendarHeader(currentYear, currentMonth);

    // Attach event listeners to the buttons
    document.querySelector('#prevMonth').addEventListener('click', prevMonth);
    document.querySelector('#nextMonth').addEventListener('click', nextMonth);
};
