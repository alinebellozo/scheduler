import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (numOfSpots) => {
    if (numOfSpots === 0) {
      console.log("numOfSpots 1", numOfSpots);
      return "no spots remaining";
    }
    if (numOfSpots === 1) {
      console.log("numOfSpots 2", numOfSpots);
      return "1 spot remaining";
    }
    console.log("numOfSpots 3", numOfSpots);
    return `${numOfSpots} spots remaining`;
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
