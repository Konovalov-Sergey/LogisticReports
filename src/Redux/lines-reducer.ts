import { ThunkAction } from "redux-thunk";
import { linesApi } from "../API/linesApi";
import { linesPickingDetType, linesPickingType, PickedLinesPblType, UnpickedLinesPblType, UnpickedLinesScuPblType, UnpickedLinesSupPblType } from "../types/linesType";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
    pickedLinesPbl: [] as Array<PickedLinesPblType>,
    unpickedLinesPbl: [] as Array<UnpickedLinesPblType>,
    unpickedLinesSupPbl: [] as Array<UnpickedLinesSupPblType>,
    unpickedLinesScuPbl: [] as Array<UnpickedLinesScuPblType>,
    linesPicking: [] as Array<linesPickingType>,
    linesPickingDet: [] as Array<linesPickingDetType>,
    isFetching: false,
    isFetchingPickDet: false,
    isFetchingSupPbl: false,
    isFetchingScuPbl: false,
    dateFrom: null as null | string,
    dateTo: null as null | string,
    wh: null as null | string
};

export type InitialStateType = typeof initialState;

const linesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'LINES/PBL/SET_PICKED_LINES_PBL': {
            return {...state, pickedLinesPbl: action.pickedLinesPbl}
        }
        case 'LINES/PBL/SET_UNPICKED_LINES_PBL': {
            return {...state, unpickedLinesPbl: action.unpickedLinesPbl}
        }
        case 'LINES/PBL/SET_UNPICKED_LINES_SUP_PBL': {
            return {...state, 
                unpickedLinesSupPbl: action.unpickedLinesSupPbl
            }
        }
        case 'LINES/PBL/SET_UNPICKED_LINES_SCU_PBL': {
            return {...state, 
                unpickedLinesScuPbl: action.unpickedLinesScuPbl
            }
        }
        case 'LINES/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching}
        }
        case 'LINES/TOGGLE_IS_FETCHING_PICK_DET': {
            return { ...state, isFetchingPickDet: action.isFetchingPickDet}
        }
        case 'LINES/TOGGLE_IS_FETCHING_SUP_PBL': {
            return { ...state, isFetchingSupPbl: action.isFetchingSupPbl}
        }
        case 'LINES/TOGGLE_IS_FETCHING_SCU_PBL': {
            return { ...state, isFetchingScuPbl: action.isFetchingScuPbl}
        }
        case 'LINES/PICKING/SET_LINES_PICKING': {
            return {...state, linesPicking: action.linesPicking}
        }
        case 'LINES/PICKING/SET_LINES_PICKING_DET': {
            return {...state, linesPickingDet: action.linesPickingDet}
        }
        case 'LINES/PBL/SET_DATE_FROM': {
            return {...state, dateFrom: action.dateFrom}
        }
        case 'LINES/PBL/SET_DATE_TO': {
            return {...state, dateTo: action.dateTo}
        }
        case 'LINES/PBL/SET_WH': {
            return {...state, wh: action.wh}
        }
        
        default:
            return state; 
    }
    
}

//actionCreators
type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    toggleIsFetching: (isFetching: boolean) => ({type: 'LINES/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleIsFetchingPickDet: (isFetchingPickDet: boolean) => ({type: 'LINES/TOGGLE_IS_FETCHING_PICK_DET', isFetchingPickDet} as const),
    toggleIsFetchingSupPbl: (isFetchingSupPbl: boolean) => ({type: 'LINES/TOGGLE_IS_FETCHING_SUP_PBL', isFetchingSupPbl} as const),
    toggleIsFetchingScuPbl: (isFetchingScuPbl: boolean) => ({type: 'LINES/TOGGLE_IS_FETCHING_SCU_PBL', isFetchingScuPbl} as const),
    setPickedLinesPbl: (pickedLinesPbl: Array<PickedLinesPblType>) => ({type: 'LINES/PBL/SET_PICKED_LINES_PBL', pickedLinesPbl} as const),
    setUnpickedLinesPbl: (unpickedLinesPbl: Array<UnpickedLinesPblType>) => ({type: 'LINES/PBL/SET_UNPICKED_LINES_PBL', unpickedLinesPbl} as const),
    setUnpickedLinesSupPbl: (unpickedLinesSupPbl: Array<UnpickedLinesSupPblType>) => ({type: 'LINES/PBL/SET_UNPICKED_LINES_SUP_PBL', unpickedLinesSupPbl} as const),
    setUnpickedLinesScuPbl: (unpickedLinesScuPbl: Array<UnpickedLinesScuPblType>) => ({type: 'LINES/PBL/SET_UNPICKED_LINES_SCU_PBL', unpickedLinesScuPbl} as const),
    setLinesPicking: (linesPicking: Array<linesPickingType>) => ({type: 'LINES/PICKING/SET_LINES_PICKING', linesPicking} as const),
    setLinesPickingDet: (linesPickingDet: Array<linesPickingDetType>) => ({type: 'LINES/PICKING/SET_LINES_PICKING_DET', linesPickingDet} as const),
    setDateFrom: (dateFrom: string) => ({type: 'LINES/PBL/SET_DATE_FROM', dateFrom} as const),
    setDateTo: (dateTo: string) => ({type: 'LINES/PBL/SET_DATE_TO', dateTo} as const),
    setWh: (wh: string) => ({type: 'LINES/PBL/SET_WH', wh} as const)
}

//thunkCreators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

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
export const requestUnpickedLinesPbl = (): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));

        let data: any = await linesApi.getUnpickedLinesPbl();            
            dispatch(actions.setUnpickedLinesPbl(data.unpickedLinesPbl));
            dispatch(actions.toggleIsFetching(false));
    }
}
export const requestUnpickedLinesSupPbl = (dateFrom: string, dateTo: string, wh: string): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetchingSupPbl(true));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));
        dispatch(actions.setWh(wh));

        let data: any = await linesApi.getUnpickedLinesSupPbl(dateFrom, dateTo, wh);            
            dispatch(actions.setUnpickedLinesSupPbl(data.unpickedLinesSupPbl));
            dispatch(actions.toggleIsFetchingSupPbl(false));
    }
}
export const requestUnpickedLinesScuPbl = (dateFrom: string, wh: string): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetchingScuPbl(true));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setWh(wh));

        let data: any = await linesApi.getUnpickedLinesScuPbl(dateFrom, wh);            
            dispatch(actions.setUnpickedLinesScuPbl(data.unpickedLinesScuPbl));
            dispatch(actions.toggleIsFetchingScuPbl(false));
    }
}
export const requestLinesPicking = (wh: string, dateFrom: string, dateTo:string ): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWh(wh));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));
        

        let data: any = await linesApi.getLinesPicking(wh, dateFrom, dateTo);            
            dispatch(actions.setLinesPicking(data.linesPicking));
            dispatch(actions.toggleIsFetching(false));
    }
}
export const requestLinesPickingDet = (wh: string, dateFrom: string, dateTo:string ): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetchingPickDet(true));
        dispatch(actions.setWh(wh));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));
        

        let data: any = await linesApi.getLinesPickingDet(wh, dateFrom, dateTo);            
            dispatch(actions.setLinesPickingDet(data.linesPickingDet));
            dispatch(actions.toggleIsFetchingPickDet(false));
    }
}


export default linesReducer;