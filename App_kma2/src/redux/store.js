//import {createStore,applyMiddleware} from 'redux'
import {configureStore} from "@reduxjs/toolkit"
import thunk from 'redux-thunk';
import reducer from './reducers';

//const middleware = [thunk];
// export const store =  createStore(
//     reducer,
//     applyMiddleware(...middleware)
// ) 
export const store =  configureStore(
    {reducer}
    // {reducer:{
    //     users: usersReducer,
    // }}
    //applyMiddleware(...middleware)
) 
