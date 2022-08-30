import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Preloader from '../../Common/Preloader/Preloader';
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
import { requestLinesPickingDet } from '../../../Redux/lines-reducer';
import * as XLSX from 'xlsx';
import { getIsFetchingPickDet, getLinesPickingDet } from './../../../Redux/lines-selector';

type PropsType = {}

const PickingLinesDetailing: React.FC<PropsType> = memo(() => {
    
    const linesPickingDet = useSelector(getLinesPickingDet);
    const іsFetching = useSelector(getIsFetchingPickDet);
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
            dispatch<any>(requestLinesPickingDet(warehouse, dateFrom, dateTo))
    }

    const rows: GridRowsProp = linesPickingDet.map(line => {
        return { ...line, id: uuidv4() }
    });

    const columns: GridColDef[] = [
        { field: 'Дата створення', headerName: 'Дата створення', width: 120 },
        { field: 'Склад', headerName: 'Склад', width: 80 },
        { field: 'Відправка', headerName: 'Відправка', width: 100 },
        { field: 'Артикул', headerName: 'Артикул', width: 100 },
        { field: 'Назва', headerName: 'Назва', width: 250 },
        { field: 'К-сть для збору', headerName: 'К-сть для збору', width: 120 },
        { field: 'Складська зона', headerName: 'Складська зона', width: 130 },
        { field: 'З місця', headerName: 'З місця', width: 100 },
        { field: 'На місце', headerName: 'На місце', width: 100 },
        { field: 'З носія', headerName: 'З носія', width: 120 },
        { field: 'На носій', headerName: 'На носій', width: 120 },
        
    ];

    const downloadExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(linesPickingDet)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "linesPickingDet")
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "linesPickingDet.xlsx")
    }

    return (
        <div>
            <h2>Деталізація ліній Picking станом на {time} </h2>
            <Box>
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
            {іsFetching ? <Preloader /> : null}

            {linesPickingDet.length > 0 &&

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ height: 500, width: '100%', marginTop: '20px'}}>
                        <DataGrid rows={rows} columns={columns} density='compact' />
                    </div>
                </Box>
            }
        </div>
    );
});

export default PickingLinesDetailing;