import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HeaderContainer from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LinesPBL } from './components/Lines/LinesPBL';
import { LinesPick } from './components/Lines/LinesPick';
import { Provider } from 'react-redux';
import store from './Redux/redux-store';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store} >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item>
                <HeaderContainer />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <Sidebar />
              </Item>
            </Grid>
            <Grid item xs={9}>
              <Item>
                <Routes>
                  <Route /*exact*/ path='/Lines/PBL'
                    element={<LinesPBL />} />
                  <Route /*exact*/ path='/Lines/Pick'
                    element={<LinesPick />} />
                </Routes>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Provider>
    </Router>

  );
}

export default App;