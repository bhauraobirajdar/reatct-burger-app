import * as actionTypes from './action';

const intialState = {

    ingredients : null,
    totalPrice:4
}

const reducer = (state=intialState,action) => {
    switch(action.type){
        case  actionTypes.ADD_INGREDIENT :
            return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName] : statte.ingredientname[action.ingredientName] + 1
                    }
                }
            
        case actionTypes.REMOVE_INGREDIENT : 
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : statte.ingredientname[action.ingredientName] - 1
                }
            }
    }
}

export default reducer;