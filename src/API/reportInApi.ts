import { reportInMonthType, reportInOnOffMonthType } from "../types/reportInType"
import { instance } from './api';


export const reportInApi = {
    getReportInMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportInMonthType>(`get_report_in_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportInOnOffMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportInOnOffMonthType>(`get_report_in_on_off_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    }
}

export type getReportInMonthType = {
    reportInMonth: reportInMonthType 
}
export type getReportInOnOffMonthType = {
    reportInOnOffMonth: reportInOnOffMonthType 
}