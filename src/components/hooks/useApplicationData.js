import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAppointmentsForDay, getSpotsRemaining } from '../../helpers/selectors';

export function useApplicationData () {
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

    return axios.put(`/api/appointments/${appointmentId}`, appointment)
      .then(res => {
          setState((prev) => ({
            ...prev,
            appointments
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

    return axios.delete(`http://localhost:8001/api/appointments/${appointmentId}`, appointment)
    .then(res => {
      setState(prev => ({
        ...prev,
        appointments
      }))
    })
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 5
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
        spots: getSpotsRemaining(state, state.day)
      }))
    })
  }, [state.days])

  // useEffect(() => {
      // axios.get('/api/days')
  //   setState(prev => ({
  //     ...prev,
  //     spots: getSpotsRemaining(state, state.day)
  //   }))
  // }, [state.spots])

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