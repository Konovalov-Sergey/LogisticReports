import { AppStateType } from "./redux-store";

export const getPblLines = (state: AppStateType) => {
    return state.lines.records
}

export const getIsFetching = (state: AppStateType) => {
    return state.lines.isFetching
};