import { ThunkAction } from "redux-thunk";
import { linesApi } from "../API/api";
import { LinesPickPHPType, RecordsType } from "../types/type";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
    records: [] as Array<RecordsType>,
    linesPickPHP: [] as Array<LinesPickPHPType>,
    isFetching: true
};

export type InitialStateType = typeof initialState;

const linesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'LINES/PBL/SET_PBL_LINES': {
            return {...state, records: action.records}
        }
        case 'LINES/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching}
        }
        case 'LINES/Pick/SET_PBL_LINES': {
            return {...state, linesPickPHP: action.linesPickPHP}
        }
        default:
            return state; 
    }
    
}

//actionCreators
type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    setPblLines: (records: Array<RecordsType>) => ({type: 'LINES/PBL/SET_PBL_LINES', records} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'LINES/TOGGLE_IS_FETCHING', isFetching} as const),
    setPickLines: (linesPickPHP: Array<LinesPickPHPType>) => ({type: 'LINES/Pick/SET_PBL_LINES', linesPickPHP} as const)
}

//thunkCreators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requesPblLines = (): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));

        let data: any = await linesApi.getPblLines();
            dispatch(actions.setPblLines(data.records));
            dispatch(actions.toggleIsFetching(false));
    }
}

export const requestPickLines = (): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));

        let data: any = await linesApi.getPickLines();            
            dispatch(actions.setPickLines(data.linesPickPHP));
            dispatch(actions.toggleIsFetching(false));
    }
}


export default linesReducer;