import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import linesReducer from './lines-reducer';

const rootReducer = combineReducers({
    lines: linesReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {[key:string]: (...args: any[]) => infer U} ? U : never;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;

export default store;


