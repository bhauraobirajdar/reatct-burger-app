import React from 'react';
import classes from './Order.css'
const Order = (props) =>{
    console.log(props)
    const ingredientsArray = [];
    for(let key in props.ingredients){
        ingredientsArray.push({
            key : key,
            quantity : props.ingredients[key]
        });
    }
    console.log(ingredientsArray);
    const outputArray = ingredientsArray.map(data =>{
        return <span> {data.key}({data.quantity})</span>
    })

    return(
        <div className={classes.Order}>
        <p>
            Ingredient : {outputArray}
        </p>
        <p>
            Price : <strong>{props.price}</strong>
        </p>
    </div>
    )
   
}

export default Order;   