import { AppStateType } from "./redux-store";

export const getIsfetching = (state: AppStateType) => {
    return state.reportIn.isFetching
}
export const getIsfetchingFlowDet = (state: AppStateType) => {
    return state.reportIn.isFetchingFlowDet
}
export const getReportInMonth = (state: AppStateType) => {
    return state.reportIn.reportInMonth
}
export const getReportInDay = (state: AppStateType) => {
    return state.reportIn.reportInDay
}
export const getReportInOnOffMonth = (state: AppStateType) => {
    return state.reportIn.reportInOnOffMonth
}
export const getReportInOnOffDay = (state: AppStateType) => {
    return state.reportIn.reportInOnOffDay
}
export const getReportInflow = (state: AppStateType) => {
    return state.reportIn.reportInFlow
}
export const getReportInflowDet = (state: AppStateType) => {
    return state.reportIn.reportInFlowDet
}
export const getWhName = (state: AppStateType) => {
    return state.reportIn.whName
}
export const getDateFrom = (state: AppStateType) => {
    return state.reportIn.dateFrom
}
export const getDateTo = (state: AppStateType) => {
    return state.reportIn.dateTo
}
export const getFlowType = (state: AppStateType) => {
    return state.reportIn.flowType
}