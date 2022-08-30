import { reportInDayType, reportInFlowDetType, reportInFlowType, reportInMonthType, reportInOnOffDayType, reportInOnOffMonthType } from "../types/reportInType"
import { instance } from './api';


export const reportInApi = {
    getReportInMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportInMonthType>(`report_in/get_report_in_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportInDay(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportInDayType>(`report_in/get_report_in_day.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportInOnOffMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportInOnOffMonthType>(`report_in/get_report_in_on_off_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportInOnOffDay(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportInOnOffDayType>(`report_in/get_report_in_on_off_day.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportInFlow(dateFrom: string, dateTo: string) {
        return instance.get<getReportInFlowType>(`report_in/get_report_in_flow.php?dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportInFlowDet(dateFrom: string, flowType: string) {
        return instance.get<getReportInFlowDetType>(`report_in/get_report_in_flow_det.php?dateFrom=${dateFrom}&flowType=${flowType}`)
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
export type getReportInFlowType = {
    reportInFlow: reportInFlowType 
}
export type getReportInFlowDetType = {
    reportInFlowDet: reportInFlowDetType
}