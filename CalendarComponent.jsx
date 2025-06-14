import React, { useState, useEffect } from 'react';
import './CalendarComponent.css';

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);

  // Load events from localStorage on component mount
  useEffect(() => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
      if (storedEvents.length === 0) {
        // Default demo events
        const demoEvents = [
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
          // Add more demo events as needed
        ];
        setEvents(demoEvents);
        localStorage.setItem('calendarEvents', JSON.stringify(demoEvents));
      } else {
        setEvents(storedEvents);
      }
    } catch (error) {
      console.warn('Error parsing stored events:', error);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // Calendar navigation functions
  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Event handling functions
  const showAddEventModal = () => {
    // Implementation for showing modal
  };

  const saveEvent = (eventData) => {
    // Implementation for saving event
  };

  const deleteEvent = (eventId) => {
    // Implementation for deleting event
  };

  // Render the calendar grid
  const renderCalendar = () => {
    // Implementation for rendering calendar days
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Calendar */}
        <div className="col-lg-9 col-md-8">
          <div className="calendar-container">
            {/* Calendar Header */}
            <div className="calendar-header">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <button className="calendar-nav-btn me-3" onClick={() => changeMonth(-1)}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <h2 className="mb-0">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h2>
                  <button className="calendar-nav-btn ms-3" onClick={() => changeMonth(1)}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn btn-light btn-sm me-2" onClick={goToToday}>
                    <i className="fas fa-calendar-day me-1"></i>Today
                  </button>
                  <button className="btn btn-success btn-sm" onClick={showAddEventModal}>
                    <i className="fas fa-plus me-1"></i>Add Event
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid" id="calendarGrid">
              {/* Day headers */}
              <div className="calendar-day-header">Sun</div>
              <div className="calendar-day-header">Mon</div>
              <div className="calendar-day-header">Tue</div>
              <div className="calendar-day-header">Wed</div>
              <div className="calendar-day-header">Thu</div>
              <div className="calendar-day-header">Fri</div>
              <div className="calendar-day-header">Sat</div>
              {/* Calendar days will be rendered here */}
              {renderCalendar()}
            </div>
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="col-lg-3 col-md-4">
          <div className="events-sidebar">
            <h4 className="mb-3">
              <i className="fas fa-calendar-alt me-2 text-primary"></i>
              Today's Events
            </h4>
            <div id="todayEvents">
              {/* Today's events will be rendered here */}
            </div>

            <h5 className="mt-4 mb-3">
              <i className="fas fa-clock me-2 text-warning"></i>
              Upcoming Events
            </h5>
            <div id="upcomingEvents">
              {/* Upcoming events will be rendered here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}