import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUnPickedLinesSupPbl, getIsFetchingSupPBl } from './../../../Redux/lines-selector';
import Preloader from './../../Common/Preloader/Preloader';
import { requestUnpickedLinesSupPbl } from '../../../Redux/lines-reducer';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material';
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

const UnpickedLinesSupPbl: React.FC<PropsType> = memo(() => {

    const unpickedLinesSupPbl = useSelector(getUnPickedLinesSupPbl);
    const іsFetchingSupPbl = useSelector(getIsFetchingSupPBl);
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const [startDate, setStartDate] = React.useState<Date | null>(today);
    const [endDate, setEndDate] = React.useState<Date | null>(today);
    const [warehouse, setWarehouse] = React.useState('all');


    const handleChange = (event: SelectChangeEvent) => {
        setWarehouse(event.target.value as string);
    };

    const handleClick = (startDate: Date | null, endDate: Date | null, warehouse: string) => {
        let dateFrom
        let dateTo
        startDate === null
            ? dateFrom = ''
            : dateFrom = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`
        endDate === null
            ? dateTo = ''
            : dateTo = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`
            dispatch<any>(requestUnpickedLinesSupPbl(dateFrom, dateTo, warehouse))
    }

    const rows: GridRowsProp = unpickedLinesSupPbl.map(line => {
        return { ...line, id: uuidv4() }
    });

    const columns: GridColDef[] = [
        { field: 'Дата створення', headerName: 'Дата', width: 100 },
        { field: 'Склад', headerName: 'Склад', width: 70 },
        { field: 'Постачальник', headerName: 'Постачальник', width: 300 },
        { field: 'Лінії', headerName: 'Лінії', width: 70 },
    ];

    const downloadExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(unpickedLinesSupPbl)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "unpickedLinesSupPbl")
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "unpickedLinesSupPbl.xlsx")
    }

    return (
        <div>
            <h2>Кількість нерозділених ліній Break-bulk у розрізі постачальників станом на {time} </h2>
            {/* <ReportInOutForm handleSubmit={handleSubmit} /> */}
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
                            sx={{height: '55px'}}
                            onClick={() => { handleClick(startDate, endDate, warehouse) }}>
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
            {іsFetchingSupPbl ? <Preloader /> : null}

            {unpickedLinesSupPbl.length > 0 &&

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ height: 500, width: '50%', marginTop: '20px'}}>
                        <DataGrid rows={rows} columns={columns} density='compact' />
                    </div>
                </Box>
            }

        </div>
    );
});

export default UnpickedLinesSupPbl;



