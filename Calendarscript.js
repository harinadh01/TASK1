// Global variables
let currentDate = new Date();
let events = [];
let selectedDate = null;
let editingEventId = null;

// Initialize events from localStorage safely
try {
    events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
} catch (error) {
    console.warn('Error parsing stored events:', error);
    events = [];
}

// Sample events for demo
if (events.length === 0) {
    events = [
        {
            id: 1,
            title: "Team Meeting",
            date: "2025-06-15",
            startTime: "09:00",
            endTime: "10:00",
            category: "meeting",
            description: "Weekly team sync meeting",
            location: "Conference Room A",
            reminder: 15,
            allDay: false,
            recurring: false
        },
        {
            id: 2,
            title: "Project Deadline",
            date: "2025-06-20",
            startTime: "17:00",
            endTime: "17:30",
            category: "deadline",
            description: "Final submission for client project",
            location: "",
            reminder: 1440,
            allDay: false,
            recurring: false
        },
        {
            id: 3,
            title: "Birthday Party",
            date: "2025-06-25",
            startTime: "",
            endTime: "",
            category: "personal",
            description: "John's birthday celebration",
            location: "Park Plaza",
            reminder: 60,
            allDay: true,
            recurring: false
        }
    ];
    saveEventsToStorage();
}

// Initialize calendar
document.addEventListener('DOMContentLoaded', function() {
    try {
        renderCalendar();
        updateSidebar();
    } catch (error) {
        console.error('Error initializing calendar:', error);
        alert('Error loading calendar. Please refresh the page.');
    }
});

// Change month
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
    updateSidebar();
}

// Go to today
function goToToday() {
    currentDate = new Date();
    renderCalendar();
    updateSidebar();
}

