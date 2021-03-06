import {useAuth} from '@/lib/auth';
import {isMod} from '@/lib/authorization';
import {formatRoleAuth} from '@/utils/format';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BugReportIcon from '@material-ui/icons/BugReport';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Logout from '@mui/icons-material/Logout';
import {ListItemButton, ListItemText, useMediaQuery} from '@mui/material';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {useEffect} from 'react';
import {NavLink} from 'react-router-dom';

function Copyright(props: any) {
    return (
        <>
            <br/>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <NavLink color="inherit" to="https://gimenez.dev/">
                    KiwiBug Issue Tracker (beta)
                </NavLink>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </>
    );
}

const drawerWidth: number = 260;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBarTop = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    })
);

const mdTheme = createTheme();

type MainLayoutProps = {
    children: React.ReactNode;
    title: string;
};

const Logo = styled('div')({
    position: 'relative',
    clear: 'both',
    fontSize: '32px',
    paddingLeftt: '-30px',
    fontWeight: 'bold',
});

export const MainLayout = ({children}: MainLayoutProps) => {
    const matches = useMediaQuery('(min-width:767px)');
    const [open, setOpen] = React.useState(matches);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openUser = Boolean(anchorEl);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const {user, logout} = useAuth();
    const role = formatRoleAuth(user?.authorities);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        setSelectedIndex(index);
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        setOpen(matches);
    }, [matches]);

    let userLetter = user?.name.charAt(0);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBarTop position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                            Issue Tracker v0.1
                        </Typography>
                        <React.Fragment>
                            <Tooltip title="User Settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ml: 2}}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{width: 32, height: 32}}>{userLetter}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={openUser}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            >
                                <MenuItem component={NavLink} to={'/profile'}>
                                    <Avatar/> My Profile
                                </MenuItem>
                                <Divider/>
                                {/* <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem> */}
                                <MenuItem
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    <ListItemIcon>
                                        <Logout fontSize="small"/>
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    </Toolbar>
                </AppBarTop>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        onClick={toggleDrawer}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            px: [1],
                            backgroundColor: '#1c1c1c',
                            color: '#ffffff',
                        }}
                    >
                        <Logo>KiwiBug</Logo>
                    </Toolbar>
                    <Divider/>
                    <List>
                        <ListItemButton
                            selected={selectedIndex === 0}
                            component={NavLink}
                            to={'/'}
                            key="Dashboard"
                            onClick={(event: any) => handleListItemClick(event, 0)}
                        >
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            component={NavLink}
                            to={'/projects'}
                            key="Projects"
                            onClick={(event: any) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon>
                                <AccountTreeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Projects"/>
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            component={NavLink}
                            to={'/issues'}
                            key="Issues"
                            onClick={(event: any) => handleListItemClick(event, 2)}
                        >
                            <ListItemIcon>
                                <BugReportIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Issues"/>
                        </ListItemButton>
                        {isMod(role) ? (
                            <ListItemButton
                                selected={selectedIndex === 3}
                                component={NavLink}
                                to={'/users'}
                                key="Users"
                                onClick={(event: any) => handleListItemClick(event, 3)}
                            >
                                <ListItemIcon>
                                    <PeopleIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Users"/>
                            </ListItemButton>
                        ) : (
                            ''
                        )}
                    </List>
                    <Divider/>
                    <List>
                        <ListItemButton>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Issues Reports"/>
                        </ListItemButton>
                        <ListItemButton
                            component={NavLink}
                            to={'/reports/summarybyproject'}
                            selected={selectedIndex === 4}
                            onClick={(event: any) => handleListItemClick(event, 4)}
                        >
                            <ListItemIcon>
                                <ArrowRightIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText secondary="Summary by Project"/>
                        </ListItemButton>
                        {/* {isMod(role) ? (
              <ListItemButton
                component={NavLink}
                to={'/reports/assignissues'}
                selected={selectedIndex === 5}
                onClick={(event: any) => handleListItemClick(event, 5)}
              >
                <ListItemIcon>
                  <ArrowRightIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText secondary="Assign Open Issues" />
              </ListItemButton>
            ) : (
              ''
            )} */}
                        <ListItemButton
                            component={NavLink}
                            to={'/reports/targetdates'}
                            selected={selectedIndex === 5}
                            onClick={(event: any) => handleListItemClick(event, 5)}
                        >
                            <ListItemIcon>
                                <ArrowRightIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText secondary="Target Resolution Dates"/>
                        </ListItemButton>
                        <ListItemButton
                            component={NavLink}
                            to={'/reports/resolvedbymonth'}
                            selected={selectedIndex === 6}
                        >
                            <ListItemIcon>
                                <ArrowRightIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText secondary="Average Days To Resolve"/>
                        </ListItemButton>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth={false} sx={{mt: 6, mb: 4}}>
                        {children}
                        <Copyright sx={{pt: 4}}/>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
