import React from 'react';
import style from './DialogBoxModel.module.css';
import Backdrop from '../Backdrop/Backdrop';

const DialogBox = ({ show, close, children }) => {
    return (
        <>
            <Backdrop click={close} isVisible={show} />
            <div className={style.Modal}
                style={
                    {
                        transform: show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: show ? "1" : "0"
                    }}>
                {children}
            </div>
        </>
    );
};

export default React.memo(DialogBox, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show ||
        nextProps.children === prevProps.children;
});