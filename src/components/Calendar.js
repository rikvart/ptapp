import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function TrainingCalendar() {
    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings()
    });

    const fetchTrainings = () => {
        fetch(process.env.REACT_APP_API_CUSTOMERS_TRAININGS)
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else throw new Error (response.status)
        })
        .then(responseData => 
            setTrainings(responseData)
            )
        .catch(err => console.error(err))
    }

    const events = trainings.map((training) => {
        return {
            id: training.id,
            title: training.activity,
            start: new Date(training.date),
            end: new Date(training.date),
            allDay: false
        }
    })

    return (
        <Calendar 
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            views={['month', 'day', 'week']}
            style={{height: 600, paddingTop: '100px'}}
        />)
}