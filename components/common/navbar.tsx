import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router'

export default function FixedBottomNavigation() {
  const ref = React.useRef<HTMLDivElement>(null);
  const router = useRouter()
  const [value, setValue] = React.useState(router.pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0 }} elevation={3} className='w-screen'>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="/home"
            icon={<HomeIcon />}
            href="/home"
          />
          <BottomNavigationAction
            label="Notification"
            value="/notification"
            icon={<NotificationsNoneIcon />}
            href="/notification"
          />
          <BottomNavigationAction
            label="History"
            value="/history"
            icon={<HistoryIcon />}
            href="/history"
          />
          <BottomNavigationAction
            label="Account"
            value="/userinfo"
            icon={<AccountCircleIcon />}
            href="/userinfo" />
        </BottomNavigation>
      </Paper>
    </React.Fragment>
  );
}
