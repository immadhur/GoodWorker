import React from 'react';
import style from './Button.module.css';

const button = (props) => (
    <button className={[style.Button, props.type === 'continue' ? style.Success : style.Danger].join(" ")}
    onClick={props.click}>
        {props.children}
    </button>
);

export default button;