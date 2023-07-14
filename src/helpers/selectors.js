function getAppointmentsForDay(state, day) {
  const results = [];
  
  // find the object in state.days array who's name matches the provided day to access that specific days appointment array
  const filteredDay = state.days.filter(d => d.name === day);
  
  // if there are no appointments on the given day, days data will be empty - in a case like this, we should return an empty array
  if(!filteredDay[0]) {
    return results;
  }
    
  //  iterate through the array, comparing where it's id matches the id of states.appointments and return that value
  for (let arr of filteredDay[0].appointments) {
    results.push(state.appointments[arr]);
  }

  return results;
};

function getInterview(state, interview) {

  if(!interview) {
    return null;
  }

  const interviewerData = state.interviewers[interview.interviewer];

  return {
    student: interview.student,
    interviewer: interviewerData
  }
 
}

export {getAppointmentsForDay, getInterview};