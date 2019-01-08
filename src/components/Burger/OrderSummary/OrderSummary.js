import React from 'react';

import Aux from '../../../hoc/Hoc';

import Button from '../../UI/Backdrop/Button/Button';

const OrderSummary = (props) => {
    console.log("Order summary");
    const ingredientInfo = Object.keys(props.ingredient)
    .map(key =>{
        return (
            <li key={key}> <span style={{textTransform : "capitalize"}}>{key}</span> : {props.ingredient[key]}</li>
        )
    })
    console.log("Order simmary");
    console.log(ingredientInfo);
    return(
         <Aux>
            <ul>
                <h3>Your Order</h3>
                <p>A burger contains following ingredient</p>
                {ingredientInfo}
            </ul>
            <p>
                <strong>Total Price : {props.price}</strong>
            </p> 
            <p>You want to do checkout ? </p>
           
            <Button btnType='Success' clicked={props.purchaseConitnueHandler}>Continue</Button>
            <Button btnType="Danger" clicked={props.cancelPurchase}>Cancel</Button>


        </Aux>
    )
}

export default OrderSummary;