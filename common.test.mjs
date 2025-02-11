import { calculateSpecialDay } from "./common.mjs";

// Test for Ada Lovelace Day in 2025 (second Tuesday of October)
test("Calculates the correct special day for Ada Lovelace Day (second Tuesday of October 2025)", () => {
    const specialDay = {
        name: "Ada Lovelace Day",
        monthName: "October",
        dayName: "Tuesday",
        occurence: "second",
    };

    const result = calculateSpecialDay(2025, 9, specialDay); // October = index 9
    expect(result).toBe(14); // In 2025, Ada Lovelace Day falls on October 14
});

// Test for Ada Lovelace Day in a different year (2026)
test("Calculates the correct special day for Ada Lovelace Day in 2026", () => {
    const specialDay = {
        name: "Ada Lovelace Day",
        monthName: "October",
        dayName: "Tuesday",
        occurence: "second",
    };

    const result = calculateSpecialDay(2026, 9, specialDay); // October = index 9
    expect(result).toBe(13); // In 2026, Ada Lovelace Day falls on October 13
});

// Test for "first" occurrence
test("Calculates the correct first Monday of March 2025", () => {
    const specialDay = {
        name: "First Monday Test",
        monthName: "March",
        dayName: "Monday",
        occurence: "first",
    };

    const result = calculateSpecialDay(2025, 2, specialDay); // March = index 2
    expect(result).toBe(3); // The first Monday of March 2025 falls on March 3
});

// Test for "last" occurrence
test("Calculates the last Friday of November 2025", () => {
    const specialDay = {
        name: "Black Friday",
        monthName: "November",
        dayName: "Friday",
        occurence: "last",
    };

    const result = calculateSpecialDay(2025, 10, specialDay); // November = index 10
    expect(result).toBe(28); // The last Friday of November 2025 falls on November 28
});
