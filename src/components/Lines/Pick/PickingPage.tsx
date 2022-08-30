import React, { memo } from 'react';
import PickingLines from './PickingLines';
import PickingLinesDetailing from './PickingLinesDetailing';

const PickingPage = memo(() => {
    return (
        <div>
            < PickingLines />
            < PickingLinesDetailing />
        </div>
    );
});

export default PickingPage;