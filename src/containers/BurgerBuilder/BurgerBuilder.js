import React, { Component } from 'react';
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


class BurderBuilder extends Component {
    state = {
        purchasing: false  // es imena order ro gvinda
    }

    componentDidMount() {
        //console.log(this.props);
        //https://react-burger-3fb36.firebaseio.com/ingredients.json
        this.props.initIngredients();
        
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase(); // aq gaxdeba purchased: false da checkput.js shi
                                    // agar gadmova Home pagze       
        this.props.history.push('/checkout');
    }

    render() {

        let orderSummary = null;

        let burder = this.props.error ? <p>dagvendzra</p> : <Spinner />;

        if (this.props.ings) {
            burder = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        controls={this.props.ings}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                ingredients={this.props.ings} />
        }        

        return (
            <Aux>
                {/* <div>Burger</div> */}
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burder}
            </Aux>
        );
    };
} 

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)), //!!!
        initIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurderBuilder, axios));