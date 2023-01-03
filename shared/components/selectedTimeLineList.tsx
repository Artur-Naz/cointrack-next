import React, { useState } from "react";
import { Box, Typography } from "@mui/material"


const PagintionItems = [
    {
        value: "1h"
    },
    {
        value: "24h"
    }
    ,
    {
        value: "1m"
    },
    {
        value: "3m"
    },
    {
        value: "6m"
    }
    ,
    {
        value: "1y"
    },
    {
        value: "All"
    }
]

interface ISelectedTimeLineList{
    blockStyle?:any,
    ItemStyle?:any
}

const SelectedTimeLineList = ({blockStyle,ItemStyle}:ISelectedTimeLineList) => {
    const [selectedItem, setSelectedItem] = useState<number>(0)

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                ...blockStyle
            }}

        >
            {
                PagintionItems.map((item, index) => {
                    const isActive = index === selectedItem
                    return (
                        <Box
                            key={index}
                            sx={{
                                fontWeight: 400,
                                fontSize: "13.8775px",
                                lineHeight: "148%",
                                color: "#FFFFFF",
                                p: "2px",
                                background: isActive ? "#1A202C" : "unset",
                                border: isActive ? "0.925167px solid #A3A0A0" : "0.925167px solid transparent",
                                borderRadius: "1.85033px",
                                cursor: "pointer",
                                '&:hover': {
                                    padding: "2px",
                                    background: "#1A202C",
                                    border: "0.925167px solid #A3A0A0",
                                    borderRadius: "1.85033px"
                                },
                                ...ItemStyle
                            }}
                            onClick={() => { setSelectedItem(index) }}
                        >
                            {item.value}

                        </Box>
                    )
                })
            }
        </Box>
    )
}
export default SelectedTimeLineList
