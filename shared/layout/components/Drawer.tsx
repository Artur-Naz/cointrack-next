import React, {memo, useMemo} from "react";
import MuiDrawer from '@mui/material/Drawer';
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import Image from 'next/image'
import List from '@mui/material/List';
import {tokens, useMode} from "../../../config/theme";
import {Icon} from "@mui/material";
import Link from "next/link";
import CustomizedTreeView from "../../components/tree-view";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({theme}: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
const myLoader = ({src, width, quality}: any) => {
    return `https://armtoken.net/app/static/media/logo.8c095497.svg?w=${width}&q=${quality || 75}`
}
function DR({open, handleDrawerClose}: any) {
    let theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const MenuList = useMemo(() => <List>
        {['Dashboard', 'Home', 'Pricing', 'Futures', 'Settings'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        {index % 2 === 0 ? <HomeIcon/> : <HomeIcon/>}
                    </ListItemIcon>
                    <Link href={'/' + text.toLowerCase()}>{text}</Link>
                    {/*<ListItemText primary={text} />*/}
                </ListItemButton>
            </ListItem>
        ))}
    </List>, [])

    return <Drawer

        variant="permanent"
        anchor="left"
        open={open}
    >
        <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon/>
            </IconButton>
            {open && <Image width={170} height={60} src={'https://armtoken.net/app/static/media/logo.8c095497.svg'}
                            alt={'logo'}/>}

        </DrawerHeader>
        {/*<Divider/>*/}
        {MenuList}
        {/*<Divider/>*/}
        {/*<List>*/}
        {/*    {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
        {/*        <ListItem key={text} disablePadding>*/}
        {/*            <ListItemButton>*/}
        {/*                <ListItemIcon>*/}
        {/*                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
        {/*                </ListItemIcon>*/}
        {/*                <ListItemText primary={text}/>*/}
        {/*            </ListItemButton>*/}
        {/*        </ListItem>*/}
        {/*    ))}*/}
        {/*</List>*/}
        {useMemo(() => <CustomizedTreeView></CustomizedTreeView>,[])}
    </Drawer>
}
export default memo(DR, (p,n) => {

    return p.open === n.open;
})
