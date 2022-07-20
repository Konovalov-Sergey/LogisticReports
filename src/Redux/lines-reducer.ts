import { ThunkAction } from "redux-thunk";
import { linesApi } from "../API/api";
import { LinesPickPHPType, PickedLinesPblType, RecordsType } from "../types/linesType";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
    records: [] as Array<RecordsType>,
    linesPickPHP: [] as Array<LinesPickPHPType>,
    pickedLinesPbl: [] as Array<PickedLinesPblType>,
    isFetching: false,
    dateFrom: null as null | string,
    dateTo: null as null | string,
    
};

export type InitialStateType = typeof initialState;

const linesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'LINES/PBL/SET_PBL_LINES': {
            return {...state, records: action.records}
        }
        case 'LINES/PBL/SET_PICKED_LINES_PBL': {
            return {...state, pickedLinesPbl: action.pickedLinesPbl}
        }
        case 'LINES/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching}
        }
        case 'LINES/Pick/SET_PBL_LINES': {
            return {...state, linesPickPHP: action.linesPickPHP}
        }
        case 'LINES/PBL/SET_DATE_FROM': {
            return {...state, dateFrom: action.dateFrom}
        }
        case 'LINES/PBL/SET_DATE_TO': {
            return {...state, dateTo: action.dateTo}
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
    setPickLines: (linesPickPHP: Array<LinesPickPHPType>) => ({type: 'LINES/Pick/SET_PBL_LINES', linesPickPHP} as const),
    setPickedLinesPbl: (pickedLinesPbl: Array<PickedLinesPblType>) => ({type: 'LINES/PBL/SET_PICKED_LINES_PBL', pickedLinesPbl} as const),
    setDateFrom: (dateFrom: string) => ({type: 'LINES/PBL/SET_DATE_FROM', dateFrom} as const),
    setDateTo: (dateTo: string) => ({type: 'LINES/PBL/SET_DATE_TO', dateTo} as const)
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

export const requestPickedLinesPbl = (dateFrom: string, dateTo: string): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));

        let data: any = await linesApi.getPickedLinesPbl(dateFrom, dateTo);            
            dispatch(actions.setPickedLinesPbl(data.pickedLinesPbl));
            dispatch(actions.toggleIsFetching(false));
    }
}


export default linesReducer;