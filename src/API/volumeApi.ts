import { VolumeWhArrType } from "../types/type";
import { instance } from "./api";

export const volumeApi = {
    getVolumeWhOut(whName: string, month: number, year: number) {
        return instance.get<VolumeWhArrType>(`get_volume_by_wh_out.php?wh=${whName}&month=${month}&year=${year}`)
        .then(res => res.data);
    },
    getVolumeWhIn(whName: string, month: number, year: number) {
        return instance.get<VolumeWhArrType>(`get_volume_by_wh_in.php?wh=${whName}&month=${month}&year=${year}`)
        .then(res => res.data);
    }
}

export type GetVolumeWhOutType = {
    volumeWhOutArr: VolumeWhArrType 
}


