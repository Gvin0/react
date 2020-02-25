import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                orderId: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder), // es me mgoni prosta ari ))
                loading: false,
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            //nu ideashi pormatis cvlileba actionCreatorshi jobia
            //aq logika shevcvalot mara araushavs
            const orders = [];
            for (let key in action.orders){
                const order = {
                    ...action.orders[key],
                    orderId: key
                }
            orders.push(order);
            }
            return {
                ...state,
                orders: orders,                 
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }

};

export default reducer;