import {
    PortfolioMenuItemDetails,
    PortfolioMenuItemSummary,
} from "./portfolio-menu-item";
import {Stack} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import MuiAccordion, {AccordionProps} from "@mui/material/Accordion";
import MuiAccordionSummary, {AccordionSummaryProps} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import {memo, SyntheticEvent } from "react";
import {setSelectedPortfolio, toggle} from "../../slices/dashboardSlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {Dictionary} from "@reduxjs/toolkit";
import {PortfolioItemEntity} from "../../api/portfoliosApi";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion  elevation={1} square {...props} />
))(({theme}) => ({
     border: `1px solid ${theme.palette.divider}`,
    p: 5,
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

type  MemoizedAccordionProps = {
    portfolioId: string,
    item: PortfolioItemEntity[],
    expanded: boolean
}
const MemoizedAccordion: React.FC<MemoizedAccordionProps> = memo(({portfolioId, item, expanded}) => {
    const dispatch = useAppDispatch()
    const handleChange = (e:SyntheticEvent, id: string) => {
        e.preventDefault()
        dispatch(toggle(id))
        dispatch(setSelectedPortfolio(id))
    };
    return (<Accordion key={portfolioId} expanded={expanded}
                onChange={(e) => handleChange(e, portfolioId)}>

        <PortfolioMenuItemSummary
            key={portfolioId}
            id={portfolioId}
        />
        <AccordionDetails>
            <Stack spacing={.5}>

                {
                    item?.map((i) => (<PortfolioMenuItemDetails
                        key={i.id}
                        id={i.id}/>))
                }
            </Stack>

        </AccordionDetails>
    </Accordion>)
})

type  PortfolioAccordionProps = {
    portfolios: Dictionary<PortfolioItemEntity[]>
}
const PortfolioAccordion: React.FC<PortfolioAccordionProps> = ({ portfolios }) => {

    const expanded = useAppSelector(state => state.dashboard.dashboardMenu)
    const list = portfolios ? Object.entries(portfolios) : []
    return ( <Box sx={{
        overflowY: 'scroll',
        maxHeight: '400px',
    }}>
        {
            list.map(([portfolio, item]) => {
                return <MemoizedAccordion key={portfolio} portfolioId={portfolio} item={item!} expanded={expanded[portfolio]} ></MemoizedAccordion>;
            })
        }
    </Box>)
}

export default memo(PortfolioAccordion)
