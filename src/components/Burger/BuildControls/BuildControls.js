import React from 'react';

import classes from './BuildControls.css';

import BuildControl from '../BuildControls/BuildControl/BuildControl'

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
] 
const BuildControls = (props) =>(
    <div className={classes.BuildControls}>
         <p>Current Price : {props.totalPrice}</p>
        {controls.map(ele => (
            <BuildControl
             label={ele.label} 
             key={ele.label} 
             type={ele.type} 
             addIngredent={() => props.clickMore(ele.type)}
             removeIngredients={() => props.clickLess(ele.type)}
             disableStatus={props.disabledInfo[ele.type]}
             />
        ))}
        <button onClick={props.updateShowModelEvent} className={classes.OrderButton} disabled={!props.purchasable}>Order Now</button>
    </div>
)

export default BuildControls;