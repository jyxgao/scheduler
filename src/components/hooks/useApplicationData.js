import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const updateSpots = function (increment) {
    const copiedDays = [...state.days];

    const updateDays = copiedDays.map((day) => {
      if (day.name === state.day) {
        return { ...day, spots: day.spots + increment };
      }
      return day;
    });
    return updateDays;
  };

  const bookInterview = (appointmentId, interview, isCreate) => {
    const appointment = {
      // get current interview
      ...state.appointments[appointmentId],
      // replace interview
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment,
    };

    return axios
      .put(`/api/appointments/${appointmentId}`, appointment)
      .then((res) => {
        let updatedDays = [];
        if (isCreate) {
          updatedDays = updateSpots(-1);
        } else {
          updatedDays = updateSpots(0);
        }
        setState((prev) => ({
          ...prev,
          appointments,
          days: updatedDays,
        }));
      });
  };

  const cancelInterview = (appointmentId) => {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment,
    };

    return axios
      .delete(`/api/appointments/${appointmentId}`, appointment)
      .then((res) => {
        const updatedDays = updateSpots(+1);
        setState((prev) => ({
          ...prev,
          appointments,
          days: updatedDays,
        }));
      });
  };

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onopen = event => socket.send("ping")
    socket.onmessage = event => {
      console.log('Message Received: ', event.data)
      const interviewReceived = JSON.parse(event.data)

      if (interviewReceived.type === 'SET_INTERVIEW') {
        console.log(interviewReceived)
      }
    }
  })
  
  const setDay = (day) =>
    setState((prev) => ({
      ...prev,
      day: day,
    }));

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
