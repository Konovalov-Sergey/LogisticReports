import { reportInDayType, reportInMonthType, reportInOnOffDayType, reportInOnOffMonthType } from "../types/reportInType"
import { instance } from './api';


export const reportInApi = {
    getReportInMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportInMonthType>(`get_report_in_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportInDay(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportInDayType>(`get_report_in_day.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportInOnOffMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportInOnOffMonthType>(`get_report_in_on_off_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportInOnOffDay(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportInOnOffDayType>(`get_report_in_on_off_day.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    }
}

export type getReportInMonthType = {
    reportInMonth: reportInMonthType 
}
export type getReportInDayType = {
    reportInDay: reportInDayType 
}
export type getReportInOnOffMonthType = {
    reportInOnOffMonth: reportInOnOffMonthType 
}
export type getReportInOnOffDayType = {
    reportInOnOffDay: reportInOnOffDayType 
}