import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { getIsFetching, getVolumeWhOut } from '../../../../Redux/volume-selector';
import { requestVolumeWhOut } from '../../../../Redux/volume-reducer';
import { Box } from '@mui/material';
import { ValuesType, VolumeForm } from '../volumeForm';


type PropsType = {}

export const VolumeByWhOut: React.FC<PropsType> = () => {

  const volumeWhOut = useSelector(getVolumeWhOut);
  const isFetching = useSelector(getIsFetching)
  const dispatch = useDispatch();
  let today = new Date();
  let time = `${today.getHours()}:${today.getMinutes()}`;

  let handleSubmit = (values: ValuesType) => {
      let month = values.month_year?.getMonth() + 1;
      let year = values.month_year?.getFullYear();
      dispatch<any>(requestVolumeWhOut(values.wh, month, year))
  }

  return <>

    <h2>Відвантажений об'єм у розрізі складів станом на {time}</h2>
    <VolumeForm handleSubmit={handleSubmit} />
    {volumeWhOut.length > 0 &&
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 450 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Рік</TableCell>
                <TableCell align="center">Місяць</TableCell>
                <TableCell align="center">Склад</TableCell>
                <TableCell align="center">Об'єм</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {volumeWhOut.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.Рік}
                  </TableCell>
                  <TableCell align="center">{row.Місяць}</TableCell>
                  <TableCell align="center">{row.Склад}</TableCell>
                  <TableCell align="center">{row['Об\'єм']}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    }
  </>
}