
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecordsType, requesPblLines } from "../../Redux/lines-reducer";
import { getPblLines } from './../../Redux/lines-selector';
import { Line } from './Line';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type PropsType = {}

export const LinesPBL = React.memo<PropsType>(() => {
    
    const pblLines = useSelector(getPblLines);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(requesPblLines());
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            Object.keys(pblLines[0]).map(key => {
                                return <TableCell key={key}>
                                    {key}
                                </TableCell> 
                            })                            
                        } 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pblLines.map((l, index) => <Line line={l} key={index}/> )}
                </TableBody>                
            </Table>            
        </TableContainer>
    )
})