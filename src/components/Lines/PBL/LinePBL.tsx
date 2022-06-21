import React from "react";

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { RecordsType } from "../../../types/type";

type PropsType = {
    line: RecordsType
}

export const LinePBL: React.FC<PropsType> = ({line}) => {
    
    return (
        <TableRow>
            <TableCell>{line.Дата}</TableCell>
            <TableCell>{line["Прийнято загалом"]}</TableCell>
            <TableCell>{line["Прийнято A"]}</TableCell>
            <TableCell>{line["Прийнято B"]}</TableCell>
            <TableCell>{line["Прийнято C"]}</TableCell>
            <TableCell>{line["Прийнято G"]}</TableCell>
            <TableCell>{line["Прийнято F"]}</TableCell>
            <TableCell>{line["Розподілено загалом"]}</TableCell>
            <TableCell>{line["Розподілено A"]}</TableCell>
            <TableCell>{line["Розподілено B"]}</TableCell>
            <TableCell>{line["Розподілено C"]}</TableCell>
            <TableCell>{line["Розподілено G"]}</TableCell>
            <TableCell>{line["Розподілено F"]}</TableCell>
            <TableCell>{line["Не розподілено загалом"]}</TableCell>
            <TableCell>{line["Не розподілено A"]}</TableCell>
            <TableCell>{line["Не розподілено B"]}</TableCell>
            <TableCell>{line["Не розподілено C"]}</TableCell>
            <TableCell>{line["Не розподілено G"]}</TableCell>
            <TableCell>{line["Не розподілено F"]}</TableCell>
            
            {/* {Object.keys(line).map(key => {
                return <TableCell key={key}>
                    {line[key as keyof RecordsType]}
                </TableCell> 
            })} */}
        </TableRow>
    )
}