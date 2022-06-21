import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { getPickLines } from './../../../Redux/lines-selector';
import { useDispatch } from 'react-redux';
import { requestPickLines } from "../../../Redux/lines-reducer";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LinePick } from './LinePick';
import Box from '@mui/material/Box';


type PropsType = {}

export const LinesPick: React.FC<PropsType> = () => {

    const pickLines = useSelector(getPickLines);
    const dispatch = useDispatch();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;


    useEffect(() => {
        dispatch<any>(requestPickLines())
    }, [])

    return (
        <Box>
            <h2> Аналітика зібраного Picking-у по даті створення заявки станом на {time} </h2>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell>Дата створення</TableCell>
                            <TableCell>Загалом по складам</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>B</TableCell>
                            <TableCell>C</TableCell>
                            <TableCell>G</TableCell>
                            <TableCell>Загалом по відділам</TableCell>
                            <TableCell>10</TableCell>
                            <TableCell>20</TableCell>
                            <TableCell>30</TableCell>
                            <TableCell>40</TableCell>
                            <TableCell>50</TableCell>
                            <TableCell>60</TableCell>
                            <TableCell>70</TableCell>
                            <TableCell>80</TableCell>
                            <TableCell>90</TableCell>
                            <TableCell>100</TableCell>
                            <TableCell>110</TableCell>
                            <TableCell>210</TableCell>
                            <TableCell>310</TableCell>
                            <TableCell>440</TableCell>
                            <TableCell>610</TableCell>
                            <TableCell>800</TableCell>
                            <TableCell>Кафе</TableCell>

                            {/* {pickLines.length > 0 &&
                                Object.keys(pickLines[0]).map(key => {
                                    return <TableCell key={key} >
                                        {key}
                                    </TableCell>
                                })
                            } */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pickLines.map((l, index) => <LinePick line={l} key={index} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}