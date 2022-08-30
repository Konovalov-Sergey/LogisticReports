import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Preloader from './../../Common/Preloader/Preloader';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { getIsfetching, getReportOutFlow } from './../../../Redux/reportOut-selector';
import { requestReportOutFlow } from './../../../Redux/reportOut-reducer';

type PropsType = {}

const ReportOutFlowTotal: React.FC<PropsType> = memo(() => {

    const reportOutFlow = useSelector(getReportOutFlow);
    const іsFetching = useSelector(getIsfetching);
    const dispatch = useDispatch();
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1)
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const [startDate, setStartDate] = React.useState<Date | null>(yesterday);
    const [endDate, setEndDate] = React.useState<Date | null>(yesterday);


    const handleClick = (startDate: Date | null, endDate: Date | null) => {
        let dateFrom
        let dateTo
        startDate === null
            ? dateFrom = ''
            : dateFrom = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`
        endDate === null
            ? dateTo = ''
            : dateTo = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`
        dispatch<any>(requestReportOutFlow(dateFrom, dateTo))
    }

    const rows = reportOutFlow.map(line => {
        return { ...line, id: uuidv4() }
    });


    const downloadExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(reportOutFlow)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "reportOutFlow")
        //Buffer
        //let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "reportOutFlowData.xlsx")
    }


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <h2>Кількість документів, ліній за каналами відвантаження станом на {time} </h2>

            <Box sx={{ minWidth: 120 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Дата від..."
                        disableFuture
                        value={startDate}
                        inputFormat="dd.MM.yyyy"
                        onChange={(newValue) => {
                            setStartDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        label="Дата до..."
                        disableFuture
                        value={endDate}
                        inputFormat="dd.MM.yyyy"
                        onChange={(newValue) => {
                            setEndDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button variant="contained"
                        sx={{ height: '55px' }}
                        onClick={() => { handleClick(startDate, endDate) }}>
                        Submit
                    </Button>
                    <Button variant="text"
                        color='success'
                        sx={{ height: '55px' }}
                        onClick={() => { downloadExcel() }}>
                        download
                    </Button>
                </LocalizationProvider>
            </Box>
            {іsFetching ? <Preloader /> : null}
            {rows.length > 0 &&
                <Paper sx={{ width: '100%', marginTop: '20px' }}>
                    <TableContainer sx={{ maxHeight: 540 }}>
                        <Table stickyHeader aria-label="sticky table"   
                            sx={{"& th ": { border: "1px solid rgba(224, 224, 224, 1)"},
                                "& .MuiTableCell-root" : {textAlign: 'center'}
                            }}
                            size = 'small'
                        >
                <TableHead >
                    <TableRow>
                        <TableCell rowSpan={3}> Дата </TableCell>
                        <TableCell colSpan={8}> Онлайн </TableCell>
                        <TableCell colSpan={6}> Офлайн </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}> ЦВЗ </TableCell>
                        <TableCell colSpan={2}> Поштові оператори </TableCell>
                        <TableCell colSpan={2}> Кросдок транзіт</TableCell>
                        <TableCell colSpan={2}> R1 забезпечення </TableCell>
                        <TableCell colSpan={2}> Ппт </TableCell>
                        <TableCell colSpan={2}> Кросдок</TableCell>
                        <TableCell colSpan={2}> Інше </TableCell>
                    </TableRow>
                    <TableRow>                                    
                        <TableCell>Док-ти</TableCell>
                        <TableCell>Лінії</TableCell>
                        <TableCell>Док-ти</TableCell>
                        <TableCell>Лінії</TableCell>
                        <TableCell>Док-ти</TableCell>
                        <TableCell>Лінії</TableCell>
                        <TableCell>Док-ти</TableCell>
                        <TableCell>Лінії</TableCell>
                        <TableCell>Док-ти</TableCell>
                        <TableCell>Лінії</TableCell>
                        <TableCell>Док-ти</TableCell>
                        <TableCell>Лінії</TableCell>
                        <TableCell>Док-ти</TableCell>
                        <TableCell>Лінії</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                                <TableCell> {row.Дата}</TableCell>
                                <TableCell> {row['ЦВЗ д-ти']}</TableCell>
                                <TableCell> {row['ЦВЗ лінії']}</TableCell>
                                <TableCell> {row['Поштові оператори д-ти']}</TableCell>
                                <TableCell> {row['Поштові оператори лінії']}</TableCell>
                                <TableCell> {row['Кросдок онлайн д-ти']}</TableCell>
                                <TableCell> {row['Кросдок онлайн лінії']}</TableCell>
                                <TableCell> {row['R1 забезпечення д-ти']}</TableCell>
                                <TableCell> {row['R1 забезпечення лінії']}</TableCell>
                                <TableCell> {row['ППТ офлайн д-ти']}</TableCell>
                                <TableCell> {row['ППТ офлайн лінії']}</TableCell>
                                <TableCell> {row['Кросдок офлайн д-ти']}</TableCell>
                                <TableCell> {row['Кросдок офлайн лінії']}</TableCell>
                                <TableCell> {row['Інше д-ти']}</TableCell>
                                <TableCell> {row['Інше лінії']}</TableCell>
                                
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
}
        </div>
    );
});

export default ReportOutFlowTotal;