
import { AppStateType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from 'redux-thunk';
import { reportOutDayType, reportOutMonthType, reportOutOnOffDayType, reportOutOnOffMonthType } from "../types/reportOutType";
import { reportOutApi } from './../API/reportOutApi';

let initialState = {
    reportOutMonth: [] as Array<reportOutMonthType>,
    reportOutDay: [] as Array<reportOutDayType>,
    reportOutOnOffMonth: [] as Array<reportOutOnOffMonthType>,
    reportOutOnOffDay: [] as Array<reportOutOnOffDayType>,
    isFetching: false,
    whName: '',
    dateFrom: null as null | string,
    dateTo: null as null | string,
}

export type InitialStateType = typeof initialState;

const reportOutReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
         case 'REPORT_OUT/SET_REPORT_OUT_MONTH': {
             return {...state, reportOutMonth: action.reportOutMonth}
         }
         case 'REPORT_OUT/SET_REPORT_OUT_DAY': {
             return {...state, reportOutDay: action.reportOutDay}
         }
         case 'REPORT_OUT/SET_REPORT_OUT_ON_OFF_MONTH': {
             return {...state, reportOutOnOffMonth: action.reportOutOnOffMonth}
         }
         case 'REPORT_OUT/SET_REPORT_OUT_ON_OFF_DAY': {
             return {...state, reportOutOnOffDay: action.reportOutOnOffDay}
         }
         case 'REPORT_OUT/TOGGLE_IS_FETCHING': {
             return {...state, isFetching: action.isFetching}
         }
         case 'REPORT_OUT/SET_WHNAME': {
             return {...state, whName: action.whName}
         }
         case 'REPORT_OUT/SET_DATE_FROM': {
             return {...state, dateFrom: action.dateFrom}
         }
         case 'REPORT_OUT/SET_DATE_TO': {
             return {...state, dateTo: action.dateTo}
         }
            default: return state;
    }
}

//actionCreators
type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    setReportOutMonth: (reportOutMonth: Array<reportOutMonthType>) => ({type: 'REPORT_OUT/SET_REPORT_OUT_MONTH', reportOutMonth} as const),
    setReportOutDay: (reportOutDay: Array<reportOutDayType>) => ({type: 'REPORT_OUT/SET_REPORT_OUT_DAY', reportOutDay} as const),
    setReportOutOnOffMonth: (reportOutOnOffMonth: Array<reportOutOnOffMonthType>) => ({type: 'REPORT_OUT/SET_REPORT_OUT_ON_OFF_MONTH', reportOutOnOffMonth} as const),
    setReportOutOnOffDay: (reportOutOnOffDay: Array<reportOutOnOffDayType>) => ({type: 'REPORT_OUT/SET_REPORT_OUT_ON_OFF_DAY', reportOutOnOffDay} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'REPORT_OUT/TOGGLE_IS_FETCHING', isFetching} as const),
    setWhName: (whName: string) => ({type: 'REPORT_OUT/SET_WHNAME', whName} as const),
    setDateFrom: (dateFrom: string) => ({type: 'REPORT_OUT/SET_DATE_FROM', dateFrom} as const),
    setDateTo: (dateTo: string) => ({type: 'REPORT_OUT/SET_DATE_TO', dateTo} as const)
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestReportOutMonth = (whName: string, dateFrom: string, dateTo: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWhName(whName));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));

        let data: any = await reportOutApi.getReportOutMonth(whName, dateFrom, dateTo);
            dispatch(actions.setReportOutMonth(data.reportOutMonth));
            dispatch(actions.toggleIsFetching(false));
    }
}
export const requestReportOutDay = (whName: string, dateFrom: string, dateTo: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWhName(whName));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));

        let data: any = await reportOutApi.getReportOutDay(whName, dateFrom, dateTo);
            dispatch(actions.setReportOutDay(data.reportOutDay));
            dispatch(actions.toggleIsFetching(false));
    }
}

export const requestReportOutOnOffMonth = (whName: string, dateFrom: string, dateTo: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWhName(whName));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));

        let data: any = await reportOutApi.getReportOutOnOffMonth(whName, dateFrom, dateTo);
            dispatch(actions.setReportOutOnOffMonth(data.reportOutOnOffMonth));
            dispatch(actions.toggleIsFetching(false));
    }
}
export const requestReportOutOnOffDay = (whName: string, dateFrom: string, dateTo: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWhName(whName));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));

        let data: any = await reportOutApi.getReportOutOnOffDay(whName, dateFrom, dateTo);
            dispatch(actions.setReportOutOnOffDay(data.reportOutOnOffDay));
            dispatch(actions.toggleIsFetching(false));
    }
}

export default reportOutReducer;