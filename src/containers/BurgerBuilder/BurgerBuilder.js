import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErroHandler';
//import * as actionTypes from '../../store/actions/actionTypes';
import axios from '../../axios-orders';

import * as actionCreators from '../../store/actions/index';

//export for testing
export const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false); // es imena order ro gvinda
    const { onInitIngredients } = props;
    useEffect(() => {
        onInitIngredients(); // eslint-disable-next-line
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        }
        else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase(); // aq gaxdeba purchased: false da checkout.js shi
        // agar gadmova Home pagze       
        props.history.push('/checkout');
    }


    let orderSummary = null;

    let burger = props.error ? <p>dagvendzra</p> : <Spinner />;

    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    controls={props.ings}
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    price={props.totalPrice}
                    purchasable={updatePurchaseState(props.ings)}
                    isAuth={props.isAuthenticated}
                    ordered={purchaseHandler} />
            </Aux>
        );
        orderSummary = <OrderSummary
            price={props.totalPrice}
            purchaseContinued={purchaseContinueHandler}
            purchaseCancelled={purchaseCancelHandler}
            ingredients={props.ings} />
    }

    return (
        <Aux>
            {/* <div>Burger</div> */}
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};


const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)), //!!!
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));