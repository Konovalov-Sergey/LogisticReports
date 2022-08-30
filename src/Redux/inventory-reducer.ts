import { ThunkAction } from "redux-thunk";
import { InventoryType } from "../types/inventoryType";

import { AppStateType, InferActionsTypes } from "./redux-store";
import { inventoryApi } from '../API/inventoryApi';

let initialState = {
    inventory: [] as Array<InventoryType>,
    isFetching: false,
    department: null as null | string
};

export type InitialStateType = typeof initialState;

const inventoryReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {        
        case 'INVENTORY/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching}
        }    
        case 'INVENTORY/SET_DEPARTMENT': {
            return { ...state, department: action.department}
        }    
        case 'INVENTORY/SET_INVENTORY': {
            return {...state, inventory: action.inventory}
        }
        default:
            return state; 
    }
    
}

//actionCreators
type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    toggleIsFetching: (isFetching: boolean) => ({type: 'INVENTORY/TOGGLE_IS_FETCHING', isFetching} as const),    
    setInventory: (inventory: Array<InventoryType>) => ({type: 'INVENTORY/SET_INVENTORY', inventory} as const),    
    setDepartment: (department: string) => ({type: 'INVENTORY/SET_DEPARTMENT', department} as const)
}

//thunkCreators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestInventory = (department: string): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setDepartment(department));
        
        let data: any = await inventoryApi.getInventory(department);            
            dispatch(actions.setInventory(data.inventory));
            dispatch(actions.toggleIsFetching(false));
    }
}


export default inventoryReducer;