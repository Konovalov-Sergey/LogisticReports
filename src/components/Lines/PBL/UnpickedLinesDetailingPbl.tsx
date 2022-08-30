import React, { memo } from 'react';
import UnpickedLinesSupPbl from './UnpickedLinesSupPbl';
import UnpickedLinesScuPbl from './UnpickedLinesScuPbl';
import UnpickedLinesPbl from './UnpickedLinesPbl';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

type PropsType = {}

const UnpickedLinesDetailingPbl: React.FC<PropsType> = memo(() => {
    return (

        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <UnpickedLinesPbl />
                </Grid>
                <Grid item xs={9}>
                    <UnpickedLinesSupPbl />
                </Grid>
                <Grid item xs={12}>
                    <UnpickedLinesScuPbl />
                </Grid>
            </Grid>
        </Box>
    );
});

export default UnpickedLinesDetailingPbl;