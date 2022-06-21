import { AppStateType } from "./redux-store";

export const getPblLines = (state: AppStateType) => {
    return state.lines.records
}

export const getIsFetching = (state: AppStateType) => {
    return state.lines.isFetching
};

export const getPickLines = (state: AppStateType) => {
    return state.lines.linesPickPHP
}