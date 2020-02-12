import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients);
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                    loading: false
                });
                this.props.history.push('/');
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData; 