// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

// Function to calculate the correct date for a special day based on its occurrence pattern
export function calculateSpecialDay(year, month, specialDay) {
    const monthIndex = new Date(`${specialDay.monthName} 1, ${year}`).getMonth();
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const dayOfWeek = firstDayOfMonth.getDay();

    // Adjusting for day of the week (Sunday = 0)
    const weekdayOffset = (dayOfWeek === 0 ? 7 : dayOfWeek); 

    // Get the target weekday for the event (e.g. "Monday" -> 1)
    const targetWeekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(specialDay.dayName);

    // Calculate the first occurrence of the target weekday
    let dateOfSpecialDay = weekdayOffset <= targetWeekday
        ? targetWeekday - weekdayOffset + 1
        : targetWeekday - weekdayOffset + 8;

    // Handle different occurrences
    if (specialDay.occurence === "second") {
        dateOfSpecialDay += 7;
    } else if (specialDay.occurence === "third") {
        dateOfSpecialDay += 14;
    } else if (specialDay.occurence === "last") {
        // Fix the calculation for the last occurrence
        const lastDayOfMonth = new Date(year, month + 1, 0); // Get the last day of the month
        const lastDayOfWeek = lastDayOfMonth.getDay(); // Get the weekday of the last day
        const lastDate = lastDayOfMonth.getDate(); // Get the last date of the month
        
        // Calculate how far the target weekday is from the last day of the month
        const diff = (lastDayOfWeek - targetWeekday + 7) % 7;
        
        // If the diff is 0, it means the last target weekday is the last day of the month
        dateOfSpecialDay = lastDate - diff;
    }

    return dateOfSpecialDay;
}


