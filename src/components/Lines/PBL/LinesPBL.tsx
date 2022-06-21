
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requesPblLines } from "../../../Redux/lines-reducer";
import { getPblLines } from '../../../Redux/lines-selector';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LinePBL } from './LinePBL';
import { Box } from "@mui/material";

type PropsType = {}

export const LinesPBL: React.FC<PropsType> = () => {

    let today = new Date();
    let time =  `${today.getHours()}:${today.getMinutes()}`;
    const wh = ['всі','A','B','C','G', 'F'];    
    
    
    const pblLines = useSelector(getPblLines);
    const dispatch = useDispatch();    

    useEffect(() => {
    dispatch<any>(requesPblLines());
   }, [])
   
    return (
        <Box>
            <h2>Аналітика ліній BreakBulk станом на {time} </h2>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell rowSpan={2}>Дата</TableCell>
                        <TableCell colSpan={6}>Прийнято ліній</TableCell>
                        <TableCell colSpan={6}>Розділено ліній за день всього (незалежно від дня прийому)</TableCell>
                        <TableCell colSpan={6}>Нерозділені лінії на даний момент</TableCell>

                        {/* {  pblLines.length > 0 &&
                            Object.keys(pblLines[0]).map(key => {
                                return <TableCell key={key} sx={{ textAlign: 'center', lineHeight: 1.1, fontSize: '0.7rem', fontWeight: 700, padding: '10px' }}>
                                    {key}
                                </TableCell> 
                            })                                                     
                        }  */}
                    </TableRow>
                    <TableRow>
                        
                       { wh.map((w, index) => <TableCell key={index}> {w}</TableCell>)  }
                       { wh.map((w, index) => <TableCell key={index}> {w}</TableCell>)  }
                       { wh.map((w, index) => <TableCell key={index}> {w}</TableCell>)  }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pblLines.map((l, index) => <LinePBL line={l} key={index}/> )}
                </TableBody>                
            </Table>            
        </TableContainer>
        </Box>
        
    )
}