import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //aq burgerbuilderidan propshi ar wamova history location da search
    //tu gvinda withRouter unda gamoviyenot!!!
    console.log(props);
    
    //js objectia not react! aketebs key_ebis arrays
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            //[...Array(2)] == [,] js objectia not react!
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);
        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please, start adding ingredients</p>
        }
        //console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;