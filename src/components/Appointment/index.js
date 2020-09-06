import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import Form from '../Form';
import { useVisualMode } from '../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
      transition(ERROR_SAVE, true)
      console.log(err)
    })
  }

  const remove = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => {
      transition(ERROR_DELETE, true)
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
    {mode === EDIT && (<Form 
      interviewers={props.interviewers}
      onCancel={() => back(EMPTY)}
      onSave={onSave}
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
    />)}
    {mode === ERROR_SAVE && (<Error 
      message="Error Saving"
      onClose={() => transition(props.interview? SHOW : EMPTY)}
    />)}
    {mode === ERROR_DELETE && (<Error 
      message="Error Deleting"
      onClose={() => transition(SHOW)}
    />)}
    </article>
  )

}

export default Appointment;