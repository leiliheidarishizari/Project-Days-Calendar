// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import fs from 'fs';
import { createEvents } from 'ics';
import daysData from './days.json' assert { type: 'json' };
import { calculateSpecialDay } from './common.mjs';

// Function to fetch the description text from URL
async function fetchDescriptionText(url) {
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (error) {
        console.error(`Error fetching description from ${url}:`, error);
        return "Description not available."; // Fallback message
    }
}

// Function to generate an iCal (.ics) file from event data
async function generateICal() {
    const events = [];

    for (let year = 2020; year <= 2030; year++) {
        for (const day of daysData) {
            const monthIndex = new Date(`${day.monthName} 1, ${year}`).getMonth();
            const dayDate = calculateSpecialDay(year, monthIndex, day);
            
            const descriptionText = await fetchDescriptionText(day.descriptionURL);

            events.push({
                title: day.name,
                start: [year, monthIndex + 1, dayDate], // Year, Month (1-based index), Day
                description: `Description of the day: ${descriptionText}`, // Add the fetched text instead of URL
            });
        }
    }

    createEvents(events, (error, value) => {
        if (error) {
            console.log(error);
            return;
        }
        fs.writeFileSync('generated-days.ics', value);
        console.log('generated-days.ics file has been created.');
    });
}

// Run the function to generate the iCal file
generateICal();
