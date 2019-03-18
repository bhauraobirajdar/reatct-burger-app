import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hoc from '../../hoc/Hoc';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';



import * as actionTypes from '../../stote/action';


//import { Redirect } from 'react-router-dom';
class BurgerBuilder extends Component{
    
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

     
      componentDidMount = () =>{
          
        // axios.get('https://my-burger-1589e.firebaseio.com/ingredients.json')
        //     .then(Response =>{
        //         console.log("Response is")
        //             console.log(Response);
        //             this.setState({ingredients : Response.data});
        //     }).catch(err=>{
        //         console.log("error in componentDidMount");
        //         this.setState({error : true});
        //     })
      };
      updatePurchasable = (ingredients) =>{
        //let ingredients = { ...this.state.ingredients};
        let sum = Object.keys(ingredients)
        .map(key =>{
            return ingredients[key];
        })
        .reduce((pre,cur) =>{
            return pre + cur;
        },0);

        this.setState({
            purchasable : sum > 0
        })
        console.log("Sum iss ",sum);
      }

    //   addIngredent = (type) => {
          
    //       let oldIndgredentType = this.state.ingredients[type];
    //       let newIngrediantValue = oldIndgredentType + 1;
    //       let newState = {
    //             ...this.state
    //         };
    //       newState.ingredients[type] = newIngrediantValue;
    //       newState.totalPrice = this.state.totalPrice + 1;
    //         console.log("Total price ",newState.totalPrice);
    //       this.setState({
    //             state : newState,
    //             totalPrice : newState.totalPrice
    //       });
    //       this.updatePurchasable(newState.ingredients);
          
    //   }

    //   removeIngredients = (type) =>{
    //       let oldIndgredentType = this.state.ingredients[type];
    //       if(oldIndgredentType > 0){
    //         let newIngrediantValue = oldIndgredentType - 1;
    //         let newIngrediant = {
    //             ...this.state.ingredients
    //         };

    //         newIngrediant[type] = newIngrediantValue;
    //         let totalPrice = this.state.totalPrice - 1;
            
    //         this.setState({
    //             ingredients : newIngrediant,
    //             totalPrice : totalPrice
    //         })
    //         this.updatePurchasable(newIngrediant);
    //     }
    //   }

      purchasehandler = () => {
        this.setState({showModal : true});
      }

      cancelPurchases = () =>{
          this.setState({showModal : false});
      }

      purchaseConitnueHandler = () =>{
       

        const QueryParams = [];

        for(let i in this.state.ingredients){
            QueryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]));
        }
        QueryParams.push("price="+this.state.totalPrice);
        const queryString = QueryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : '?'+queryString
        })
      }

   

    render() {
        
        let disabledInfo = {
            ...this.props.ings
        };


        
        for(let obj in disabledInfo){
            disabledInfo[obj] = disabledInfo[obj] <= 0;
        }
        let orderSummary = null;
    
       
        let burger = this.state.error ? <p>Error occired </p>: <Spinner></Spinner>;
        if(this.props.ings){
            console.log("Ingsssssssss");
            console.log(this.props.ings);
              burger = (
                <Hoc>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls 
                    clickMore={this.props.onIngredientAdded} 
                    clickLess={this.props.onIngreidentRemoved}
                    disabledInfo={disabledInfo}
                    totalPrice={this.props.price}
                    purchasable={this.state.purchasable}
                    updateShowModelEvent={this.purchasehandler} />
                </Hoc>
            );

            orderSummary = <OrderSummary ingredient={this.props.ings}
            cancelPurchase={this.cancelPurchases}
            purchaseConitnueHandler={this.purchaseConitnueHandler}
            price={this.state.totalPrice}  />;
            
         }
         if(this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }
      
          
        return  (
            <Hoc>
                <Modal show={this.state.showModal} 
                closeModal={this.cancelPurchases}>
                
                   {orderSummary}
                </Modal>
                {burger}
                {this.state.redirect}
            </Hoc>
        );
    }
}

const mapStateToProps = state => {
    console.log("typeeeeeeee");

    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngreidentRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
console.log("State");
console.log(mapStateToProps);
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));