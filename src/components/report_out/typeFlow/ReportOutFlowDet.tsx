import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import * as XLSX from 'xlsx';
import { getReportOutFlowDet } from '../../../Redux/reportOut-selector';
import { getIsfetchingFlowDet } from './../../../Redux/reportOut-selector';
import { requestReportOutFlowDet } from '../../../Redux/reportOut-reducer';

type PropsType = {}

const ReportOutFlowDet: React.FC<PropsType> = memo(() => {

    const reportOutFlowDet = useSelector(getReportOutFlowDet)
    const isFetchingFlowDet = useSelector(getIsfetchingFlowDet);
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const [startDate, setStartDate] = React.useState<Date | null>(today);
    const [typeFlow, setTypeflow] = React.useState('CVZ');


    const handleChange = (event: SelectChangeEvent) => {
        setTypeflow(event.target.value as string);
    };

    const handleClick = (startDate: Date | null, typeFlow: string) => {
        let dateFrom
        startDate === null
            ? dateFrom = ''
            : dateFrom = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`
        dispatch<any>(requestReportOutFlowDet(dateFrom, typeFlow))
    }

    const rows: GridRowsProp = reportOutFlowDet.map(line => {
        return { ...line, id: uuidv4() }
    });

    const columns: GridColDef[] = [
        { field: 'Дата', headerName: 'Дата', width: 100 },
        { field: 'Склад', headerName: 'Склад', width: 50 },
        { field: 'Відправка', headerName: 'Відправка', width: 90 },
        { field: 'Артикул', headerName: 'Артикул', width: 110 },
        { field: 'Назва', headerName: 'Назва', width: 200},
        { field: 'Відділ', headerName: 'Відділ', width: 70},
        { field: 'Кількість', headerName: 'К-сть', width: 50},
        { field: 'Одержувач', headerName: 'Одержувач', width: 170},
        { field: 'Заявка', headerName: 'Заявка', width: 150},
        { field: 'Носій', headerName: 'Носій', width: 120},
        { field: 'Номер ТЗ', headerName: 'Номер ТЗ', width: 100},
        { field: 'Постачальник', headerName: 'Постачальник', width: 190},
        { field: 'Рейс', headerName: 'Рейс', width: 90},
        { field: 'Тип', headerName: 'Тип', width: 60}
    ];

    const downloadExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(reportOutFlowDet)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "reportOutFlowDet")
        //Buffer
        //let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "reportOutFlowDet.xlsx")
    }

    return (
        <div>
            <h2>Деталізація по каналах відвантаження станом на {time} </h2>
            <Box sx={{ minWidth: 120 }}>
                <FormControl /*fullWidth*/>
                    <InputLabel id="typeFlow">Канал відвантаження</InputLabel>
                    <Select
                        labelId="typeFlow"
                        id="typeFlow"
                        value={typeFlow}
                        label="typeFlow"
                        onChange={handleChange}
                    >
                        <MenuItem value={'CVZ'}>ЦВЗ</MenuItem>
                        <MenuItem value={'POST_OPERATORS'}>Поштові оператори</MenuItem>
                        <MenuItem value={'CD_transit'}>Кросдок транзіт</MenuItem>
                        <MenuItem value={'FF_BY_STOR_ON'}>R1 забезпечення</MenuItem>
                        <MenuItem value={'PPT_OFFlINE'}>Ппт офлайн</MenuItem>
                        <MenuItem value={'CD_SUPP'}>Кросдок офлайн</MenuItem>
                        <MenuItem value={'OTHER'}>Інше</MenuItem>
                        
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
                        sx={{ height: '55px' }}
                        onClick={() => { handleClick(startDate, typeFlow) }}>
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

            {isFetchingFlowDet ? <Preloader /> : null}

            {reportOutFlowDet.length > 0 &&

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ height: 500, width: '100%', marginTop: '20px' }}>
                        <DataGrid rows={rows} columns={columns} density='compact' />
                    </div>
                </Box>
            }
        </div>
    );
});

export default ReportOutFlowDet;