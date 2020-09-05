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
const SAVING = "SAVING"

const Appointment = props => {
  const {mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // get name, interviewer from Form input
  const save = (name, interviewer) => {
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

  // const back = () => {
    
  // }

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
      />
    )}
    {mode === CREATE && (<Form 
      interviewers={props.interviewers}
      onCancel={() => back(EMPTY)}
      onSave={save}
    />)}
    {mode === SAVING && (<Status />)}
    </article>
  )

}

export default Appointment;