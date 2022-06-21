import axios from "axios";
import { LinesPickPHPType, RecordsType } from "../types/type";


export const instance = axios.create({
    baseURL: 'http://192.168.59.59/fav/web/api/products/',
});

export const linesApi = {
    getPblLines() {
        return instance.get<GetPblLinesType>(`get_pbl_lines.php`)
        .then(res => res.data);
    },
    getPickLines() {
        return instance.get(`get_pick_lines.php`)
        .then(res => res.data);
    },
    
}

export type GetPblLinesType = {
    records: RecordsType 
}

export type GetPickLinesType = {
    linesPickPHP: LinesPickPHPType 
}

