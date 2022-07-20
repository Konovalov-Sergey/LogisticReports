import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HeaderContainer from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux/redux-store';
import { LinePickPage } from './components/Lines/Pick/LinePickPage';
import ReportInMonth from './components/report_in/ReportInMonth';
import ReportOutMonth from './components/report_out/ReportOutMonth';
import ReportOutOnOffMonth from './components/report_out/ReportOutOnOffMonth';
import ReportInOnOffMonth from './components/report_in/ReportInOnOffMonth';
import ReportInDay from './components/report_in/ReportInDay';
import ReportOutDay from './components/report_out/ReportOutDay';
import ReportInOnOffDay from './components/report_in/ReportInOnOffDay';
import ReportOutOnOffDay from './components/report_out/ReportOutOnOffDay';
import PickedLinesPbl from './components/Lines/PBL/PickedLinesPbl';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App: React.FC = () => {
  return (
    <HashRouter basename={process.env.REACT_APP_BASE_URL}>
      <Provider store={store} >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Item>
                <HeaderContainer />
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item>
                <Sidebar />
              </Item>
            </Grid>
            <Grid item xs={10}>
              <Item>
                <Routes>
                  <Route /*exact*/ path='/PickedLines/PBL'
                    element={<PickedLinesPbl />} />
                  <Route /*exact*/ path='/Lines/Pick'
                    element={<LinePickPage />} />
                  <Route /*exact*/ path='/ReportIn/ReportInMonth'
                    element={<ReportInMonth />} />
                  <Route /*exact*/ path='/ReportIn/ReportInDay'
                    element={<ReportInDay />} />
                  <Route /*exact*/ path='/ReportIn/ReportInOnOffMonth'
                    element={<ReportInOnOffMonth />} />
                  <Route /*exact*/ path='/ReportIn/ReportInOnOffDay'
                    element={<ReportInOnOffDay />} />
                  <Route /*exact*/ path='/ReportOut/ReportOutMonth'
                    element={<ReportOutMonth />} />
                  <Route /*exact*/ path='/ReportOut/ReportOutDay'
                    element={<ReportOutDay />} />
                  <Route /*exact*/ path='/ReportOut/ReportOutOnOffMonth'
                    element={<ReportOutOnOffMonth />} />
                  <Route /*exact*/ path='/ReportOut/ReportOutOnOffDay'
                    element={<ReportOutOnOffDay />} />
                  <Route /*exact*/ path='/'
                    element={< ReportInDay/>} />
                </Routes>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Provider>
    </HashRouter>

  );
}

export default App;