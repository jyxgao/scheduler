import React from 'react';
import 'components/DayListItem.scss';
import classnames from 'classnames';


export default function DayListItem(props) {
  // add conditional classes to list items
  const dayClass = classnames(
    "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots > 0 ? false : true
    }
  )
  
  const formatSpots = (spots) => {
    return `${spots ? spots : 'no'} ${spots === 1 ? 'spot' : 'spots'} remaining`
  } 

  return (
    <li className={dayClass} onClick={ () => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}