// Render calendar
function renderCalendar() {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    document.getElementById('currentMonth').textContent = 
        `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const calendarGrid = document.getElementById('calendarGrid');
    
    // Clear existing days (keep headers)
    const headers = calendarGrid.querySelectorAll('.calendar-day-header');
    calendarGrid.innerHTML = '';
    headers.forEach(header => calendarGrid.appendChild(header));

    // Generate calendar days
    for (let i = 0; i < 42; i++) {
        const cellDate = new Date(startDate);
        cellDate.setDate(startDate.getDate() + i);
        
        const dayElement = createDayElement(cellDate, firstDay, lastDay);
        calendarGrid.appendChild(dayElement);
    }
}

// Create day element
function createDayElement(date, firstDay, lastDay) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    
    const isCurrentMonth = date >= firstDay && date <= lastDay;
    const isToday = formatDate(date) === formatDate(new Date());
    const dateString = formatDate(date);
    
    if (!isCurrentMonth) {
        dayDiv.classList.add('other-month');
    }
    
    if (isToday) {
        dayDiv.classList.add('today');
    }

    // Day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    dayDiv.appendChild(dayNumber);

    // Events for this day
    const dayEvents = events.filter(event => event.date === dateString);
    
    if (dayEvents.length > 0) {
        dayEvents.slice(0, 3).forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = `event-item event-${event.category}`;
            eventDiv.textContent = event.title;
            eventDiv.title = `${event.title} ${event.startTime ? '- ' + event.startTime : ''}`;
            eventDiv.onclick = (e) => {
                e.stopPropagation();
                editEvent(event.id);
            };
            dayDiv.appendChild(eventDiv);
        });

        if (dayEvents.length > 3) {
            const moreDiv = document.createElement('div');
            moreDiv.className = 'event-counter';
            moreDiv.textContent = `+${dayEvents.length - 3}`;
            dayDiv.appendChild(moreDiv);
        }
    }

    // Click handler for day
    dayDiv.onclick = () => {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Add selection to clicked day
        dayDiv.classList.add('selected');
        selectedDate = dateString;
        showAddEventModal(dateString);
    };

    return dayDiv;
}

// Format date for comparison (updated to fix timezone issues)
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Show add event modal
function showAddEventModal(date = null) {
    try {
        editingEventId = null;
        document.getElementById('eventModalTitle').innerHTML = 
            '<i class="fas fa-calendar-plus me-2"></i>Add New Event';
        document.getElementById('deleteEventBtn').style.display = 'none';
        
        // Reset form
        const form = document.getElementById('eventForm');
        if (form) {
            form.reset();
        }
        
        if (date) {
            const dateInput = document.getElementById('eventDate');
            if (dateInput) {
                dateInput.value = date;
            }
        } else {
            const dateInput = document.getElementById('eventDate');
            if (dateInput) {
                dateInput.value = formatDate(new Date());
            }
        }
        
        const modalElement = document.getElementById('eventModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
    } catch (error) {
        console.error('Error showing modal:', error);
        alert('Error opening event form. Please try again.');
    }
}

// Edit event
function editEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    editingEventId = eventId;
    document.getElementById('eventModalTitle').innerHTML = 
        '<i class="fas fa-calendar-edit me-2"></i>Edit Event';
    document.getElementById('deleteEventBtn').style.display = 'inline-block';

    // Populate form
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventCategory').value = event.category;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventStartTime').value = event.startTime || '';
    document.getElementById('eventEndTime').value = event.endTime || '';
    document.getElementById('eventDescription').value = event.description || '';
    document.getElementById('eventLocation').value = event.location || '';
    document.getElementById('eventReminder').value = event.reminder || 0;
    document.getElementById('eventAllDay').checked = event.allDay || false;
    document.getElementById('eventRecurring').checked = event.recurring || false;

    new bootstrap.Modal(document.getElementById('eventModal')).show();
}

// Save event
function saveEvent() {
    const title = document.getElementById('eventTitle').value.trim();
    const category = document.getElementById('eventCategory').value;
    const date = document.getElementById('eventDate').value;
    const startTime = document.getElementById('eventStartTime').value;
    const endTime = document.getElementById('eventEndTime').value;
    const description = document.getElementById('eventDescription').value.trim();
    const location = document.getElementById('eventLocation').value.trim();
    const reminder = parseInt(document.getElementById('eventReminder').value);
    const allDay = document.getElementById('eventAllDay').checked;
    const recurring = document.getElementById('eventRecurring').checked;

    if (!title || !date) {
        alert('Please fill in required fields: Title and Date');
        return;
    }

    const eventData = {
        id: editingEventId || Date.now(),
        title,
        category,
        date,
        startTime: allDay ? '' : startTime,
        endTime: allDay ? '' : endTime,
        description,
        location,
        reminder,
        allDay,
        recurring
    };

    if (editingEventId) {
        // Update existing event
        const index = events.findIndex(e => e.id === editingEventId);
        if (index !== -1) {
            events[index] = eventData;
        }
    } else {
        // Add new event
        events.push(eventData);
    }

    saveEventsToStorage();
    renderCalendar();
    updateSidebar();
    
    bootstrap.Modal.getInstance(document.getElementById('eventModal')).hide();
}

// Delete event
function deleteEvent() {
    if (!editingEventId) return;
    
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(e => e.id !== editingEventId);
        saveEventsToStorage();
        renderCalendar();
        updateSidebar();
        
        bootstrap.Modal.getInstance(document.getElementById('eventModal')).hide();
    }
}

// Save events to localStorage (simulating Django backend)
function saveEventsToStorage() {
    try {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    } catch (error) {
        console.error('Error saving events:', error);
        alert('Error saving events. Please try again.');
    }
}

// Update sidebar
function updateSidebar() {
    const today = formatDate(new Date());
    const todayEvents = events.filter(event => event.date === today);
    const upcomingEvents = events
        .filter(event => event.date > today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);

    // Today's events
    const todayContainer = document.getElementById('todayEvents');
    if (todayEvents.length === 0) {
        todayContainer.innerHTML = '<p class="text-muted">No events today</p>';
    } else {
        todayContainer.innerHTML = todayEvents.map(event => `
            <div class="sidebar-event" onclick="editEvent(${event.id})">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <strong>${event.title}</strong>
                        ${event.startTime ? `<br><small class="text-muted"><i class="fas fa-clock me-1"></i>${event.startTime}</small>` : ''}
                        ${event.location ? `<br><small class="text-muted"><i class="fas fa-map-marker-alt me-1"></i>${event.location}</small>` : ''}
                    </div>
                    <span class="badge bg-primary">${event.category}</span>
                </div>
            </div>
        `).join('');
    }

    // Upcoming events
    const upcomingContainer = document.getElementById('upcomingEvents');
    if (upcomingEvents.length === 0) {
        upcomingContainer.innerHTML = '<p class="text-muted">No upcoming events</p>';
    } else {
        upcomingContainer.innerHTML = upcomingEvents.map(event => `
            <div class="sidebar-event" onclick="editEvent(${event.id})">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <strong>${event.title}</strong>
                        <br><small class="text-muted"><i class="fas fa-calendar me-1"></i>${new Date(event.date).toLocaleDateString()}</small>
                        ${event.startTime ? `<br><small class="text-muted"><i class="fas fa-clock me-1"></i>${event.startTime}</small>` : ''}
                    </div>
                    <span class="badge bg-secondary">${event.category}</span>
                </div>
            </div>
        `).join('');
    }
}

// Handles all-day checkbox
document.getElementById('eventAllDay').addEventListener('change', function() {
    const startTime = document.getElementById('eventStartTime');
    const endTime = document.getElementById('eventEndTime');
    
    if (this.checked) {
        startTime.disabled = true;
        endTime.disabled = true;
        startTime.value = '';
        endTime.value = '';
    } else {
        startTime.disabled = false;
        endTime.disabled = false;
    }
});