import React from 'react';
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {

    //OrderSummary shi zedmeti Check agar gaketetdeba!
    //tu romelive gansxvavebulia marto mashin
    // es wrapperia da aq magito vqenit
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== props.show || nextProps.children !== props.children;
    // }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Aux>
    );
}
//aq piriqit logika gavaketet radganac egre mushaobs React.memo 
//igive memorize zevit gansxvavebas daicherda
//memo kide cache_avs da adarebs tu daemtxva agar daarenderebs
export default React.memo(Modal, (prevProps, nextProps) => 
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);