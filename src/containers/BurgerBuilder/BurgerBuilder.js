import React, { Component } from 'react';
import Hoc from '../../hoc/Hoc';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';

//import { Redirect } from 'react-router-dom';
class BurgerBuilder extends Component{
    
    state= {
        ingredients : null,
        totalPrice:4,
        purchasable : false,
        showModal : false,
        loading : false,
        error : false,
        redirect : false
      };

     
      componentDidMount = () =>{
          
        axios.get('https://my-burger-1589e.firebaseio.com/ingredients.json')
            .then(Response =>{
                console.log("Response is")
                    console.log(Response);
                    this.setState({ingredients : Response.data});
            }).catch(err=>{
                console.log("error in componentDidMount");
                this.setState({error : true});
            })
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

      addIngredent = (type) => {
          
          let oldIndgredentType = this.state.ingredients[type];
          let newIngrediantValue = oldIndgredentType + 1;
          let newState = {
                ...this.state
            };
          newState.ingredients[type] = newIngrediantValue;
          newState.totalPrice = this.state.totalPrice + 1;
            console.log("Total price ",newState.totalPrice);
          this.setState({
                state : newState,
                totalPrice : newState.totalPrice
          });
          this.updatePurchasable(newState.ingredients);
          
      }

      removeIngredients = (type) =>{
          let oldIndgredentType = this.state.ingredients[type];
          if(oldIndgredentType > 0){
            let newIngrediantValue = oldIndgredentType - 1;
            let newIngrediant = {
                ...this.state.ingredients
            };

            newIngrediant[type] = newIngrediantValue;
            let totalPrice = this.state.totalPrice - 1;
            
            this.setState({
                ingredients : newIngrediant,
                totalPrice : totalPrice
            })
            this.updatePurchasable(newIngrediant);
        }
      }

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
        
        let diabledInfo = {
            ...this.state.ingredients
        };
        
        for(let obj in diabledInfo){
            diabledInfo[obj] = diabledInfo[obj] <= 0;
        }
        let orderSummary = null;
    
       
        let burger = this.state.error ? <p>Error occired </p>: <Spinner></Spinner>;
        if(this.state.ingredients){
              burger = (
                <Hoc>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls 
                    clickMore={this.addIngredent} 
                    clickLess={this.removeIngredients}
                    disabledInfo={diabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    updateShowModelEvent={this.purchasehandler} />
                </Hoc>
            );

            orderSummary = <OrderSummary ingredient={this.state.ingredients}
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

export default BurgerBuilder;