
export function getAppointmentsForDay (state, day) {
  const result = [];

  if (Array.isArray(state.days)) {
    
    const appointmentOfDay = state.days.filter((obj) => obj.name === day)[0];
    if (!appointmentOfDay) {
      return result;
    }
    const appointmentId = appointmentOfDay.appointments;    
    const appointments = state.appointments;

    for (let appointment in appointments) {
      if (appointmentId.includes(appointments[appointment].id)) {
        result.push(appointments[appointment])
      }
    }
  }
  return result;
};

export function getInterview (state, interview) {
  if (!interview) {
    return null;
  }

  const result = {};
  result.student = interview.student;
  result.interviewer = state.interviewers[interview.interviewer];
  return result;
};

export function getInterviewersForDay (state, day) {
  const result = [];

  if (Array.isArray(state.days)) {
    const interviewersOfDay = state.days.filter((obj) => obj.name === day)[0];
    if (!interviewersOfDay) {
      return result;
    }
    const interviewersId = interviewersOfDay.interviewers;    
    const interviewers = state.interviewers;

    for (let interviewer in interviewers) {
      if (interviewersId.includes(interviewers[interviewer].id)) {
        result.push(interviewers[interviewer])
      }
    }
  }
  return result;
}
