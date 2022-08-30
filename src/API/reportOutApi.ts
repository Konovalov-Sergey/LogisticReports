import { reportOutDayType, reportOutFlowDetType, reportOutFlowType, reportOutMonthType, reportOutOnOffDayType, reportOutOnOffMonthType } from "../types/reportOutType";
import { instance } from './api';


export const reportOutApi = {
    getReportOutMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportOutMonthType>(`report_out/get_report_out_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportOutDay(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportOutDayType>(`report_out/get_report_out_day.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportOutOnOffMonth(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportOutOnOffMonthType>(`report_out/get_report_out_on_off_month.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportOutOnOffDay(whName: string, dateFrom: string, dateTo: string) {
        return instance.get<getReportOutOnOffDayType>(`report_out/get_report_out_on_off_day.php?wh=${whName}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportOutFlow(dateFrom: string, dateTo: string) {
        return instance.get<getReportOutFlowType>(`report_out/get_report_out_flow.php?dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(res => res.data);
    },
    getReportOutFlowDet(dateFrom: string, flowType: string) {
        return instance.get<getReportOutFlowDetType>(`report_out/get_report_out_flow_det.php?dateFrom=${dateFrom}&flowType=${flowType}`)
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
export type getReportOutFlowType = {
    reportOutFlow: reportOutFlowType 
}
export type getReportOutFlowDetType = {
    reportOutFlowDet: reportOutFlowDetType 
}