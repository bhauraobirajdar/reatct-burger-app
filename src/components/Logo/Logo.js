import React from 'react';

import BurgerLogo from '../../assets/images/burger-logo.png';

import classes from './Logo.css'

const Logo = () => (
    <div className={classes.Logo}>
     <img src={BurgerLogo} alt="BurgerImage"></img>
     </div>
);

export default Logo;
