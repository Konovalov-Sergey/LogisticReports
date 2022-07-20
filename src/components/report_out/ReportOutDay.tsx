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
import { getReportOutDay } from '../../Redux/reportOut-selector';
import { requestReportOutDay } from '../../Redux/reportOut-reducer';
import { getIsfetching } from './../../Redux/reportOut-selector';
import Preloader from './../Common/Preloader/Preloader';



type PropsType = {}

const ReportOutDay: React.FC<PropsType> = () => {

    const reportOutDay = useSelector(getReportOutDay);
    const isFetching = useSelector(getIsfetching);
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const handleSubmit = (values: ValuesType) => {
        let dateFrom = `${values.dateFrom.getDate()}.${values.dateFrom.getMonth() + 1}.${values.dateFrom.getFullYear()}`
        let dateTo = `${values.dateTo.getDate()}.${values.dateTo.getMonth() + 1}.${values.dateTo.getFullYear()}`
        dispatch<any>(requestReportOutDay(values.wh, dateFrom, dateTo))
    }

    return (
        <div>
            <h2>Кількість відвантажених відправок, носіїв, артикулів, ліній поденно станом на {time} </h2>
            <ReportInOutForm handleSubmit={handleSubmit} />
            {isFetching ? <Preloader /> : null }
            {reportOutDay.length > 0 &&
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 450 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Дата</TableCell>
                                <TableCell align="center">Склад</TableCell>
                                <TableCell align="center">Рейси</TableCell>
                                <TableCell align="center">Відправки</TableCell>
                                <TableCell align="center">Заявки</TableCell>
                                <TableCell align="center">Носії</TableCell>
                                <TableCell align="center">Артикула</TableCell>
                                <TableCell align="center">Лінії</TableCell>
                                <TableCell align="center">Об'єм</TableCell>
                                <TableCell align="center">Вага</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportOutDay.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center"> {row.Дата}</TableCell>
                                    <TableCell align="center">{row.Склад}</TableCell>
                                    <TableCell align="center">{row.Рейс}</TableCell>
                                    <TableCell align="center">{row.Відправка}</TableCell>
                                    <TableCell align="center">{row.Заявка}</TableCell>
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

export default ReportOutDay;