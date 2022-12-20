import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {memo} from "react";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectAuthState, setAuthState} from "../../store/slices/authSlice";

const pages = ['Dashboard', 'Home', 'index'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar(props:any) {
    const dispatch = useAppDispatch()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        console.log('')
        dispatch(setAuthState(false))
        setAnchorElUser(null);
    };


    const auth = useAppSelector(selectAuthState)
    return (
        <AppBar {...props} position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Cointrack
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem  onClick={handleCloseNavMenu}>
                                <Link href={'/dashboard'}><Typography textAlign="center">Dashboard</Typography></Link>
                            </MenuItem>
                            <MenuItem  onClick={handleCloseNavMenu}>
                                <Link href={'/home'}><Typography textAlign="center">Home</Typography></Link>
                            </MenuItem>
                            <MenuItem  onClick={handleCloseNavMenu}>
                                <Link href={'/'}><Typography textAlign="center">Main</Typography></Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuItem  onClick={handleCloseNavMenu}>
                            <Link href={'/dashboard'}><Typography textAlign="center">Dashboard</Typography></Link>
                        </MenuItem>
                        <MenuItem  onClick={handleCloseNavMenu}>
                            <Link href={'/home'}><Typography textAlign="center">Home</Typography></Link>
                        </MenuItem>
                        <MenuItem  onClick={handleCloseNavMenu}>
                            <Link href={'/'}><Typography textAlign="center">Main</Typography></Link>
                        </MenuItem>
                        {/*{pages.map((page) => (*/}
                        {/*    // <Button*/}
                        {/*    //     key={page}*/}
                        {/*    //     onClick={handleCloseNavMenu}*/}
                        {/*    //     sx={{ my: 2, color: 'white', display: 'block' }}*/}
                        {/*    // >*/}
                        {/*    //     {page}*/}
                        {/*    // </Button>*/}
                        {/*    <Link key={page} href={'/dashboard'}><Typography textAlign="center">{page}</Typography></Link>*/}

                        {/*))}*/}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem  onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}


export default memo(ResponsiveAppBar, (p,n) => false);
