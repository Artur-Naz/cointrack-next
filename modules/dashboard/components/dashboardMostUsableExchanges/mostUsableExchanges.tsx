import { Box, Typography } from "@mui/material"
import DashboardBloksHeader from "../shared/dashboardBloksHeader"
import ChartSection from "./ChartSection"

const MostUsableExchanges = () => {

    const chartData =  [
        {name: "Gate.io", percent: "25%"},
        {name: "Coinbase", percent: "76%"},
        {name: "Binance", percent: "39%"},
        {name: "Huobi", percent: "52%"},
    ]
    return (
        <Box
            sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '10px',
                background: '#212734',
                maxWidth: "405px",
                width: "100%",
                height:"348px"
                

            }}
        >
            <DashboardBloksHeader blokTitle={"Total Points"} />
            <Typography>Most usable exchanges</Typography>
            <ChartSection data = {chartData}/>
            
        </Box>
    )
}
export default MostUsableExchanges