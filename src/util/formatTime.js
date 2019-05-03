function formatTime(position) {
    const hours = Math.floor(position / 3600);
    const minutes = Math.floor((position % 3600) / 60);
    const seconds = Math.floor(position % 60);
    const frames = Math.floor((position - Math.floor(position)) / 0.04);
    return zeroPad(hours) + ':' + zeroPad(minutes) + ':'
        + zeroPad(seconds) + '.' + zeroPad(frames);
}

function zeroPad(num) {
    return num < 10 ? '0' + num : '' + num;
}

export default formatTime;