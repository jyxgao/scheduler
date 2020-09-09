import { useState, useEffect } from 'react';
import axios from 'axios';
import { getSpotsRemaining } from '../../helpers/selectors';

export function useApplicationData () {
  // const getSpotsForDay = (day, appointments) => day.appointments.length-day.appointments.reduce((count, id) => {
  //   if (appointments[id].interview) {
  //     return count+1;
  //   } else {
  //     return count;
  //   }
  // })

  const bookInterview = (appointmentId, interview) => {
    const appointment = {
      // get current interview
      ...state.appointments[appointmentId],
      // replace interview
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    }

    // const days = state.days.map(day => {
    //   if (day.appointments.includes(appointmentId)) {
    //     return { ...day, spots: day.appointments.length-1}
    //   }
    //   return day;
    // })


    return axios.put(`/api/appointments/${appointmentId}`, appointment)
      .then(res => {
          setState((prev) => ({
            ...prev,
            appointments
            // days
        }))
      })
  }

  const cancelInterview = (appointmentId) => {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    }

    // const day = {
    //   ...state.days[]
    // }
    // const days = {
    //   ...state.days,
    //   spots: getSpotsRemaining(state, state.day)
    // }
   
    return axios.delete(`/api/appointments/${appointmentId}`, appointment)
    .then(res => {
      setState(prev => ({
        ...prev,
        appointments
        // days
      }))
    })
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
    // spots: 5
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
        interviewers: response[2].data,
        // spots: getSpotsRemaining(state, state.day)
      }))
    })

  }, []) //[state]

  const setDay = day => 
    setState(prev => ({
      ...prev,
      day: day
    }))
  

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}