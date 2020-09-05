import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from './Status';
import Confirm from './Confirm';
import Form from '../Form';
import { useVisualMode } from '../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

const Appointment = props => {
  const {mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // get name, interviewer from Form input
  const onSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer
    }

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => {
      console.log(err)
    })
  }

  const remove = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <article 
      className="appointment"
    >
    <Header 
      time={props.time}
    />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && (<Form 
      interviewers={props.interviewers}
      onCancel={() => back(EMPTY)}
      onSave={onSave}
    />)}
    {mode === SAVING && (<Status 
      message="Saving"
    />)}
    {mode === CONFIRM && (<Confirm 
      message="Are you sure?"
      onCancel={() => back(SHOW)}
      onConfirm={remove}
    />)}
    {mode === DELETING && (<Status 
      message="Deleting"
    />)}
    {mode === EDIT && <Form 
      interviewers={props.interviewers}
      onCancel={() => back(EMPTY)}
      onSave={onSave}
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
    />}
    </article>
  )

}

export default Appointment;