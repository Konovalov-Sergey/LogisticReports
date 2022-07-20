import React, { memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getIsFetching, getPickedLinesPbl } from '../../../Redux/lines-selector';
import { requestPickedLinesPbl } from '../../../Redux/lines-reducer';
import Preloader from './../../Common/Preloader/Preloader';
import { LinesForm, ValuesType } from '../../Common/form/LinesForm';


type PropsType = {}

const PickedLinesPbl: React.FC<PropsType> = memo(() => {

    const pickedLinesPbl = useSelector(getPickedLinesPbl);
    const isFetching = useSelector(getIsFetching);
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const handleSubmit = (values: ValuesType) => {
        let dateFrom = `${values.dateFrom.getDate()}.${values.dateFrom.getMonth() + 1}.${values.dateFrom.getFullYear()}`
        let dateTo = `${values.dateTo.getDate()}.${values.dateTo.getMonth() + 1}.${values.dateTo.getFullYear()}`
        dispatch<any>(requestPickedLinesPbl(dateFrom, dateTo))
    }

    return (
        <div>
           <h2>Кількість розділених ліній Break-bulk станом на {time} </h2>
            <LinesForm handleSubmit={handleSubmit} />
            {isFetching ? <Preloader /> : null }
            {pickedLinesPbl.length > 0 &&
            <Box sx={{textAlign: 'left'}}>
                <TableContainer component={Paper} sx={{marginBottom: '25px'}}>
                    <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Дата</TableCell>
                                <TableCell align="center">A</TableCell>
                                <TableCell align="center">B</TableCell>
                                <TableCell align="center">C</TableCell>
                                <TableCell align="center">C_conveyor</TableCell>
                                <TableCell align="center">C_depacking</TableCell>
                                <TableCell align="center">G</TableCell>
                                <TableCell align="center">F</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pickedLinesPbl.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center"> {row['Дата закриття']}</TableCell>
                                    <TableCell align="center">{row.A}</TableCell>
                                    <TableCell align="center">{row.B}</TableCell>
                                    <TableCell align="center">{row.C}</TableCell>
                                    <TableCell align="center">{row.C_conveyor}</TableCell>
                                    <TableCell align="center">{row.C_depacking}</TableCell>
                                    <TableCell align="center">{row.G}</TableCell>
                                    <TableCell align="center">{row.F}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>            
            }
        </div>
    );
});

export default PickedLinesPbl;