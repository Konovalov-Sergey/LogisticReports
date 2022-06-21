import { VolumeWhArrType } from "../types/type";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from 'redux-thunk';
import { volumeApi } from './../API/volumeApi';


let initialState = {
    volumeWhOutArr: [] as Array<VolumeWhArrType>,
    volumeWhInArr: [] as Array<VolumeWhArrType>,
    isFetching: false,
    whName: '',
    month: null as null | number,
    year: null as null | number,
}

export type InitialStateType = typeof initialState;

const volumeReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
 switch(action.type) {
     case 'VOLUME/WH_OUT/SET_VOLUME': {
         return {...state, volumeWhOutArr: action.volumeWhOutArr}
     }
     case 'VOLUME/WH_IN/SET_VOLUME': {
         return {...state, volumeWhInArr: action.volumeWhInArr}
     }
     case 'VOLUME/TOGGLE_IS_FETCHING': {
        return { ...state, isFetching: action.isFetching}
    }
    case 'VOLUME/WH_OUT/SET_WH_NAME': {
        return {...state, whName: action.whName}
    }
    case 'VOLUME/WH_OUT/SET_MONTH': {
        return {...state, month: action.month}
    }
    case 'VOLUME/WH_OUT/SET_YEAR': {
        return {...state, year: action.year}
    }
     default:
         return state;
 }   
}

//actionCreators
type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    setVolumeWhOut: (volumeWhOutArr: Array<VolumeWhArrType>) => ({type: 'VOLUME/WH_OUT/SET_VOLUME', volumeWhOutArr} as const),
    setVolumeWhIn: (volumeWhInArr: Array<VolumeWhArrType>) => ({type: 'VOLUME/WH_IN/SET_VOLUME', volumeWhInArr} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'VOLUME/TOGGLE_IS_FETCHING', isFetching} as const),
    setWhName: (whName: string) => ({type: 'VOLUME/WH_OUT/SET_WH_NAME', whName} as const),
    setMonth: (month: number) => ({type: 'VOLUME/WH_OUT/SET_MONTH', month} as const),
    setYear: (year: number) => ({type: 'VOLUME/WH_OUT/SET_YEAR', year} as const)
}

//thunkCreators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestVolumeWhOut = (whName: string, month: number, year: number): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWhName(whName));
        dispatch(actions.setMonth(month));
        dispatch(actions.setYear(year));

        let data: any = await volumeApi.getVolumeWhOut(whName, month, year);
            dispatch(actions.setVolumeWhOut(data.volumeWhOutArr));
            dispatch(actions.toggleIsFetching(false));
    }
}
export const requestVolumeWhIn = (whName: string, month: number, year: number): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWhName(whName));
        dispatch(actions.setMonth(month));
        dispatch(actions.setYear(year));

        let data: any = await volumeApi.getVolumeWhIn(whName, month, year);
            dispatch(actions.setVolumeWhIn(data.volumeWhInArr));
            dispatch(actions.toggleIsFetching(false));
    }
}


export default volumeReducer;