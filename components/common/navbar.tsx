import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router'

export default function FixedBottomNavigation() {
  
  const router = useRouter()
  const [value, setValue] = React.useState(router.pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0,width:'100vw' }} elevation={6}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="/home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Notification"
            value="/notification"
            icon={<NotificationsNoneIcon />}
          />
          <BottomNavigationAction
            label="History"
            value="/history"
            icon={<HistoryIcon />}
          />
          <BottomNavigationAction
            label="Account"
            value="/user-info"
            icon={<AccountCircleIcon />}
          />
        </BottomNavigation>
      </Paper>
    </React.Fragment>
  );
}
