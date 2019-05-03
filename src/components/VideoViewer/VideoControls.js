import React from 'react';
import cx from 'classnames';
import {FiPlay, FiPause, FiSkipBack, FiSkipForward, FiMaximize} from 'react-icons/fi';


const VideoControls = ({onPlay, onStep, onFullscreen, playing, onSeek, position, duration}) => {

    return (<div className="controls">
        <button className="btn btn-default" onClick={(event) => {
            onStep(-1);
            event.stopPropagation();
        }}><FiSkipBack /></button>
        <button className={cx('btn', 'btn-default') }
                onClick={(event) => {
                    console.log('play/pause: ' );
                    onPlay();
                    event.stopPropagation();
                }}>{playing ? (<FiPause/>) : (<FiPlay />)}</button>
        <button className="btn btn-default" onClick={(event) => {
            onStep(1);
            event.stopPropagation();
        }}><FiSkipForward/></button>

        <input type="range" value={position} min="0" max={duration} step="0.04" onInput={(e) => {
            console.log(`range value: ${e.target.value}`);
            const nextPos = parseFloat(e.target.value);
            onSeek(nextPos);
            e.stopPropagation();
        }} />

        <button className="btn btn-default glyphicon glyphicon-fullscreen" onClick={(event) => {
            onFullscreen();
            event.stopPropagation();
        }}><FiMaximize/></button>
    </div>)
};

export default VideoControls;