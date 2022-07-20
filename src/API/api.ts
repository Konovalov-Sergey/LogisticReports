import axios from "axios";
import { LinesPickPHPType, PickedLinesPblType, RecordsType } from "../types/linesType";


export const instance = axios.create({
    baseURL: 'http://192.168.59.59/fav/web/api/products/',
});

export const linesApi = {
    getPblLines() {
        return instance.get<GetPblLinesType>(`get_pbl_lines.php`)
        .then(res => res.data);
    },
    getPickLines() {
        return instance.get<GetPickLinesType>(`get_pick_lines.php`)
        .then(res => res.data);
    },
    getPickedLinesPbl(dateFrom: string, dateTo: string) {
        return instance.get<GetPickedLinesPblType>(`picked_lines_pbl.php?dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    
}

export type GetPblLinesType = {
    records: RecordsType
}

export type GetPickLinesType = {
    linesPickPHP: LinesPickPHPType
}
export type GetPickedLinesPblType = {
    pickedLinesPbl: PickedLinesPblType
}

