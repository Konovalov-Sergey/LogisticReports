import React, { memo } from 'react';
import ReportInFlowDet from './ReportInFlowDet';
import ReportInFlowTotal from './ReportInFlowTotal';

const ReportInFlow = memo(() => {
    return (
        <div>
           < ReportInFlowTotal />
           <ReportInFlowDet />
        </div>
    );
});

export default ReportInFlow;