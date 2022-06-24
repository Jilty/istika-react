import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import TransformIcon from '@material-ui/icons/Transform';
import BugReportIcon from '@material-ui/icons/BugReport';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import WidgetsIcon from '@material-ui/icons/Widgets';
import GitHubIcon from '@material-ui/icons/GitHub';
import CloudCircleIcon from '@material-ui/icons/CloudCircle';
import './menu.scss'
import { useLocation } from 'react-router-dom';

// import { useHistory } from 'react-router-dom';
export const MainListItems = () => {
  const location = useLocation();
  return (
    <div>
      <a href="/dashboard">
        <ListItem button className={location.pathname === '/dashboard' ? 'menu-active' : null}>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary="Project Center" />
        </ListItem>
      </a>
      <a href="/templates" >
        <ListItem button className={location.pathname === '/templates' ? 'menu-active' : null}>
          <ListItemIcon>
            <TransformIcon />
          </ListItemIcon>
          <ListItemText primary="Project Templates" />
        </ListItem>
      </a>

    </div>
  )

}



export const SecondaryListItems = () => {
  const location = useLocation();
  return (
    <div>
      {/* <ListSubheader inset className="sub-header">Access Management</ListSubheader> */}
      <a href="/settings">
        <ListItem button className={location.pathname === '/settings' ? 'menu-active' : null}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Configurations(CaaS)" />
        </ListItem>
      </a>


    </div>
  )
};