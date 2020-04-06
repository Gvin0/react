import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErroHandler';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionCreators from '../../store/actions/index';


const Orders = props => {
    const { onFetchOrders } = props;
    useEffect(() => {
        onFetchOrders(props.token, props.userId); // eslint-disable-next-line
    }, [onFetchOrders])

    return (
        <div>
            {props.loading ? <Spinner /> : props.orders.map(order => (
                <Order
                    key={order.orderId}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))}
        </div>
    );
}

//connect_is magivrat shegvidzlio gamoviyenot: useSelector da useDispatch

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));