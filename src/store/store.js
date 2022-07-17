import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) => {  //Display a loader icon when your actions make request to your backend to process data and clear the loader icon when data gets to your reducers. we can do this with middleware
    if(!action.type) { 
        return next(action);
    }

    console.log('tyep', action.type);
    console.log('payload', action.payload);
    console.log('currentState', store.getState());

    next(action); //synchronous function that's why we can get the next state after this

    console.log('next state', store.getState());
}

const middleWares = [loggerMiddleware];

const compoesedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, compoesedEnhancers); // the second argument is : if you wanna add any additional default state here