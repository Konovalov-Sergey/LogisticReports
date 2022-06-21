import { reportOutMonthType, reportOutOnOffMonthType } from "../types/reportOutType";
import { instance } from './api';


export const reportOutApi = {
    getReportOutMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportOutMonthType>(`get_report_out_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportOutOnOffMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportOutOnOffMonthType>(`get_report_out_on_off_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    }
}

export type getReportOutMonthType = {
    reportOutMonth: reportOutMonthType 
}
export type getReportOutOnOffMonthType = {
    reportOutMonth: reportOutOnOffMonthType 
}