import { instance } from './api';
import { linesPickingDetType, linesPickingType, PickedLinesPblType, UnpickedLinesPblType, UnpickedLinesScuPblType, UnpickedLinesSupPblType } from "../types/linesType";

export const linesApi = {
    getPickedLinesPbl(dateFrom: string, dateTo: string) {
        return instance.get<GetPickedLinesPblType>(`lines/picked_lines_pbl.php?dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },    
    getUnpickedLinesPbl() {
        return instance.get<GetUnpickedLinesPblType>(`lines/unpicked_lines_pbl.php`)
        .then(res => res.data);
    },    
    getLinesPicking(wh: string, dateFrom: string, dateTo: string) {
        return instance.get<GetLinesPickingType>(`lines/picked_unpicked_lines_picking.php?wh=${wh}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },    
    getLinesPickingDet(wh: string, dateFrom: string, dateTo: string) {
        return instance.get<GetLinesPickingDetType>(`lines/lines_picking_detailing.php?wh=${wh}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },    
    getUnpickedLinesSupPbl(dateFrom: string, dateTo: string, wh: string) {
        return instance.get<GetUnpickedLinesPblSupType>(`lines/unpicked_lines_sup_pbl.php?dateFrom=${dateFrom}&dateTo=${dateTo}&wh=${wh}`)
        .then(res => res.data);
    },    
    getUnpickedLinesScuPbl(dateFrom: string, wh: string) {
        return instance.get<GetUnpickedLinesPblScuType>(`lines/unpicked_lines_scu_pbl.php?dateFrom=${dateFrom}&wh=${wh}`)
        .then(res => res.data);
    }    
}

export type GetPickedLinesPblType = {
    pickedLinesPbl: PickedLinesPblType
}
export type GetUnpickedLinesPblType = {
    unpickedLinesPbl: UnpickedLinesPblType
}
export type GetUnpickedLinesPblSupType = {
    unpickedLinesSupPbl: UnpickedLinesSupPblType
}
export type GetUnpickedLinesPblScuType = {
    unpickedLinesSupPbl: UnpickedLinesScuPblType
}
export type GetLinesPickingType = {
    linesPicking: linesPickingType
}
export type GetLinesPickingDetType = {
    linesPickingDet: linesPickingDetType
}