import React, { memo } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getIsFetching, getPickedLinesPbl } from '../../../Redux/lines-selector';
import { requestPickedLinesPbl } from '../../../Redux/lines-reducer';
import Preloader from './../../Common/Preloader/Preloader';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';


type PropsType = {}

const PickedLinesPbl: React.FC<PropsType> = memo(() => {

    const pickedLinesPbl = useSelector(getPickedLinesPbl);
    const isFetching = useSelector(getIsFetching);
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const [startDate, setStartDate] = React.useState<Date | null>(today);
    const [endDate, setEndDate] = React.useState<Date | null>(today);

    const handleClick = (startDate: Date | null, endDate: Date | null) => {
        let dateFrom
        let dateTo
        startDate === null
            ? dateFrom = ''
            : dateFrom = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`
        endDate === null
            ? dateTo = ''
            : dateTo = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`
        dispatch<any>(requestPickedLinesPbl(dateFrom, dateTo))
    }

    const rows: GridRowsProp = pickedLinesPbl.map(line => {
        return { ...line, id: uuidv4() }
    });

    const columns: GridColDef[] = [
        { field: 'Дата закриття', headerName: 'Дата закриття', width: 120 },
        { field: 'A', headerName: 'A', width: 80 },
        { field: 'B', headerName: 'B', width: 80 },
        { field: 'C', headerName: 'C', width: 80 },
        { field: 'C_conveyor', headerName: 'C_conveyor', width: 100 },
        { field: 'C_depacking', headerName: 'C_depacking', width: 100 },
        { field: 'F', headerName: 'F', width: 80 },       
        { field: 'G', headerName: 'G', width: 80 }       
    ];

    const downloadExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(pickedLinesPbl)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "pickedLinesPbl")
        //Buffer
        //let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "pickedLinesPblData.xlsx")
    }

    return (
        <div>
           <h2>Кількість розділених ліній Break-bulk станом на {time} </h2>
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

            {isFetching ? <Preloader /> : null}

            {pickedLinesPbl.length > 0 &&

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ height: 600, width: '50%', marginTop: '20px' }}>
                        <DataGrid rows={rows} columns={columns} density='compact' />
                    </div>
                </Box>
            }
        </div>
    );
});

export default PickedLinesPbl;