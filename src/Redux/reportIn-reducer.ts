
import { reportInDayType, reportInMonthType, reportInOnOffDayType, reportInOnOffMonthType } from "../types/reportInType";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from 'redux-thunk';
import { reportInApi } from './../API/reportInApi';

let initialState = {
    reportInMonth: [] as Array<reportInMonthType>,
    reportInDay: [] as Array<reportInDayType>,
    reportInOnOffMonth: [] as Array<reportInOnOffMonthType>,
    reportInOnOffDay: [] as Array<reportInOnOffDayType>,
    isFetching: false,
    whName: '',
    dateFrom: null as null | string,
    dateTo: null as null | string,
}

export type InitialStateType = typeof initialState;

const reportInReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
         case 'REPORT_IN/SET_REPORT_IN_MONTH': {
             return {...state, reportInMonth: action.reportInMonth}
         }
         case 'REPORT_IN/SET_REPORT_IN_DAY': {
             return {...state, reportInDay: action.reportInDay}
         }
         case 'REPORT_IN/SET_REPORT_IN_ON_OFF_MONTH': {
             return {...state, reportInOnOffMonth: action.reportInOnOffMonth}
         }
         case 'REPORT_IN/SET_REPORT_IN_ON_OFF_DAY': {
             return {...state, reportInOnOffDay: action.reportInOnOffDay}
         }
         case 'REPORT_IN/TOGGLE_IS_FETCHING': {
             return {...state, isFetching: action.isFetching}
         }
         case 'REPORT_IN/SET_WHNAME': {
             return {...state, whName: action.whName}
         }
         case 'REPORT_IN/SET_DATE_FROM': {
             return {...state, dateFrom: action.dateFrom}
         }
         case 'REPORT_IN/SET_DATE_TO': {
             return {...state, dateTo: action.dateTo}
         }
            default: return state;
    }
}

//actionCreators
type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    setReportInMonth: (reportInMonth: Array<reportInMonthType>) => ({type: 'REPORT_IN/SET_REPORT_IN_MONTH', reportInMonth} as const),
    setReportInDay: (reportInDay: Array<reportInDayType>) => ({type: 'REPORT_IN/SET_REPORT_IN_DAY', reportInDay} as const),
    setReportInOnOffMonth: (reportInOnOffMonth: Array<reportInOnOffMonthType>) => ({type: 'REPORT_IN/SET_REPORT_IN_ON_OFF_MONTH', reportInOnOffMonth} as const),
    setReportInOnOffDay: (reportInOnOffDay: Array<reportInOnOffDayType>) => ({type: 'REPORT_IN/SET_REPORT_IN_ON_OFF_DAY', reportInOnOffDay} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'REPORT_IN/TOGGLE_IS_FETCHING', isFetching} as const),
    setWhName: (whName: string) => ({type: 'REPORT_IN/SET_WHNAME', whName} as const),
    setDateFrom: (dateFrom: string) => ({type: 'REPORT_IN/SET_DATE_FROM', dateFrom} as const),
    setDateTo: (dateTo: string) => ({type: 'REPORT_IN/SET_DATE_TO', dateTo} as const)
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestReportInMonth = (whName: string, dateFrom: string, dateTo: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWhName(whName));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));

        let data: any = await reportInApi.getReportInMonth(whName, dateFrom, dateTo);
            dispatch(actions.setReportInMonth(data.reportInMonth));
            dispatch(actions.toggleIsFetching(false));
    }
}
export const requestReportInDay = (whName: string, dateFrom: string, dateTo: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWhName(whName));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));

        let data: any = await reportInApi.getReportInDay(whName, dateFrom, dateTo);
            dispatch(actions.setReportInDay(data.reportInDay));
            dispatch(actions.toggleIsFetching(false));
    }
}
export const requestReportInOnOffMonth = (whName: string, dateFrom: string, dateTo: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWhName(whName));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));

        let data: any = await reportInApi.getReportInOnOffMonth(whName, dateFrom, dateTo);
            dispatch(actions.setReportInOnOffMonth(data.reportInOnOffMonth));
            dispatch(actions.toggleIsFetching(false));
    }
}
export const requestReportInOnOffDay = (whName: string, dateFrom: string, dateTo: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setWhName(whName));
        dispatch(actions.setDateFrom(dateFrom));
        dispatch(actions.setDateTo(dateTo));

        let data: any = await reportInApi.getReportInOnOffDay(whName, dateFrom, dateTo);
            dispatch(actions.setReportInOnOffDay(data.reportInOnOffDay));
            dispatch(actions.toggleIsFetching(false));
    }
}

export default reportInReducer;