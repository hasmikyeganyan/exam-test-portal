import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "../redux/saga"
import authSlice from "../redux/authSlice";
import examResultsSlice from "../redux/examResultsSlice";
import userSlice from "../redux/userSlice";


export interface IReduxAction {
  type: string;
  payload?: any;
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [examResultsSlice.name]:examResultsSlice.reducer,
        [userSlice.name]:userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false
        }).concat(sagaMiddleware)
});
sagaMiddleware.run(saga);
export default store;
export type RootState = ReturnType<typeof store.getState>;