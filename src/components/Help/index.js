import React from 'react';
import cx from 'classnames';
import {FiHelpCircle, FiX} from "react-icons/fi";
import './index.css';
import {COMMANDS} from '../../keymap';


const Help = ({visible, onClick}) => (
    <div className={cx('help', {'hidden': !visible})}>
        <div className='help-header'>
            <h3>Vivict - Vivict Video Comparison Tool</h3>
            <div className='close-button' onClick={() => onClick()}>
                <FiX />
            </div>
        </div>
        <div>
            <h4>Keybindings:</h4>
            {generateKeymapHelp()}
        </div>
    </div>);

const HelpButton = ({onClick, className}) => (
    <div className={"help-button " + className}
    onClick={(e) => onClick(e)}>
        <FiHelpCircle/>
    </div>
);

const generateKeymapHelp = () => {
    //return Array.from(KEY_MAP, ([key, value]) => (
    return Object.keys(COMMANDS).map(key => {
        const command = COMMANDS[key];
        return (
            <div key={"keybinding-" + command.name}><bold>{JSON.stringify(command.keys)}</bold>{"  " + command.description}</div>
        )
    });
};

export {Help, HelpButton}