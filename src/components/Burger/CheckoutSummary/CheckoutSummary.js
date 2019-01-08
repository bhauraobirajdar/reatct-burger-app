import React from 'react';

import Burger from '../Burger';

import Button from '../../UI/Backdrop/Button/Button';

const CheckoutSummary = (props) => {
    return (
        <div style={{textAlign : "center"}}>
            <Burger ingredients={props.ingredients}></Burger>
            <Button btnType="Success" clicked={props.continueClick}>Continue</Button>
            <Button btnType="Danger" clicked={props.cancelClick}>Cancel</Button>
            

        </div>
)
    }

export default CheckoutSummary;