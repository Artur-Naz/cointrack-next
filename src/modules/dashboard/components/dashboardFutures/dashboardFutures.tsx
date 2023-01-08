import { Box, Typography } from "@mui/material"
import Image from "next/image"
import closeIcon from "../../assets/close-icon.svg"
import DashboardFuturesSmallBlok from "./dashboardFuturesSmallBlok"
import DashboardBloksHeader from "../../../../shared/components/dashboardBloksHeader";

const DashboardFutures = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '10px',
                background: '#212734',
                maxWidth: "405px",
                width: "100%",
                height: "348px"


            }}
        >
            <DashboardBloksHeader blokTitle={"Futures"} />
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#354052",
                    borderRadius: " 5px",

                }}
            >
                <Box>

                    <Typography>ETHBUSD Perpetual</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                    }}
                >
                    <Typography>
                        Leverage 50
                    </Typography>
                    <Box>
                        <Image src={closeIcon} alt={"closeIcon"} />
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",

                    }}
                >
                    <Typography sx={{ textDecoration: 'underline' }}>Unrealized PNL (BUSD)</Typography>
                    <Typography>ROE</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",

                    }}
                >
                    <Typography>6.50</Typography>
                    <Typography>+0.92%</Typography>
                </Box>
            </Box>
            <Box 
               sx={{
                width: "100%",
                display: "flex",
                flexDirection:"column",
                gap:"15px"
            }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <DashboardFuturesSmallBlok title="Size(ETH)" number="6.526" />
                    <DashboardFuturesSmallBlok title="Size(ETH)" number="6.526" />
                    <DashboardFuturesSmallBlok title="Size(ETH)" number="6.526" />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <DashboardFuturesSmallBlok title="Size(ETH)" number="6.526" />
                    <DashboardFuturesSmallBlok title="Size(ETH)" number="6.526" />
                    <DashboardFuturesSmallBlok title="Size(ETH)" number="6.526" />
                </Box>
            </Box>

        </Box>
    )
}

export default DashboardFutures
