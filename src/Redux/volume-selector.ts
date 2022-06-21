import { AppStateType } from "./redux-store";

export const getVolumeWhOut = (state: AppStateType) => {
    return state.volume.volumeWhOutArr
}
export const getVolumeWhIn = (state: AppStateType) => {
    return state.volume.volumeWhInArr
}

export const getIsFetching = (state: AppStateType) => {
    return state.volume.isFetching
};