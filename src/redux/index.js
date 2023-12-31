/**
  @desc createStore is used for creating a store for our redux
  @desc applyMiddleware is used for applying some middleware to redux, in this case we gonna using redux-saga
*/
import { createStore, applyMiddleware } from "redux";

// composeWithDevTools is tools that gonna be connecting our application for debugging the redux into the browser
import { composeWithDevTools } from "redux-devtools-extension";

// This is the middleware that we gonna use redux-saga
import createSagaMiddleware from "redux-saga";

// This is the root saga that will contain our sagas, or I should say model? XD
import rootSaga from "./sagas/index";

// This will be contain our reducer for the application
import rootReducer from "./reducers";

// Redux persist
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["socketReducer"],
  // whiteList:["signInReducer"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
store.__PERSISTOR = persistStore(store);

// Run redux-saga
sagaMiddleware.run(rootSaga);

export default store;
