import { AppStateType } from "./redux-store";

export const getInventory = (state: AppStateType) => {
    return state.inventory.inventory
}
export const getIsFetching = (state: AppStateType) => {
    return state.inventory.isFetching
}
export const getDepartment = (state: AppStateType) => {
    return state.inventory.department
}