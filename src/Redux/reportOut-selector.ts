import { AppStateType } from "./redux-store";

export const getReportOutMonth = (state: AppStateType) => {
    return state.reportOut.reportOutMonth
}
export const getReportOutDay = (state: AppStateType) => {
    return state.reportOut.reportOutDay
}
export const getReportOutOnOffMonth = (state: AppStateType) => {
    return state.reportOut.reportOutOnOffMonth
}
export const getReportOutOnOffDay = (state: AppStateType) => {
    return state.reportOut.reportOutOnOffDay
}
export const getWhName = (state: AppStateType) => {
    return state.reportOut.whName
}
export const getDateFrom = (state: AppStateType) => {
    return state.reportOut.dateFrom
}
export const getDateTo = (state: AppStateType) => {
    return state.reportOut.dateTo
}
export const getIsfetching = (state: AppStateType) => {
    return state.reportOut.isFetching
}