import * as React from 'react';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {alpha, styled} from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, {TreeItemProps, treeItemClasses} from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
// web.cjs is required for IE11 support
import {useSpring, animated} from 'react-spring';
import {TransitionProps} from '@mui/material/transitions';
import {Paper, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Image } from 'mui-image'
import PortfolioMenuItem from "../../modules/dashboard/components/portfolio-menu/portfolio-menu-item";
function MinusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{width: 14, height: 14}} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path
                d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z"/>
        </SvgIcon>
    );
}

function PlusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{width: 14, height: 14}} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path
                d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z"/>
        </SvgIcon>
    );
}

function CloseSquare(props: SvgIconProps) {
    return (
        <SvgIcon
            className="close"
            fontSize="inherit"
            style={{width: 14, height: 14}}
            {...props}
        >
            {/* tslint:disable-next-line: max-line-length */}
            <path
                d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z"/>
        </SvgIcon>
    );
}

function TransitionComponent(props: TransitionProps) {
    const style = useSpring({
        from: {
            opacity: 0,
            transform: 'translate3d(20px,0,0)',
        },
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

const StyledTreeItem = styled((props: TreeItemProps) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent}/>
))(({theme}) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: -1,
        paddingLeft: 6,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

export default function CustomizedTreeView({portfolios}: any) {
    //portfolios.exchanges?.map((exchange: any) => exchange.items?.map((item: any) => ()))
    return (
        <TreeView
            aria-label="customized"
            defaultExpanded={['1']}
            defaultCollapseIcon={<MinusSquare/>}
            defaultExpandIcon={<PlusSquare/>}
            defaultEndIcon={<CloseSquare/>}
            sx={{maxHeight: '100%', flexGrow: 1, width: '100%', overflowY: 'auto'}}
        >
            <StyledTreeItem nodeId="4" label="My Binance">
                <Stack spacing={.5}>
                    {
                        portfolios && portfolios.exchanges?.map((exchange: any) => exchange.items?.map((item: any) => (<PortfolioMenuItem
                            key={item.id}
                            name={item.name}
                            icon={exchange.exchange.image}
                            sparkline={item.rates.usd}/>)))
                    }
                    {/*<PortfolioMenuItem name={'Binance'}></PortfolioMenuItem>*/}

                    {/*<PortfolioMenuItem name={'Binance Smart Chain'}></PortfolioMenuItem>*/}
                    {/*<PortfolioMenuItem name={'Metamask'}></PortfolioMenuItem>*/}
                    {/*<PortfolioMenuItem name={'Kraken'}></PortfolioMenuItem>*/}
                </Stack>
                {/*<TreeItem nodeId="6" label="Binance Spot">hello</TreeItem>*/}
                {/*<TreeItem nodeId="7" label="Binance Savings"/>*/}
                {/*<TreeItem nodeId="8" label="Binance Margin"/>*/}
            </StyledTreeItem>
            <TreeItem nodeId="2" label="Exchanges">
                <StyledTreeItem nodeId="4" label="My Binance">
                    <Stack spacing={1}>

                        <Paper><Button>hello</Button></Paper>
                        <Paper><Button>hello</Button></Paper>
                        <Paper><Button>hello</Button></Paper>
                    </Stack>
                    {/*<TreeItem nodeId="6" label="Binance Spot">hello</TreeItem>*/}
                    {/*<TreeItem nodeId="7" label="Binance Savings"/>*/}
                    {/*<TreeItem nodeId="8" label="Binance Margin"/>*/}
                </StyledTreeItem>
            </TreeItem>
            <StyledTreeItem nodeId="3" label="Wallets">
                <StyledTreeItem nodeId="5" label="Metamask">
                    <StyledTreeItem nodeId="9" label="BSC"/>
                    <StyledTreeItem nodeId="10" label="Fantom"/>
                    <StyledTreeItem nodeId="11" label="Ethereum"/>
                </StyledTreeItem>
            </StyledTreeItem>
        </TreeView>
    );
}
