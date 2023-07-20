import { useState, useEffect } from "react";
import axios from "axios";

export default function useAplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function updateSpots(appointments) {

    let dayIndex = 0;

    const days = state.days;
 
    const day = days.find((item, index) => {
      if (item.name === state.day) {
        dayIndex = index;
        return item;
      }
    })

    let spots = 0;

    for (let appointmentId of day.appointments) {
      const appointment = appointments[appointmentId];

      if (!appointment.interview) {
        spots += 1;
      }
    }

    day.spots = spots;

    days.splice(dayIndex, 1, day);

    return days;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments, days: updateSpots(appointments) }))
      .catch((err) => console.log(err));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() =>
        setState({ ...state, appointments, days: updateSpots(appointments) })
      )
      .catch((err) => console.log(err));
    }

  return { state, setDay, bookInterview, cancelInterview };

};