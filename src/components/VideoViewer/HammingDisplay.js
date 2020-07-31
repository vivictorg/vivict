import React from 'react';

const HammingDisplay = ({hidden, hamming, avg_hamming}) => (<div hidden={hidden} className="hamming-display">PHQM: {hamming} PHQMavg: {avg_hamming}</div>);

export default HammingDisplay;
