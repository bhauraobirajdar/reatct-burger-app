import React from 'react';

import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';

import Navigations from '../NavigationItems/NavigationItems';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <Logo></Logo>
        <nav>
            <Navigations></Navigations>
        </nav>
    </header>
)

export default Toolbar;