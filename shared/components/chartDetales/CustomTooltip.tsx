import React from "react"
import { Box, Typography } from "@mui/material"
import moment from "moment"

interface iCustomTooltipProps {
    active: boolean
    payload: any
    [key: string]: any
}

const CustomTooltip: React.FC<iCustomTooltipProps> = ({active, payload}) => {
    if (!active  || !payload?.length) return null

    const price = payload[0].value
    const time = moment(payload[0].payload.date).format('LTS')
    const date = moment(payload[0].payload.date).format('L')

    return (
        <Box
            sx={{
                backgroundColor:"#FFF",
                boxShadow:"0 0 10px 0 rgba(0,0,0, .4)",
                padding:"12px 16px",
                borderRadius:"5px"
            }}
        >
            <Box
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    gap:"56px"
                }}
            >
                <Typography color={"#3A3A3A"} fontSize={"14px"}>{date}</Typography>
                <Typography color={"#3A3A3A"} fontSize={"14px"}>{time}</Typography>
            </Box>
            <Box
                sx={{
                    display:"flex",
                    alignItems:"center",
                    gap:"5px",
                    marginTop:"12px"
                }}
            >
                <Box
                    sx={{
                        borderRadius:"50%",
                        width:"15px",
                        backgroundColor:"#805AD5"
                    }}>

                </Box>
                <Typography color={"#31394D"} fontSize={"14px"}  lineHeight={"21px"} fontWeight={"500"}>
                    {/* Total $<NumberFormatStyle interval={{min: 3, max: 6}} num={price} /> */}
                </Typography>
            </Box>
        </Box>
    )
}

export default CustomTooltip
