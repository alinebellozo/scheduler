import React from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={props.name}
        />
      </form>
      <InterviewerList 
        interviewers={props.interviewers} value={props.interviewer && props.interviewer.id}
      />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger >{props.onCancel}</Button>
          <Button confirm >{props.onSave}</Button>
        </section>
      </section>
    </main>
  );
}