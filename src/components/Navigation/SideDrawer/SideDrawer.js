import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';
import classes from './SideDrawer.module.css'

const sideDrawer = (props) => {
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={props.open ? classes.SideDrawer : [classes.SideDrawer, classes.Close].join(' ') }>
                <Logo height="11%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
