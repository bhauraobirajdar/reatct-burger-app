import React from 'react';

import classes from './Burger.css';

import BurgerIngrediant from './BurgerIngredent/BurgerIngredient';

import { withRouter } from 'react-router-dom';

const Burger = (props) => {
    console.log("In burger");
    console.log(props);
    const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngrediant key={igKey + i} type={igKey}></BurgerIngrediant>;
        })
    })
    .reduce((pre,curr) =>{
        //console.log(pre);
       // console.log(curr)
        return pre.concat(curr);
    },[])
    console.log(transformedIngredients);
    return (
         <div className={classes.Burger}>
          
            <BurgerIngrediant type="bread-top"></BurgerIngrediant>
            {transformedIngredients}Please add ingredients
            <BurgerIngrediant type="bread-bottom"></BurgerIngrediant>
        </div>
    )
}
export default withRouter(Burger);
