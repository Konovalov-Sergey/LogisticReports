import React, { memo } from 'react';
import ReportOutFlowDet from './ReportOutFlowDet';
import ReportOutFlowTotal from './ReportOutFlowTotal';

const ReportOutFLow = memo(() => {
    return (
        <div>
            <ReportOutFlowTotal />
            <ReportOutFlowDet />
        </div>
    );
});

export default ReportOutFLow;