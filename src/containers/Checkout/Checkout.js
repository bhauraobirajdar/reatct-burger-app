import React, {Component } from 'react';
import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary';

import ContactData from '../Checkout/ContactData/ContactData';

import {Route} from 'react-router-dom';

import { connect } from 'react-redux';
//import { stat } from 'fs';

class Checkout extends Component{
    
    // state = {
    //     ingredients :null,
    //     price : 0        
    //   }

    //   componentWillMount = () =>{
    //        const queryPrams = new URLSearchParams(this.props.location.search);
    //       let price = 0;
    //        const ingredients = {};
    //        for(let params of queryPrams.entries()){
    //            if(params[0] === 'price'){
    //             price = +params[1];
    //            }else{
    //             ingredients[params[0]] = +params[1];
    //            }
              
    //         }
    //         this.setState({ingredients : ingredients, price : price});
    //         console.log(ingredients); 
    //   }

      cancelClick = () =>{
        
          this.props.history.replace('/');
      }

      continueClick = () =>{
          console.log("Conitue clickkk")
        this.props.history.replace('/checkout/concat-data');
    }
    render(){
        console.log("In checkout Component");
        console.log(this.props);
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    cancelClick={this.cancelClick}
                    continueClick = {this.continueClick}>
                </CheckoutSummary>
                <Route 
                    path={this.props.match.path +"/concat-data"} 
                    component={ContactData}> </Route>
            </div>
        )   
     }
}

const mapStateToProps = state =>{
    return{
        ings : state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout);