import { compose, createStore, applyMiddleware, Middleware} from "redux"; // in order for us to use ReduxDevTools is to modify compose method. you modify it in the sense that you determine whether you wanna use Redux's Compose or the DevTools's compose
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
}

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  //blacklist: ['user']
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware)); //fliter((x) => Boolean(x));

const compoesedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; // becuase during our build step we dont have any window object so for this reason we dont wanna break our code

const compoesedEnhancers = compoesedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  compoesedEnhancers
); // the second argument is : if you wanna add any additional default state here

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
