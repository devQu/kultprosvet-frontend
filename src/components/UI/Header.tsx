/* eslint-disable react-refresh/only-export-components */
import Logo from './Logo'

import { logoutUserAndRemoveUserInfoFromLocalStorage } from '../../store/actions/authActions'
import { connect, Matching } from 'react-redux'
import { ComponentType, useEffect } from 'react'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {  useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

const drawerWidth = 240

type PropTypes = {
    isAuth: boolean | undefined,
    userEmail: string | undefined,
    logoutUserAndRemoveUserInfoFromLocalStorage: () => void,
    window?: () => Window
}

const Header: ComponentType<Matching<{ logoutUserAndRemoveUserInfoFromLocalStorage: () => void }, PropTypes>> 
    
    = ({ isAuth, userEmail, logoutUserAndRemoveUserInfoFromLocalStorage, window }) => {

    const [mobileOpen, setMobileOpen] = React.useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        console.log('############ Header ############ handleLogout !')
        logoutUserAndRemoveUserInfoFromLocalStorage()
    }

    useEffect(() => {
        console.log(location.pathname)
    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ background: '#fff' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Tooltip title="На главную">
                            <IconButton sx={{ p: 0 }} onClick={() => navigate('/')}>
                                <Logo />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    {location.pathname === '/admin' && <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1, color: '#1976d2', display: { xs: 'none', sm: 'block' } }}>
                        Админ панель
                    </Typography> }
                    <Typography variant="body1" gutterBottom component="span" sx={{ marginRight: 5 }} >
                        {userEmail}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {isAuth ?
                            <>
                                <Button key='admin' sx={{ marginRight: 2 }} variant="outlined" size="medium" onClick={() => navigate('/admin')}>
                                    Админка
                                </Button>
                                <Button key='logout' sx={{ marginRight: 2 }} variant="outlined" size="medium" color='warning' onClick={handleLogout}>
                                    Выйти
                                </Button>
                            </> : 
                            <>
                                <Button key='admin' sx={{ marginRight: 2 }} variant="outlined" size="medium" onClick={() => navigate('/auth')}>
                                    Войти
                                </Button>
                                <Button key='logout' sx={{ marginRight: 2 }} variant="outlined" size="medium" color='warning' onClick={() => navigate('/registration')}>
                                    Регистрация
                                </Button>
                            </>
                        }
                    </Box>
                </Toolbar>
            </AppBar>

            {/* mobile block */}

            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ my: 2 }}>
                            Культпросвет
                        </Typography>
                        <Divider />
                        <List>
                            <ListItem key='home' disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/')} >
                                    <ListItemText primary='На главную' />
                                </ListItemButton>
                            </ListItem>
                            {isAuth ? 
                                <>
                                    <ListItem key='admin-m' disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/admin')} >
                                            <ListItemText primary='Админка' />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem key='logout-m' disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
                                            <ListItemText primary='Выйти' />
                                        </ListItemButton>
                                    </ListItem>
                                </> :
                                <>
                                    <ListItem key='auth-m' disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/auth')} >
                                            <ListItemText primary='Войти' />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem key='registration-m' disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/registration')}>
                                            <ListItemText primary='Регистрация' />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            }
                        </List>
                    </Box>
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

const mapDispatchToProps =  {
    logoutUserAndRemoveUserInfoFromLocalStorage: () => logoutUserAndRemoveUserInfoFromLocalStorage(),
}

export default connect(null, mapDispatchToProps)(Header)

