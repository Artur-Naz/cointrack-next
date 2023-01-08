import { Box, Typography } from "@mui/material"
import DashboardCoinsBlock from "../dashboardCoins/dashboardCoinsBlock"
import refreshICon from "../../assets/refresh-icon.svg"
import Image from "next/image"
import DashboardUserInfoChart from "./dashboardUserInfoChart"
import SelectedTimeLineList from "../../../../shared/components/selectedTimeLineList"


const DashboardUserInfo = () => {
    return (
        <Box
            sx={{
                position: "relative",
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
            <Box
                sx={{
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "center"
                }}
            >
                <Box>
                    <DashboardCoinsBlock styles={{
                        maxWidth: "119px",
                        width: "77px",
                        height: "77px",
                        positions: "absalute",
                        borderRadius: "38.7132px",
                        marginRight: "21px"
                    }
                    }>
                        <Typography
                            sx={{
                                fontweight: 500,
                                fontSize: "30.8909px",
                                lineHeight: "25px",
                                color: "#FFFFFF"

                            }}
                        >
                            D
                        </Typography>
                    </DashboardCoinsBlock>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItem: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px"
                        }}
                    >
                        <Image src={refreshICon} alt="refresh-icon" />
                        <Typography
                            sx={{
                                fontweight: 300,
                                fontSize: "24.8909px",
                                lineHeight: "148%",
                                color: "#805AD5",
                            }}
                        >
                            $ 855,914.000
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontweight: 400,
                            fontSize: "18.8909px",
                            lineHeight: "148%",
                            color: "#FFFFFF"

                        }}
                    >
                        Mr. Nick Peterson
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    position: "absolute",
                    bottom: "0"

                }}
            >
                <DashboardUserInfoChart />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    position: "absolute",
                    bottom: "20px"

                }}
            >
                <SelectedTimeLineList />
            </Box>


        </Box>
    )
}

export default DashboardUserInfo
