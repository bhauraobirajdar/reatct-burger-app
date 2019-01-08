import React, {Component } from 'react';

import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary';

import ContactData from '../Checkout/ContactData/ContactData';

import {Route} from 'react-router-dom';

class Checkout extends Component{
    
    state = {
        ingredients :null,
        price : 0
        
      }

      componentWillMount = () =>{
           const queryPrams = new URLSearchParams(this.props.location.search);
          let price = 0;
           const ingredients = {};
           for(let params of queryPrams.entries()){
               if(params[0] === 'price'){
                price = +params[1];
               }else{
                ingredients[params[0]] = +params[1];
               }
              
            }
            this.setState({ingredients : ingredients, price : price});
            console.log(ingredients); 
      }

      cancelClick = () =>{
        
          this.props.history.replace('/');
      }

      continueClick = () =>{
        this.props.history.replace('/checkout/concat-data');
    }
    render(){
        console.log("In checkout Component");
        console.log(this.props);
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    cancelClick={this.cancelClick}
                    continueClick = {this.continueClick}>
                </CheckoutSummary>
                <Route 
                    path={this.props.match.path +"/concat-data"} 
                    render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>}></Route>
            </div>
        )   
     }
}
export default Checkout;