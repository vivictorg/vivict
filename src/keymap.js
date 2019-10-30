

const command = (name, keys, description) => ({
        name,
        keys,
        description
});

export const COMMANDS = {
        PLAY: command('PLAY', 'l', 'Play video'),
        PAUSE: command('PAUSE', 'k', 'Pause video'),
        PLAY_PAUSE: command('PLAY_PAUSE', 'space', 'Play/Pause video'),
        STEP_FORWARD_FRAME: command('STEP_FORWARD_FRAME', '.', 'Step forward 1 frame'),
        STEP_BACKWARD_FRAME: command('STEP_BACKWARD_FRAME', ',', 'Step backward 1 frame'),
        STEP_FORWARD: command('STEP_FORWARD', ['/', '-'], 'Step forward 1 second'),
        STEP_BACKWARD: command('STEP_BACKWARD', 'm', 'Step backward 1 second'),
        FULLSCREEN: command('FULLSCREEN', 'f', 'Toggle full screen'),
        SHARE: command('SHARE', 'c', 'Copy shareable url to clipboard'),
        TOGGLE_TRACKING: command('TOGGLE_TRACKING', 't', 'Toggle split position follows mouse'),
        LEFT_ONLY: command('LEFT_ONLY', ']', 'View only left video'),
        RIGHT_ONLY: command('RIGHT_ONLY', '[', 'View only right video'),
        TIMESHIFT_DECREASE: command('OFFSET_DECREASE', '<', 'Decrease timeshift between videos'),
        TIMESHIFT_INCREASE: command('OFFSET_INCREASE', '>', 'Increase timeshift between videos'),
        TIMESHIFT_RESET: command('OFFSET_RESET', 'r', 'Reset timeshift between videos'),
        ZOOM_IN: command('ZOOM_IN', 'u', 'Zoom in'),
        ZOOM_OUT: command('ZOOM_OUT', 'i', 'Zoom out'),
        PAN_UP: command('PAN_UP', 'up', 'Pan up'),
        PAN_DOWN: command('PAN_DOWN', 'down', 'Pan down'),
        PAN_RIGHT: command('PAN_RIGHT', 'right', 'Pan right'),
        PAN_LEFT: command('PAN_LEFT', 'left', 'Pan left'),
        REST_PAN_ZOOM: command('RESET_PAN_ZOOM', '0', 'Reset pan and zoom to default'),
        TOGGLE_HELP: command('TOOGLE_HELP', 'esc', 'Toggle help window'),
        TOGGLE_SPLIT_BORDER_VISIBLE: command('TOGGLE_SPLIT_BORDER_VISIBLE', 's', 'Toggle split border visible')
};


export const KEY_MAP = Object.keys(COMMANDS).reduce((result, key) => Object.assign(result, {[COMMANDS[key].name]: COMMANDS[key].keys}), {});

console.log(`KEY_MAP: ${JSON.stringify(KEY_MAP)}`);