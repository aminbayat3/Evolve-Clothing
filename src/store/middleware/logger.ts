import { Middleware } from "redux";

import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {  //Display a loader icon when your actions make request to your backend to process data and clear the loader icon when data gets to your reducers. we can do this with middleware
    if(!action.type) { 
        return next(action);
    }

    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState', store.getState());

    next(action); //synchronous function that's why we can get the next state after this

    console.log('next state', store.getState());
}