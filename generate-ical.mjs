// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import fs from 'fs';
import { createEvents } from 'ics';
import daysData from './days.json' assert { type: 'json' };
import { calculateSpecialDay } from './common.mjs';

// Function to generate an iCal (.ics) file from event data
function generateICal(events) {
    createEvents(events, (error, value) => {
        if (error) {
            console.log(error);
            return;
        }
        fs.writeFileSync('generated-days.ics', value);
        console.log('generated-days.ics file has been created.');
    });
}

const events = [];

// Loop through years 2020 to 2030 and calculate special days
for (let year = 2020; year <= 2030; year++) {
    daysData.forEach((day) => {
        const monthIndex = new Date(`${day.monthName} 1, ${year}`).getMonth();
        const dayDate = calculateSpecialDay(year, monthIndex, day);
        
        // Push each special day as an event object
        events.push({
            title: day.name,
            start: [year, monthIndex + 1, dayDate], // Year, Month (1-based index), Day
            description: `More info: ${day.descriptionURL}`,
        });
    });
}

// Generate the .ics file using the calculated events
generateICal(events);