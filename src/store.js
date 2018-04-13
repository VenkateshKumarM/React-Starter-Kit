import { applyMiddleware, combineReducers, createStore } from "redux";
import {dailyScheduleReducer}  from "./reducers/dailyScheduleReducer";
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';


const middleware = applyMiddleware(logger,ReduxThunk);

const rootReducer = combineReducers({dailyScheduleReducer})
const store = createStore(rootReducer, middleware);


export default store;




