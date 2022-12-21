import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import PortfolioMenuItem from "./portfolio-menu-item";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import {SyntheticEvent, useCallback, useMemo} from "react";
import {useGetUserPortfolioQuery} from "../../api/portfolios";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
   // border: `1px solid ${theme.palette.divider}`,
 //   backgroundColor: 'red',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '& .Mui-expanded': {
       backgroundColor: '#121416',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
       expandIcon={null}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    p:0,
    display:'flex',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
       // marginLeft: theme.spacing(1),
    },

}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(.6),
    backgroundColor: '#121416',
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    '& .MuiCollapse-entered': {
        backgroundColor: 'inherit',
    },
}));

export default function CustomizedAccordions() {
    const {data:portfolios, error, isLoading} = useGetUserPortfolioQuery(1, {pollingInterval: 6000, refetchOnMountOrArgChange: false })


    const exchanges: any[] = useMemo(() => (portfolios?.exchanges || [])?.map((exchange: any) => exchange), [portfolios])
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>(exchanges.reduce<Record<string, boolean>>((acc, ex) => {
        acc[ex.id] = true
        return acc;
    }, {}));
    const handleChange = ( id: string) => {
            setExpanded((s) => ({...s, [id]:!s[id]}));
        };
    return (
        <Box sx={{
            overflowY:'auto',
            maxHeight:'600px'
        }} >
            {
               useMemo(() => exchanges?.map((exchange: any) => {
                        return ( <Accordion key={exchange.id} expanded={expanded[exchange.id]} onChange={() => handleChange(exchange.id)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <PortfolioMenuItem
                                    key={exchange.id}
                                    name={exchange.name}
                                    icon={exchange.exchange.image}
                                    sparkline={exchange.rates.usd}/>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack spacing={.5}>

                                    {exchange.items?.map((item: any) => ( <PortfolioMenuItem
                                        key={item.id}
                                        name={item.name}
                                        icon={exchange.exchange.image}
                                        sparkline={item.rates.usd}/>))}
                                </Stack>

                            </AccordionDetails>
                        </Accordion> );
                }),[exchanges])
            }
        </Box>
    );
}
