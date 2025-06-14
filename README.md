# Calendar Web Application

[![Live Website](https://github.com/harinadh01/CALENDAR/blob/main/Screenshot%202025-06-14%20100059.png)](https://harinadh01.github.io/TASK1/)

## Overview

A responsive, interactive calendar application built with HTML, CSS, and JavaScript. This calendar allows users to:

- View events by month
- Add, edit, and delete events
- See today's and upcoming events in a sidebar
- Organize events by categories
- Save events to browser's local storage

## Features

📅 **Month View Navigation**
- Switch between months with arrow buttons
- "Today" button to quickly return to current month
- Visual indication of current day

➕ **Event Management**
- Add new events with details (title, date, time, category, etc.)
- Edit existing events
- Delete events with confirmation
- All-day event option

🗂 **Event Organization**
- Color-coded by category (meeting, personal, deadline, etc.)
- Event count indicators for busy days
- Today's events and upcoming events sidebar

💾 **Data Persistence**
- Events saved to browser's localStorage
- Sample events provided for first-time users

## Installation

No installation required! Simply open the `CALENDAR.html` file in any modern web browser.

## Usage

1. **Navigation**:
   - Use the left/right arrows to move between months
   - Click "Today" to return to the current month

2. **Adding Events**:
   - Click on any date cell
   - Fill out the event details in the modal
   - Click "Save Event"

3. **Managing Events**:
   - Click on existing events to edit them
   - Use the delete button in edit mode to remove events

4. **Viewing Events**:
   - Today's events appear in the left sidebar
   - Upcoming events (next 5) are listed below
   - Events appear as colored dots on calendar days

## Technical Details

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Dependencies**: Bootstrap 5, Font Awesome (for icons)
- **Storage**: Browser localStorage (no backend required)
- **Responsive Design**: Works on desktop and mobile devices

## Customization

You can easily customize:

- Event categories by modifying the `category` options in the event form
- Colors by editing the CSS for `.event-{category}` classes
- Default event settings in the sample events array

## Limitations

- Currently only supports single-day events (no multi-day events)
- No recurring event implementation beyond the UI checkbox
- No calendar sharing or collaboration features

## Future Enhancements

- [ ] Add multi-day event support
- [ ] Implement recurring events
- [ ] Add calendar export/import functionality
- [ ] Include drag-and-drop event rescheduling
- [ ] Add calendar sharing options

## Screenshots



## License

This project is open-source and available under the MIT License.# CALENDAR
