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
import InventoryIcon from '@mui/icons-material/Inventory';
import OutboundIcon from '@mui/icons-material/Outbound';

export default function NestedList() {
    const [openLine, setOpenLine] = React.useState(false);
    const [openReportIn, setOpenReportIn] = React.useState(false);
    const [openReportOut, setOpenReportOut] = React.useState(false);
    const [openInventory, setOpenInventory] = React.useState(false);

    const handleClickLines = () => {
        setOpenLine(!openLine);
    };
   
    const handleClickrReportIn = () => {
        setOpenReportIn(!openReportIn);
    };
    const handleClickrReportOut = () => {
        setOpenReportOut(!openReportOut);
    };
    const handleClickInventory = () => {
        setOpenInventory(!openInventory);
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
                <ListItemText primary="Report in" sx={{color: 'black'}}/>
                {openReportIn ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

                <Collapse in={openReportIn} timeout="auto" unmountOnExit >
                    <NavLink to="/ReportIn/ReportInMonth" style={{ textDecoration: 'none', color: 'gray' }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 5 }}>
                                <ListItemText primary="По складах, помісячно" sx={{ fontSize: '0.8rem', lineHeight: '1' }}/>
                            </ListItemButton>
                        </List>
                    </NavLink>
                    <NavLink to="/ReportIn/ReportInDay" style={{ textDecoration: 'none', color: 'gray'  }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 5 }}>
                                <ListItemText primary="По складах, поденно" sx={{ fontSize: '0.8rem', lineHeight: '1' }}/>
                            </ListItemButton>
                        </List>
                    </NavLink>
                    <NavLink to="/ReportIn/ReportInOnOffMonth" style={{ textDecoration: 'none', color: 'gray'  }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 5 }}>
                                <ListItemText primary="По складах, помісячно (online, offline)" />
                            </ListItemButton>
                        </List>
                    </NavLink>
                    <NavLink to="/ReportIn/ReportInOnOffDay" style={{ textDecoration: 'none', color: 'gray' }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 5 }}>
                                <ListItemText primary="По складах, поденно (online, offline)" />
                            </ListItemButton>
                        </List>
                    </NavLink>
                    <NavLink to="/ReportIn/ReportInFlow" style={{ textDecoration: 'none', color: 'gray' }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 5 }}>
                                <ListItemText primary="По каналах забезпечення" />
                            </ListItemButton>
                        </List>
                    </NavLink>
                </Collapse>

            <ListItemButton onClick={handleClickrReportOut}>
                <ListItemIcon>
                    <OutboundIcon />
                </ListItemIcon>
                <ListItemText primary="Report out" sx={{color: 'black'}}/>
                {openReportOut ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

                <Collapse in={openReportOut} timeout="auto" unmountOnExit>
                    <NavLink to="/ReportOut/ReportOutMonth" style={{ textDecoration: 'none', color: 'gray'  }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 5 }}>
                                <ListItemText primary="По складах, помісячно" sx={{ fontSize: '0.8rem', lineHeight: '1' }}/>
                            </ListItemButton>
                        </List>
                    </NavLink>

                    <NavLink to="/ReportOut/ReportOutDay" style={{ textDecoration: 'none', color: 'gray'  }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 5 }}>
                                <ListItemText primary="По складах, поденно" sx={{ fontSize: '0.8rem', lineHeight: '1' }}/>
                            </ListItemButton>
                        </List>
                    </NavLink>
                    
                    <NavLink to="/ReportOut/ReportOutOnOffMonth" style={{ textDecoration: 'none', color: 'gray'  }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 5 }}>
                                <ListItemText primary="По складах, помісячно (online, offline)" />
                            </ListItemButton>
                        </List>
                    </NavLink>
                    <NavLink to="/ReportOut/ReportOutOnOffDay" style={{ textDecoration: 'none', color: 'gray'  }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 5 }}>
                                <ListItemText primary="По складах, поденно (online, offline)" />
                            </ListItemButton>
                        </List>
                    </NavLink>
                    <NavLink to="/ReportOut/ReportOutFlow" style={{ textDecoration: 'none', color: 'gray'  }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 5 }}>
                                <ListItemText primary="По каналах відвантаження" />
                            </ListItemButton>
                        </List>
                    </NavLink>
                </Collapse>

            <ListItemButton onClick={handleClickLines}>
                <ListItemIcon>
                    <CompareArrowsIcon />
                </ListItemIcon>
                <ListItemText primary="Lines" sx={{color: 'black'}}/>
                {openLine ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

                <Collapse in={openLine} timeout="auto" unmountOnExit >
                    <NavLink to="/PickedLines/PBL" style={{ textDecoration: 'none', color: 'gray'  }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Зібрано ліній BreakBulk поденно" />
                            </ListItemButton>
                        </List>
                    </NavLink>
                    <NavLink to="/UnpickedLinesDetailing/PBL" style={{ textDecoration: 'none', color: 'gray'  }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Не зібрано ліній BreakBulk деталізація" />
                            </ListItemButton>
                        </List>
                    </NavLink>

                    <NavLink to="/Lines/Picking" style={{ textDecoration: 'none', color: 'gray'  }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Аналітика ліній Picking"   />
                            </ListItemButton>
                        </List>
                    </NavLink>
                </Collapse>         

            <ListItemButton onClick={handleClickInventory}>
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" sx={{color: 'black'}} />
                {openInventory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

                <Collapse in={openInventory} timeout="auto" unmountOnExit >
                    <NavLink to="/inventory/get_inventory" style={{ textDecoration: 'none', color: 'gray' }}>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Залишки товару по відділам" />
                            </ListItemButton>
                        </List>
                    </NavLink>
                </Collapse>            
        </List>
    );
}