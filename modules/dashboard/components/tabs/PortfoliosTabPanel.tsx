import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface PortfoliosTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const PortfoliosTabPanel: React.FC<PortfoliosTabPanelProps> = (props) => {
    const {children, value, index, ...other} = props;
    if(value !== index) return null
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </Box>
    );
}
