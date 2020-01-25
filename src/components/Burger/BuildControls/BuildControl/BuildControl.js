import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => {
    let disabled = true;
    if (props.ingredientCount > 0) {
        disabled = false;
    }
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button onClick={props.removed} className={classes.Less} disabled={disabled}>Less</button>
            <button onClick={props.added} className={classes.More}>More</button>
        </div>
    )
};

export default buildControl;