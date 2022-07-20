import { reportOutDayType, reportOutMonthType, reportOutOnOffDayType, reportOutOnOffMonthType } from "../types/reportOutType";
import { instance } from './api';


export const reportOutApi = {
    getReportOutMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportOutMonthType>(`get_report_out_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportOutDay(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportOutDayType>(`get_report_out_day.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportOutOnOffMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportOutOnOffMonthType>(`get_report_out_on_off_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportOutOnOffDay(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportOutOnOffDayType>(`get_report_out_on_off_day.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    }
}

export type getReportOutMonthType = {
    reportOutMonth: reportOutMonthType 
}
export type getReportOutDayType = {
    reportOutDay: reportOutDayType
}
export type getReportOutOnOffMonthType = {
    reportOutOnOffMonth: reportOutOnOffMonthType 
}
export type getReportOutOnOffDayType = {
    reportOutOnOffDay: reportOutOnOffDayType 
}