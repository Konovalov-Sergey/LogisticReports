import { AppStateType } from "./redux-store";

export const getPickedLinesPbl = (state: AppStateType) => {
    return state.lines.pickedLinesPbl
}
export const getUnPickedLinesPbl = (state: AppStateType) => {
    return state.lines.unpickedLinesPbl
}
export const getUnPickedLinesSupPbl = (state: AppStateType) => {
    return state.lines.unpickedLinesSupPbl
}
export const getUnPickedLinesScuPbl = (state: AppStateType) => {
    return state.lines.unpickedLinesScuPbl
}
export const getIsFetching = (state: AppStateType) => {
    return state.lines.isFetching
}
export const getIsFetchingPickDet = (state: AppStateType) => {
    return state.lines.isFetchingPickDet
}
export const getIsFetchingSupPBl = (state: AppStateType) => {
    return state.lines.isFetchingSupPbl
}
export const getIsFetchingScuPbl = (state: AppStateType) => {
    return state.lines.isFetchingScuPbl
}
export const getDateFrom = (state: AppStateType) => {
    return state.lines.dateFrom
}
export const getDateTo = (state: AppStateType) => {
    return state.lines.dateTo
}
export const getWh = (state: AppStateType) => {
    return state.lines.wh
}
export const getLinesPicking = (state: AppStateType) => {
    return state.lines.linesPicking
}
export const getLinesPickingDet = (state: AppStateType) => {
    return state.lines.linesPickingDet
}