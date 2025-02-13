import jest from "jest-mock";
import { fetchSpecialDayDescription } from "./web.mjs";

// Mock the `fetch` function
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve("Ada Lovelace Day is celebrated on the second Tuesday of October."),
  })
);

test("fetchSpecialDayDescription updates the description box correctly", async () => {
    // Set up the DOM elements needed for the function
    document.body.innerHTML = `
        <div id="description-box" style="display: none;">
            <h3 id="description-title"></h3>
            <p id="description-text"></p>
        </div>
    `;

    // Call the function with mock URL and day name
    await fetchSpecialDayDescription("https://example.com/ada-lovelace", "Ada Lovelace Day");

    // Check if the description box is now visible
    expect(document.querySelector("#description-box").style.display).toBe("block");

    // Check if the title is set correctly
    expect(document.querySelector("#description-title").innerText).toBe("Ada Lovelace Day");

    // Check if the description text is set correctly
    expect(document.querySelector("#description-text").innerText).toBe(
        "Ada Lovelace Day is celebrated on the second Tuesday of October."
    );
});