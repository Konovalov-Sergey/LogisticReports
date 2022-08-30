import React, { memo } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { getUnPickedLinesPbl } from '../../../Redux/lines-selector';
import { getIsFetching } from './../../../Redux/lines-selector';
import { requestUnpickedLinesPbl } from './../../../Redux/lines-reducer';
import Preloader from './../../Common/Preloader/Preloader';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

type PropsType = {}

const UnpickedLinesPbl: React.FC<PropsType> = memo(() => {

    const unpickedLinesPbl = useSelector(getUnPickedLinesPbl);
    const isFetching = useSelector(getIsFetching);
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;

    const handleClick = () => {
        dispatch<any>(requestUnpickedLinesPbl())
    }

    const rows: GridRowsProp = unpickedLinesPbl.map(line => {
        return { ...line, id: uuidv4() }
    });

    const columns: GridColDef[] = [
        { field: 'Склад', headerName: 'Склад', width: 70 },
        { field: 'Лінії', headerName: 'Лінії', width: 70 }
    ];

    const downloadExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(unpickedLinesPbl)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "unpickedLinesPbl")
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "unpickedLinesPblData.xlsx")
    }

    return (
        <div>
            <h2>Кількість нерозділених ліній Break-bulk станом на {time} </h2>
            <Button variant="contained" onClick={() => { handleClick() }}>
                Submit
            </Button>
            <Button variant="text"
                color='success'
                sx={{ height: '55px' }}
                onClick={() => { downloadExcel() }}>
                download
            </Button>
            {isFetching ? <Preloader /> : null}

            {unpickedLinesPbl.length > 0 &&

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ height: 500, width: '75%', marginTop: '20px' }}>
                        <DataGrid rows={rows} columns={columns} density='compact' />
                    </div>
                </Box>
            }
        </div>
    );
});

export default UnpickedLinesPbl;