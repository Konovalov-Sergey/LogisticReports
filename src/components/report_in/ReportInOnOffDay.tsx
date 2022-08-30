import React from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getIsfetching, getReportInOnOffDay } from './../../Redux/reportIn-selector';
import { requestReportInOnOffDay } from './../../Redux/reportIn-reducer';
import Preloader from './../Common/Preloader/Preloader';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

type PropsType = {}

const ReportInOnOffDay: React.FC<PropsType> = () => {

    const reportInOnOffDay = useSelector(getReportInOnOffDay); // report_in online offline by month
    const isFetching = useSelector(getIsfetching); 
    const dispatch = useDispatch();
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1)
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const [startDate, setStartDate] = React.useState<Date | null>(yesterday);
    const [endDate, setEndDate] = React.useState<Date | null>(yesterday);
    const [warehouse, setWarehouse] = React.useState('all');

    const handleChange = (event: SelectChangeEvent) => {
        setWarehouse(event.target.value as string);
    };

    const handleClick = (warehouse: string, startDate: Date | null, endDate: Date | null) => {
        let dateFrom
        let dateTo
        startDate === null
            ? dateFrom = ''
            : dateFrom = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`
        endDate === null
            ? dateTo = ''
            : dateTo = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`
        dispatch<any>(requestReportInOnOffDay(warehouse, dateFrom, dateTo ))
    }

    const rows: GridRowsProp = reportInOnOffDay.map(line => {
        return { ...line, id: uuidv4() }
    });

    const columns: GridColDef[] = [
        { field: 'Дата', headerName: 'Дата', width: 100 },
        { field: 'Склад', headerName: 'Склад', width: 70 },
        { field: 'Онлайн_офлайн', headerName: 'Онлайн_офлайн', width: 130 },
        { field: 'Поставки', headerName: 'Поставки', width: 100 },
        { field: 'Носії', headerName: 'Носії', width: 70 },
        { field: 'Артикула', headerName: 'Артикула', width: 90 },
        { field: 'Лінії', headerName: 'Лінії', width: 70 },
        { field: 'Об\'єм', headerName: 'Об\'єм', width: 90 },
        { field: 'Вага', headerName: 'Вага', width: 90 }        
    ];

    const downloadExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(reportInOnOffDay)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "reportInOnOffDay")
        //Buffer
        //let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "reportInOnOffDayData.xlsx")
    }


    return (
        <div>
            <h2>Кількість прийнятих поставок, носіїв, артикулів, ліній помісячно у розрізі потоків (онлайн, офлайн) станом на {time} </h2>
            <Box sx={{ minWidth: 120 }}>
                <FormControl /*fullWidth*/>
                    <InputLabel id="warehouse">Склад</InputLabel>
                    <Select
                        labelId="warehouse"
                        id="warehouse"
                        value={warehouse}
                        label="warehouse"
                        onChange={handleChange}
                    >
                        <MenuItem value={2}>A</MenuItem>
                        <MenuItem value={3}>B</MenuItem>
                        <MenuItem value={1}>C</MenuItem>
                        <MenuItem value={5}>F</MenuItem>
                        <MenuItem value={4}>G</MenuItem>
                        <MenuItem value={'all'}>Всі</MenuItem>
                    </Select>

                </FormControl>

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
                        onClick={() => { handleClick(warehouse, startDate, endDate) }}>
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
            {isFetching ? <Preloader /> : null}

            {reportInOnOffDay.length > 0 &&

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ height: 500, width: '55%', marginTop: '20px' }}>
                        <DataGrid rows={rows} columns={columns} density='compact' />
                    </div>
                </Box>
            }
        </div>
    );
};

export default ReportInOnOffDay;