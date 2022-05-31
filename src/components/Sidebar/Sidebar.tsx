import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ImageIcon from '@mui/icons-material/Image';
import { NavLink } from 'react-router-dom';

export default function NestedList() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
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

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <CompareArrowsIcon />
                </ListItemIcon>
                <ListItemText primary="Lines" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <NavLink to="/Lines/PBL">
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="PBL" />
                        </ListItemButton>
                    </List>
                </NavLink>

                <NavLink to="/Lines/Pick">
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Pick" />
                        </ListItemButton>
                    </List>
                </NavLink>
            </Collapse>

            <ListItemButton>
                <ListItemIcon>
                    <ImageIcon />
                </ListItemIcon>
                <ListItemText primary="Volume" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
            </ListItemButton>


        </List>
    );
}