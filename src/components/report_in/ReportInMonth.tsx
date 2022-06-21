import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { ReportInOutForm, ValuesType } from '../Common/form/ReportInOutForm';
import { useSelector, useDispatch } from 'react-redux';
import { getReportInMonth } from './../../Redux/reportIn-selector';
import { requestReportInMonth } from './../../Redux/reportIn-reducer';



type PropsType = {}

const ReportInMonth: React.FC<PropsType> = () => {

    const reportInMonth = useSelector(getReportInMonth);
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const handleSubmit = (values: ValuesType) => {
        let dateFrom = `${values.dateFrom.getDate()}.${values.dateFrom.getMonth() + 1}.${values.dateFrom.getFullYear()}`
        let dateTo = `${values.dateTo.getDate()}.${values.dateTo.getMonth() + 1}.${values.dateTo.getFullYear()}`
        dispatch<any>(requestReportInMonth(values.wh, dateFrom, dateTo))
    }

    return (
        <div>
            <h2>Кількість прийнятих поставок, носіїв, артикулів, ліній за період станом на {time} </h2>
            <ReportInOutForm handleSubmit={handleSubmit} />
            {reportInMonth.length > 0 &&
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 450 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Рік</TableCell>
                                <TableCell align="center">Місяць</TableCell>
                                <TableCell align="center">Склад</TableCell>
                                <TableCell align="center">Поставки</TableCell>
                                <TableCell align="center">Носії</TableCell>
                                <TableCell align="center">Артикула</TableCell>
                                <TableCell align="center">Лінії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportInMonth.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center"> {row.Рік}</TableCell>
                                    <TableCell align="center">{row.Місяць}</TableCell>
                                    <TableCell align="center">{row.Склад}</TableCell>
                                    <TableCell align="center">{row.Поставки}</TableCell>
                                    <TableCell align="center">{row.Носії}</TableCell>
                                    <TableCell align="center">{row.Артикула}</TableCell>
                                    <TableCell align="center">{row.Лінії}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            }
        </div>
    );
};

export default ReportInMonth;