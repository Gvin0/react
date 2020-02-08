import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErroHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurderBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false, // orderze marto mashin achers rame ingredienti tu aq damatebuli
        purchasing: false,  // es imena order ro gvinda
        loading: false,
        error: false
    }

    componentDidMount() {
        //https://react-burger-3fb36.firebaseio.com/ingredients.json
        axios.get('https://react-burger-3fb36.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({
                    ingredients: res.data
                });
            }).catch(err => {
                this.setState({
                    error: true
                });
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        // setStates cvlilebas ver xedavs updatePurchaseState punqcia
        // magito gadavawodet shecvlili State parametrat
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
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
        //alert('You continue!')
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Levan Gviniashvili',
                address: {
                    street: 'vaja-fshavela 26',
                    zipCode: '2626',
                    country: 'Georgia',
                },
                email: 'levanigvino@gmail.com',
            },
            delivery: 'superfast'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            }).catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
    }

    render() {

        let orderSummary = null;        

        let burder = this.state.error ? <p>dagvendzra</p> : <Spinner />;

        if (this.state.ingredients) {
            burder = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        controls={this.state.ingredients}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                ingredients={this.state.ingredients} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurderBuilder, axios);