import * as React from 'react';
import {styled} from '@mui/material/styles';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import PortfolioMenuItem from "./portfolio-menu-item";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import {useMemo} from "react";
import {portfolioItemSelectors, portfolioSelectors, useGetUserPortfolioQuery} from "../../api/portfoliosApi";
import {useSession} from "next-auth/react";
import {useAppSelector} from "../../../../store/hooks";
import {selectAuthState} from "../../../../store/slices/authSlice";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
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
))(({theme}) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    p: 0,
    display: 'flex',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        // marginLeft: theme.spacing(1),
    },

}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    padding: theme.spacing(.6),
    backgroundColor: '#121416',
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    '& .MuiCollapse-entered': {
        backgroundColor: 'inherit',
    },
}));

export default function CustomizedAccordions() {
    const isAuth = useAppSelector(selectAuthState)
    const {portfolios, isLoading, isFetching, error} = useGetUserPortfolioQuery(undefined, {
        pollingInterval: 5 * 60000,
        refetchOnMountOrArgChange: false,
        skip: !isAuth,
        selectFromResult: ({data, error, isLoading, isFetching}) => {
            return {
                portfolios: data ? portfolioSelectors.selectAll(data.assets) : [],
                portfolioItems: data ? portfolioItemSelectors.selectAll(data.assetItems) : [],
                error,
                isLoading,
                isFetching
            }
        },
    })
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>(portfolios.reduce<Record<string, boolean>>((acc, ex) => {
        acc[ex.id] = true
        return acc;
    }, {}));


    if (isLoading) return (<Box>Skeleton</Box>)

    if (error) return (<Box> {JSON.stringify(error)} </Box>)

   // if (isFetching) return (<Box>Loading...</Box>)





    const handleChange = (id: string) => {
        setExpanded((s) => ({...s, [id]: !s[id]}));
    };

    // return <>{
    //     portfolios.map((p) => (<Box key={p.id}>-------------------</Box>))
    // }</>
    return (
        <Box sx={{
            overflowY: 'auto',
            maxHeight: '600px'
        }}>
            {
                portfolios?.map((portfolio: any) => {
                    return (<Accordion key={portfolio.id} expanded={expanded[portfolio.id]}
                                       onChange={() => handleChange(portfolio.id)}>
                        <AccordionSummary >
                            <PortfolioMenuItem
                                key={portfolio.id}
                                id={portfolio.id}
                                icon={portfolio.exchange?.image || portfolio.wallet?.image}
                                />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={.5}>

                                {portfolio.itemIds?.map((item: string) => ( <PortfolioMenuItem
                                    key={item}
                                    id={item}
                                    icon={portfolio.exchange?.image || portfolio.wallet?.image}/>))}
                            </Stack>

                        </AccordionDetails>
                    </Accordion>);
                })
            }
        </Box>
    );
}
