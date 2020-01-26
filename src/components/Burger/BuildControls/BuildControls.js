import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css'

const buildControls = (props) => {
    const transformedIngredients = Object.keys(props.controls).map((igKey, i) =>
        <BuildControl
            key={igKey + i}
            label={igKey}
            ingredientCount={props.controls[igKey]}
            added={() => props.ingredientAdded(igKey.charAt(0).toLowerCase() + igKey.substring(1))}
            removed={() => props.ingredientRemoved(igKey.charAt(0).toLowerCase() + igKey.substring(1))} />

    );
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {transformedIngredients}
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}
                >ORDER NOW</button>
        </div>
    );
};

export default buildControls;