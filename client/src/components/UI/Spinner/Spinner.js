import React from 'react';
import style from './Spinner.module.css';

const Spinner = () => (
    <div className={style.container}>
        <div className={style.Loader}>Loading...</div>
    </div>
);

export default Spinner;