import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";



const sagaMiddleware = createSagaMiddleware();
 
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return [sagaMiddleware]
  },
})
 
sagaMiddleware.run(rootSaga)