import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css"; // Pievienosim papildu stilus

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">📅 Salaspils Kalendārs</h1>
      <div className="calendar-wrapper">
        <Calendar
          onChange={setDate}
          value={date}
          locale="lv-LV"
        />
      </div>
      <p className="calendar-selected-date">
        Izvēlētais datums: <strong>{date.toLocaleDateString("lv-LV")}</strong>
      </p>
    </div>
  );
}
