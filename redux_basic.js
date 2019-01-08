var redux = require("redux");

const createStore = redux.createStore;

const initailState = {
    counter : 0
}

const rootReducer = (state = initailState,action) =>{
   
    if(action.type == 'INC_COUNTER'){
        return{
            
            counter : state.counter + 1
        }
    }

    if(action.type == "ADD_COUNTER"){
        console.log("In add counter ",state.counter)
        return {
           
            counter2 : state.counter + action.value
        }
    }
    return state;
}

store = createStore(rootReducer);

console.log(store.getState());

store.dispatch({type : "INC_COUNTER"});
store.dispatch({type : "ADD_COUNTER", value : 10});
console.log(store.getState())
