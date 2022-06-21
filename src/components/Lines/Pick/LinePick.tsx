import React from "react";

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { LinesPickPHPType } from "../../../types/type";

type PropsType = {
    line: LinesPickPHPType
}

export const LinePick: React.FC<PropsType> = ({line}) => {
    
    return (
        <TableRow>
            <TableCell>{line["Дата створення"]}</TableCell>
            <TableCell>{line["Загалом по складам"]}</TableCell>
            <TableCell>{line.A}</TableCell>
            <TableCell>{line.B}</TableCell>
            <TableCell>{line.C}</TableCell>
            <TableCell>{line.G}</TableCell>
            <TableCell>{line["Загалом по відділам"]}</TableCell>
            <TableCell>{line[10]}</TableCell>
            <TableCell>{line[100]}</TableCell>
            <TableCell>{line[110]}</TableCell>
            <TableCell>{line[20]}</TableCell>
            <TableCell>{line[210]}</TableCell>
            <TableCell>{line[30]}</TableCell>
            <TableCell>{line[310]}</TableCell>
            <TableCell>{line[40]}</TableCell>
            <TableCell>{line[440]}</TableCell>
            <TableCell>{line[50]}</TableCell>
            <TableCell>{line[60]}</TableCell>
            <TableCell>{line[610]}</TableCell>
            <TableCell>{line[70]}</TableCell>
            <TableCell>{line[80]}</TableCell>
            <TableCell>{line[800]}</TableCell>
            <TableCell>{line[90]}</TableCell>
            <TableCell>{line.Кафе}</TableCell>            
        </TableRow>
    )
}