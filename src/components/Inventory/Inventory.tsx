import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getInventory, getIsFetching } from './../../Redux/inventory-selector';
import { requestInventory } from './../../Redux/inventory-reducer';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Preloader from './../Common/Preloader/Preloader';
import * as XLSX from 'xlsx';

type PropsType = {}


const Inventory: React.FC<PropsType> = memo(() => {

    const inventory = useSelector(getInventory);
    const isFetching = useSelector(getIsFetching);
    
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const [department, setDepartment] = React.useState('10');

    const handleChange = (event: SelectChangeEvent) => {
        setDepartment(event.target.value as string);
    };

    const handleClick = (department: string) => {
        dispatch<any>(requestInventory(department))
    };

    const rows: GridRowsProp = inventory.map(line => {
        return { ...line, id: uuidv4() }
    });

    const columns: GridColDef[] = [
        { field: 'Ариткул', headerName: 'Ариткул', width: 110 },
        { field: 'Назва', headerName: 'Назва', width: 370 },
        { field: 'EAN', headerName: 'EAN', width: 130 },
        { field: 'Відділ', headerName: 'Відділ', width: 70 },
        { field: 'Кратність упаковки', headerName: 'Кратність упаковки', width: 70 },
        { field: 'Кратність палети', headerName: 'Кратність палети', width: 70 },
        { field: 'Од.відвантаження', headerName: 'Од.відвантаження', width: 70 },
        { field: 'Кількість', headerName: 'Кількість', width: 70 },
        { field: 'Доступна к-сть', headerName: 'Доступна к-сть', width: 70 },
        { field: 'Власник', headerName: 'Власник', width: 250 },
        { field: 'Постачальник', headerName: 'Постачальник', width: 270 },
    ];

    const downloadExcel = () => {
        const workSheet=XLSX.utils.json_to_sheet(inventory)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook,workSheet,"inventory")
        //Buffer
        //let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
        //Binary string
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
        //Download
        XLSX.writeFile(workBook,"inventoryData.xlsx")
    }

    return (
        <div>
            <h2>Доступні товарні залишки Qguar по відділах станом на {time} </h2>
            <Box sx={{ minWidth: 120 }}>
                <FormControl /*fullWidth*/>
                    <InputLabel id="department">Відділ</InputLabel>
                    <Select
                        labelId="department"
                        id="department"
                        value={department}
                        label="Відділ"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={60}>60</MenuItem>
                        <MenuItem value={70}>70</MenuItem>
                        <MenuItem value={80}>80</MenuItem>
                        <MenuItem value={90}>90</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                        <MenuItem value={110}>110</MenuItem>
                        <MenuItem value={210}>210</MenuItem>
                        <MenuItem value={310}>310</MenuItem>
                        <MenuItem value={440}>440</MenuItem>
                        <MenuItem value={610}>610</MenuItem>
                        <MenuItem value={800}>800</MenuItem>
                        <MenuItem value={999}>999</MenuItem>
                        <MenuItem value={'MAGO*'}>MAGO*</MenuItem>
                        <MenuItem value={'Кафе'}>Кафе</MenuItem>
                    </Select>
                </FormControl>               
                    
                    <Button variant="contained" 
                         sx={{height: '55px'}}
                        onClick={() => { handleClick(department) }}>
                        Submit
                    </Button>
                    <Button variant="text"
                        color='success' 
                        disabled={!inventory}
                         sx={{height: '55px'}}
                        onClick={() => { downloadExcel() }}>
                        download
                    </Button>
                
            </Box>

            {isFetching ? <Preloader /> : null}

            {inventory.length > 0 &&
            
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{ height: 650, width: '100%', marginTop: '20px' }}>
                        <DataGrid rows={rows} columns={columns} density='compact' />
                    </div>
                </Box>

            }
        </div>
    );
});

export default Inventory;