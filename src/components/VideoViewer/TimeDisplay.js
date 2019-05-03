import React from 'react';
import formatTime from '../../util/formatTime';

const TimeDisplay = ({position}) => (<div className="time-display">{formatTime(position)}</div>);

export default TimeDisplay;