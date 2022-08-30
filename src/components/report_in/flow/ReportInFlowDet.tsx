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
import { getIsfetchingFlowDet, getReportInflowDet } from '../../../Redux/reportIn-selector';
import { requestReportInFlowDet } from '../../../Redux/reportIn-reducer';
import * as XLSX from 'xlsx';

type PropsType = {}

const ReportInFlowDet: React.FC<PropsType> = memo(() => {

    const reportInFlowDet = useSelector(getReportInflowDet)
    const isFetchingFlowDet = useSelector(getIsfetchingFlowDet);
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const [startDate, setStartDate] = React.useState<Date | null>(today);
    const [typeFlow, setTypeflow] = React.useState('PNK_OFF');


    const handleChange = (event: SelectChangeEvent) => {
        setTypeflow(event.target.value as string);
    };

    const handleClick = (startDate: Date | null, typeFlow: string) => {
        let dateFrom
        startDate === null
            ? dateFrom = ''
            : dateFrom = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`
        dispatch<any>(requestReportInFlowDet(dateFrom, typeFlow))
    }

    const rows: GridRowsProp = reportInFlowDet.map(line => {
        return { ...line, id: uuidv4() }
    });

    const columns: GridColDef[] = [
        { field: 'Дата', headerName: 'Дата', width: 100 },
        { field: 'Склад', headerName: 'Склад', width: 50 },
        { field: 'Постачальник', headerName: 'Постачальник', width: 220 },
        { field: 'Артикул', headerName: 'Артикул', width: 120 },
        { field: 'Назва', headerName: 'Назва', width: 200},
        { field: 'Кількість', headerName: 'Кількість', width: 70},
        { field: 'Відділ', headerName: 'Відділ', width: 70},
        { field: 'Заявник', headerName: 'Заявник', width: 70},
        { field: 'Поставка', headerName: 'Поставка', width: 90},
        { field: 'Замовлення п-ка', headerName: 'Замовлення п-ка', width: 150},
        { field: 'Замовлення', headerName: 'Замовлення', width: 140},
        { field: 'Резерв', headerName: 'Резерв', width: 80},
        { field: 'Носій', headerName: 'Носій', width: 110},
        { field: 'Тип', headerName: 'Тип', width: 70}
    ];

    const downloadExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(reportInFlowDet)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "reportInFlowDet")
        //Buffer
        //let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "reportInFlowDetailing.xlsx")
    }

    return (
        <div>
            <h2>Деталізація приходу по каналах забезпечення станом на {time} </h2>
            <Box sx={{ minWidth: 120 }}>
                <FormControl /*fullWidth*/>
                    <InputLabel id="typeFlow">Канал забезпечення</InputLabel>
                    <Select
                        labelId="typeFlow"
                        id="typeFlow"
                        value={typeFlow}
                        label="typeFlow"
                        onChange={handleChange}
                    >
                        <MenuItem value={'PNK_OFF'}>Пнк офлайн</MenuItem>
                        <MenuItem value={'PPT_OFF'}>Ппт офлайн</MenuItem>
                        <MenuItem value={'CD_OFF'}>Кросдок офлайн</MenuItem>
                        <MenuItem value={'PNK_ON'}>Пнк онлайн</MenuItem>
                        <MenuItem value={'PPT_ON'}>Ппт онлайн</MenuItem>
                        <MenuItem value={'FF_BY_STOR_ON'}>Забезпечення ПТ</MenuItem>
                        <MenuItem value={'RETURN_ON'}>Повернення онлайн</MenuItem>
                        <MenuItem value={'CD_ON'}>Кросдок онлайн</MenuItem>
                        <MenuItem value={'SUP_EXT_ON'}>Зовнішні постачальники</MenuItem>
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

            {reportInFlowDet.length > 0 &&

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ height: 500, width: '100%', marginTop: '20px' }}>
                        <DataGrid rows={rows} columns={columns} density='compact' />
                    </div>
                </Box>
            }
        </div>
    );
});

export default ReportInFlowDet;