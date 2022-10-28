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
  console.log('current path', router.pathname)
  const [value, setValue] = React.useState(router.pathname);
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
          label="Home" 
          value="/home"
          icon={<HomeIcon />} 
          href = "/home"
          />
          <BottomNavigationAction
          label="Notification"
          value="/"
          icon={<NotificationsNoneIcon />} 
          href = "/"
          />
          <BottomNavigationAction 
          label="History"
          value="/history"
          icon={<HistoryIcon />} 
          href = "/history"
          />
          <BottomNavigationAction 
          label="Account" 
          value="/account"
          icon={<AccountCircleIcon />} 
          href = "/account"/>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
