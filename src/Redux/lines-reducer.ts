import { ThunkAction } from "redux-thunk";
import { linesApi } from "../API/api";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
    records: [] as Array<RecordsType>,
    isFetching: true
};

export type RecordsType = {
    'Дата': string,
    'Прийнято загалом': string,
    'Не розподілено загалом': string,
    'Прийнято A': string,
    'Прийнято B': string,
    'Прийнято C': string,
    'Прийнято G': string,
    'Прийнято F': string,
    'Не розподілено A':string,
    'Не розподілено B': string,
    'Не розподілено C': string,
    'Не розподілено G': string,
    'Не розподілено F': string,
    'Розподілено A': string,
    'Розподілено B': string,
    'Розподілено C': string,
    'Розподілено G': string,
    'Розподілено F': string
}

export type InitialStateType = typeof initialState;

const linesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'LINES/PBL/SET_PBL_LINES': {
            return {...state, records: action.records}
        }
        case 'LINES/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching}
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
}

//thunkCreators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requesPblLines = (): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));

        let data: any = await linesApi.getPblLines();
            dispatch(actions.toggleIsFetching(false));
            dispatch(actions.setPblLines(data.records));
    }
}


export default linesReducer;