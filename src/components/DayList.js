import React from 'react';
import DayListItem from './DayListItem';
// import { DayListItem } from 'components/DayListItem';

const DayList = props => {
  const {days} = props;
  const dayListItems = days.map(day => {
    return (
        <DayListItem 
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
    )
  });

  return dayListItems;
}

export default DayList;