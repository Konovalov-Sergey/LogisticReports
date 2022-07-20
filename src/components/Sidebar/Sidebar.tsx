import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ImageIcon from '@mui/icons-material/Image';
import { NavLink } from 'react-router-dom';

export default function NestedList() {
    const [openLine, setOpenLine] = React.useState(false);
    const [openReportIn, setOpenReportIn] = React.useState(false);
    const [openReportOut, setOpenReportOut] = React.useState(false);

    const handleClickLines = () => {
        setOpenLine(!openLine);
    };
   
    const handleClickrReportIn = () => {
        setOpenReportIn(!openReportIn);
    };
    const handleClickrReportOut = () => {
        setOpenReportOut(!openReportOut);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
           
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Operations
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClickrReportIn}>
                <ListItemIcon>
                    <ImageIcon />
                </ListItemIcon>
                <ListItemText primary="Report in" />
                {openReportIn ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openReportIn} timeout="auto" unmountOnExit>
                <NavLink to="/ReportIn/ReportInMonth" style={{ textDecoration: 'none' }}>
                    <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 5 }}>
                            <ListItemText primary="По складах, помісячно" sx={{ fontSize: '0.8rem', lineHeight: '1' }}/>
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/ReportIn/ReportInDay" style={{ textDecoration: 'none' }}>
                    <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 5 }}>
                            <ListItemText primary="По складах, поденно" sx={{ fontSize: '0.8rem', lineHeight: '1' }}/>
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/ReportIn/ReportInOnOffMonth" style={{ textDecoration: 'none' }}>
                    <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 5 }}>
                            <ListItemText primary="По складах, помісячно (online, offline)" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/ReportIn/ReportInOnOffDay" style={{ textDecoration: 'none' }}>
                    <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 5 }}>
                            <ListItemText primary="По складах, поденно (online, offline)" />
                        </ListItemButton>
                    </List>
                </NavLink>
            </Collapse>

            <ListItemButton onClick={handleClickrReportOut}>
                <ListItemIcon>
                    <ImageIcon />
                </ListItemIcon>
                <ListItemText primary="Report out" />
                {openReportOut ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openReportOut} timeout="auto" unmountOnExit>
                <NavLink to="/ReportOut/ReportOutMonth" style={{ textDecoration: 'none' }}>
                    <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 5 }}>
                            <ListItemText primary="По складах, помісячно" sx={{ fontSize: '0.8rem', lineHeight: '1' }}/>
                        </ListItemButton>
                    </List>
                </NavLink>

                <NavLink to="/ReportOut/ReportOutDay" style={{ textDecoration: 'none' }}>
                    <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 5 }}>
                            <ListItemText primary="По складах, поденно" sx={{ fontSize: '0.8rem', lineHeight: '1' }}/>
                        </ListItemButton>
                    </List>
                </NavLink>
                
                <NavLink to="/ReportOut/ReportOutOnOffMonth" style={{ textDecoration: 'none' }}>
                    <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 5 }}>
                            <ListItemText primary="По складах, помісячно (online, offline)" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/ReportOut/ReportOutOnOffDay" style={{ textDecoration: 'none' }}>
                    <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 5 }}>
                            <ListItemText primary="По складах, поденно (online, offline)" />
                        </ListItemButton>
                    </List>
                </NavLink>
            </Collapse>

            <ListItemButton onClick={handleClickLines}>
                <ListItemIcon>
                    <CompareArrowsIcon />
                </ListItemIcon>
                <ListItemText primary="Lines" />
                {openLine ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openLine} timeout="auto" unmountOnExit >
                <NavLink to="/PickedLines/PBL" style={{ textDecoration: 'none' }}>
                    <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Зібрано ліній BreakBulk поденно" />
                        </ListItemButton>
                    </List>
                </NavLink>

                <NavLink to="/Lines/Pick" style={{ textDecoration: 'none' }}>
                    <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Аналітика зібраних ліній Picking"   />
                        </ListItemButton>
                    </List>
                </NavLink>
            </Collapse>            
        </List>
    );
}