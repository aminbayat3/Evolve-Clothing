import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [logger];

const compoesedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, compoesedEnhancers); // the second argument is : if you wanna add any additional default state here