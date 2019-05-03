import React from 'react';

function sign(offset) {
    return offset > 0 ? '+' : '';
}

const OffsetIndicator = ({offset}) => {
    if (offset === 0.0) {
        return null;
    }
    return (<div className="offset-indicator">offset: {sign(offset)}{offset * 0.04}</div>)
};

export default OffsetIndicator;