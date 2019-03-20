import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from '../ContactData/ContactData.css';

import Button from '../../../components/UI/Backdrop/Button/Button';

import axios from 'axios';

import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';



class ContantData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
           this.setState({loading : true});
           const userData = {};

           for(let element in this.state.orderForm){
                userData[element] = this.state.orderForm[element].value;
           }
          const order = {
              ingredient : this.props.ings,
              price : this.props.price,
              name : 'Bhaurao',
              contactData : userData
          }

          axios.post('https://my-burger-1589e.firebaseio.com/orders.json',order)
          .then(Response => {
              //this.props.match.params(this.state);
             // let redirect = <Redirect to="/checkout"></Redirect>
            this.setState({loading : false});
            console.log("In post response")
            console.log(Response);
            this.props.history.push('/');
          }).catch(err =>{
            this.setState({loading : false});
          })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }
    
    render(){
      console.log("In contact data");
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
          formElementsArray.push({
              id: key,
              config: this.state.orderForm[key]
          });
      }
      let form = (
          <form onSubmit={this.orderHandler}>
              {formElementsArray.map(formElement => (
                  <Input 
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      changed={(event) => this.inputChangedHandler(event, formElement.id)} />
              ))}
              <Button btnType="Success">ORDER</Button>
          </form>
      );
        return(
            <div className={classes.ContactData}>
            {this.state.loading ? <Spinner /> : null}
                <h3>Provide Your information</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings : state.ingredients,
        price : state.totalPrice
    }
}
export default connect(mapStateToProps)(ContantData);