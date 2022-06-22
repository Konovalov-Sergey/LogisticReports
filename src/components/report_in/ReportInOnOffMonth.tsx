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
import { getReportInOnOffMonth, getIsfetching } from './../../Redux/reportIn-selector';
import { requestReportInOnOffMonth } from './../../Redux/reportIn-reducer';
import Preloader from './../Common/Preloader/Preloader';



type PropsType = {}

const ReportInOnOffMonth: React.FC<PropsType> = () => {

    const reportInOnOffMonth = useSelector(getReportInOnOffMonth); // report_in online offline by month
    const isFetching = useSelector(getIsfetching); 
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const handleSubmit = (values: ValuesType) => {
        let dateFrom = `${values.dateFrom.getDate()}.${values.dateFrom.getMonth() + 1}.${values.dateFrom.getFullYear()}`
        let dateTo = `${values.dateTo.getDate()}.${values.dateTo.getMonth() + 1}.${values.dateTo.getFullYear()}`
        dispatch<any>(requestReportInOnOffMonth(values.wh, dateFrom, dateTo))
    }

    return (
        <div>
            <h2>Кількість прийнятих поставок, носіїв, артикулів, ліній помісячно у розрізі потоків (онлайн, офлайн) станом на {time} </h2>
            <ReportInOutForm handleSubmit={handleSubmit} />
            {isFetching ? <Preloader /> : null }
            {reportInOnOffMonth.length > 0 &&
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 450 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Рік</TableCell>
                                <TableCell align="center">Місяць</TableCell>
                                <TableCell align="center">Склад</TableCell>
                                <TableCell align="center">Онлайн_офлайн</TableCell>
                                <TableCell align="center">Поставки</TableCell>
                                <TableCell align="center">Носії</TableCell>
                                <TableCell align="center">Артикула</TableCell>
                                <TableCell align="center">Лінії</TableCell>
                                <TableCell align="center">Об'єм</TableCell>
                                <TableCell align="center">Вага</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportInOnOffMonth.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center"> {row.Рік}</TableCell>
                                    <TableCell align="center">{row.Місяць}</TableCell>
                                    <TableCell align="center">{row.Склад}</TableCell>
                                    <TableCell align="center">{row.Онлайн_офлайн}</TableCell>
                                    <TableCell align="center">{row.Поставки}</TableCell>
                                    <TableCell align="center">{row.Носії}</TableCell>
                                    <TableCell align="center">{row.Артикула}</TableCell>
                                    <TableCell align="center">{row.Лінії}</TableCell>
                                    <TableCell align="center">{row['Об\'єм']}</TableCell>
                                    <TableCell align="center">{row.Вага}</TableCell>
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

export default ReportInOnOffMonth;