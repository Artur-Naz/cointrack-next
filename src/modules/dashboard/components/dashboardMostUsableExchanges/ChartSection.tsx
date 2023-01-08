import React from "react"
import c from "./ChartSection.module.css"
import { Box, Typography } from "@mui/material"

// import { Center, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";

export type Chart3dDataType = {
    name: string
    percent: string
}

interface iChartSectionProps {
    data: Chart3dDataType[]
}

const ChartSection = ({ data }: iChartSectionProps): JSX.Element => {

    const CustomLabel = ({ name }: { name: string }): JSX.Element => {
        return (
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    maxWidth: "50px",
                    padding: "3px 15px",
                    bottom: "100px",
                    flexDirection: "column",
                    zIndex: "2",
                    bgcolor: "#9C75F3",
                    transform: "translateX(-25%)",
                    borderRadius: "5px",
                    display: 'none',
                }}
                className="label"
            >
                <Typography
                    sx={{
                        fontSize: "13px",
                        lineHeight: "19.5px",
                        textTransform: "capitalize",
                        width: "100%"
                    }}
                >
                    {name}</Typography>
            </Box>
        )
    }

    const textColor = "#686868"


    return (
       <Box 
        sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}

       >
         <Box className={c.container}>
            {data.map((item: Chart3dDataType, index: number) => {
                return (
                    <Box
                        key={item.name + index}
                        sx={{
                            width: "50px",
                            minHeight: "45px",
                            bgColor: "transparent",
                            placement: "bottom",
                            position: "relative",
                            "&:hover": {
                                "& .label": {
                                    display: 'block'
                                }
                            }
                        }}

                    >
                        <CustomLabel name={item.name} />
                        <Box
                            className={c.chartWrap}
                        >
                            <Box className={c.bar} style={{ height: item.percent }} />
                            <Box className={c.shadow} />
                            <Typography color={textColor} className={c.percent}>{item.percent}</Typography>
                            <Typography color={textColor} className={c.name}>{item.name.length > 9 ? item.name.slice(0, 7) + "..." : item.name}</Typography>
                        </Box>
                    </Box>
                )
            })}
        </Box>
       </Box>
    )
}

export default ChartSection
