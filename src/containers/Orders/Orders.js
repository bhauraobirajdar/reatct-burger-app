import React, { Component } from 'react';

import Order from '../../components/Order/Order';

import Axios from 'axios';

class Orders extends Component {
    state = {
        data : []
    }
    componentDidMount(){
        Axios.get('https://my-burger-1589e.firebaseio.com/orders.json')
        .then(res =>{
             let arrData = []   
            for(let key in res.data){
               arrData.push({
                   ...res.data[key],
                   id : key
               });
            }
            this.setState({data:arrData});

           
        });
    }
    render(){
        // let ordersData = this.state.data.map(data =>{
                
        //     return (
        //         <Order ingredients={data.ingredient} price={data.price}></Order>
        //     )
        // })
        return (
            <div>
                {this.state.data.map(data =>(
                   <Order key={data.id} ingredients={data.ingredient} price={data.price}></Order> 
                ))}
            

               
            </div>
        )
    }
}

export default Orders;