**Days Calendar Project**
Overview
The Days Calendar is a web application that displays a dynamic calendar for the current month and highlights special commemorative days, such as holidays and observances. The app allows users to navigate through months and years and includes features like exporting the calendar to an iCal file, importing events from Google Calendar, and testing with Jest.

Key Features
Dynamic Calendar Generation: The app dynamically generates a calendar for the current month. Each day is displayed in a rectangular grid, and the first day of the month is aligned properly according to the weekday.

Commemorative Day Highlights: The calendar highlights special days based on the days.json file, such as holidays or significant observances (e.g., Ada Lovelace Day, Earth Day). It shows which dates correspond to specific commemorative days for the selected month.

Navigation Controls: Users can navigate between the current, previous, and next months with buttons that adjust the displayed calendar.

Month and Year Selector: A dropdown allows users to easily jump to a specific month and year.

iCal Generation: The app allows users to export commemorative days to an iCal file (.ics) for easy integration with external calendar apps like Apple Calendar, Outlook, and Google Calendar.

Google Calendar Import: Users can import events from their Google Calendar to visualize them alongside the commemorative days.

Responsive Design: The application adapts to different screen sizes and is optimized for use on both mobile and desktop devices.

Technologies Used
HTML/CSS: For structuring and styling the calendar interface.
JavaScript: For handling dynamic functionality, including date calculations, DOM manipulation, and API calls.
JSON: For storing commemorative day data.
iCal Generation: A JavaScript library is used to generate .ics files for exporting events.
Google Calendar API: For integrating with and importing events from Google Calendar.
Jest: For testing JavaScript functions, ensuring that the logic works correctly (e.g., date calculations, calendar rendering, iCal file generation).