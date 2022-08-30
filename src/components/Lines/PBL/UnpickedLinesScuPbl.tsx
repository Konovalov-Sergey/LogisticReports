import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsFetchingScuPbl, getUnPickedLinesScuPbl } from './../../../Redux/lines-selector';
import Preloader from './../../Common/Preloader/Preloader';
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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { requestUnpickedLinesScuPbl } from './../../../Redux/lines-reducer';
import * as XLSX from 'xlsx';


type PropsType = {}

const UnpickedLinesScuPbl: React.FC<PropsType> = memo(() => {

    const unpickedLinesScuPbl = useSelector(getUnPickedLinesScuPbl)
    const isFetchingScuPbl = useSelector(getIsFetchingScuPbl);
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const [startDate, setStartDate] = React.useState<Date | null>(today);
    const [warehouse, setWarehouse] = React.useState('all');


    const handleChange = (event: SelectChangeEvent) => {
        setWarehouse(event.target.value as string);
    };

    const handleClick = (startDate: Date | null, warehouse: string) => {
        let dateFrom
        startDate === null
            ? dateFrom = ''
            : dateFrom = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`
        dispatch<any>(requestUnpickedLinesScuPbl(dateFrom, warehouse))
    }

    const rows: GridRowsProp = unpickedLinesScuPbl.map(line => {
        return { ...line, id: uuidv4() }
    });

    const columns: GridColDef[] = [
        { field: 'Дата', headerName: 'Дата', width: 100 },
        { field: 'Склад', headerName: 'Склад', width: 70 },
        { field: 'Номер постачальника', headerName: 'Номер постачальника', width: 120 },
        { field: 'Постачальник', headerName: 'Постачальник', width: 250 },
        { field: 'Заявка', headerName: 'Заявка', width: 150 },
        { field: 'Артикул', headerName: 'Артикул', width: 120 },
        { field: 'Товар', headerName: 'Товар', width: 250 },
        { field: 'Кількість', headerName: 'Кількість', width: 50 },
        { field: 'Носій', headerName: 'Носій', width: 120 },
        { field: 'Клас місця', headerName: 'Клас місця', width: 150 },
        { field: 'Місце', headerName: 'Місце', width: 150 },
    ];

    const downloadExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(unpickedLinesScuPbl)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "unpickedLinesScuPbl")
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "unpickedLinesScuPbl.xlsx")
    }

    return (
        <div>
            <h2>Деталізація нерозділених ліній Break-bulk станом на {time} </h2>
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
                        label="Дата"
                        disableFuture
                        value={startDate}
                        inputFormat="dd.MM.yyyy"
                        onChange={(newValue) => {
                            setStartDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button variant="contained" 
                         sx={{height: '55px'}}
                        onClick={() => { handleClick(startDate, warehouse) }}>
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

            {isFetchingScuPbl ? <Preloader /> : null}

            {unpickedLinesScuPbl.length > 0 &&
            
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{ height: 700, width: '100%', marginTop: '20px' }}>
                        <DataGrid rows={rows} columns={columns} density='compact' />
                    </div>
                </Box>

            }
        </div>
    );
});

export default UnpickedLinesScuPbl;