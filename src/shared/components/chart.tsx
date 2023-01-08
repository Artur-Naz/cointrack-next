import React, { useState } from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

// import CustomActiveShape from "./CustomActiveShape"
import { Box, Typography } from "@mui/material"
import CustomTooltip from "./chartDetales/CustomTooltip"
import CustomizedDot from "./chartDetales/CustomizedDot"
import moment from "moment"
import { timeLine } from "./chartDetales/timeLine";



interface iChartSectionProps {
    data: any[],
    selectedTime: string
}

export type ChartDataType = {
    name: string
    value: number
}


const Chart = ({ data, selectedTime }: iChartSectionProps): JSX.Element => {

    return (
        <Box 
            sx={{
                width:"100%",
                height:"100%",
                flex:"1 1 auto",
                alignItems:"center",
                justifyContent:"center",
                marginBottom:"14.68px",
                position:"relative",
                marginRight:"25px"
            }}
        >
            <Typography textAlign={"center"} fontSize={"22px"} mb={"15px"}>All Portfolios</Typography>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data} margin={{ top: 20, left: 8 }}>
                    <CartesianGrid
                        horizontal={true}
                        vertical={false}
                        stroke={"#EBEDF4"}
                    />
                    <XAxis
                        dataKey="name"
                        tickFormatter={(tick) => {
                            return moment(tick).format(timeLine[selectedTime])
                        }}
                        padding={{ left: 5, right: 5 }}
                        tickLine={false}
                        height={50}
                        dy={18}
                        fontSize={"12.83px"}
                        stroke={"#FFFFFF"}
                        interval={"preserveStart"}

                    />

                    <YAxis
                        tickCount={5}
                        tickLine={false}
                        fontSize={"13px"}
                        stroke={"#FFFFFF"}
                        type={"number"}
                        domain={["dataMin", "auto"]}
                        interval={0}
                        tickFormatter={(e) => `$${e}`}
                    />


                    <Tooltip
                        content={(props: any) => <CustomTooltip {...props} />}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        fill="#8884d8"
                        dot={false}
                        activeDot={(props: any) => <CustomizedDot {...props} />} stroke={"#805AD5"}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default Chart