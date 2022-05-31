import React from "react";
import { RecordsType } from "../../Redux/lines-reducer";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

type PropsType = {
    line: RecordsType
}

export const Line: React.FC<PropsType> = ({line}) => {
    
    return (
        <TableRow>
            {Object.keys(line).map(key => {
                return <TableCell key={key}>
                    {line[key as keyof RecordsType]}
                </TableCell> 
            })}
        </TableRow>
    )
}