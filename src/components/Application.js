import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from './DayList';
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(response => {
      setState(prev => ({
        ...prev, 
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }))
    })
  }, [])

  // Promise.all([axios.get(....), axios.get(....), axios.get(...)]).then(res => setState(days: res.data[0], appointments: res.data[1], interviewers: res.data[2])
  const setDay = day => 
    setState(prev => ({
      ...prev,
      day: day
    }))

  // const setDays = days =>
  //   setState(prev => ({
  //     ...prev,
  //     days
  //   }))  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            day={state.day}
            setDay={setDay}
           />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(appointment => {
          const interview = getInterview(state, appointment.interview);
          const interviewers = getInterviewersForDay(state, state.day);
          return (<Appointment 
            key={appointment.id} {...appointment}
            interview={interview}
            interviewers={interviewers}
            // time={appointment.time}
            // interview={appointment.interview}
          />)
        })
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
