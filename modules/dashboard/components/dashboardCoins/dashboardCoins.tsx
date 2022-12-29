import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import DashboardBloksHeader from "../shared/dashboardBloksHeader"
import SelectedTimeLineList from "../shared/selectedTimeLineList"
import DashboardCoinsBlock from "./dashboardCoinsBlock";
import skullIcon from "../../assets/skull֊icon.svg"
import scaleIcon from "../../assets/scale֊icon.svg"
import graphIcon from "../../assets/graph֊icon.svg"


const DashboardCoins = () => {



    return (
        <Box
            sx={{
                borderRadius: '10px',
                background: '#212734',
                maxWidth: "267px",
                width: "100%",
                height: "348px"
            }}
        >
            <DashboardBloksHeader blokTitle="Coins" />
            < Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"

                }}
            >
                <DashboardCoinsBlock styles={{
                    maxWidth: "119px",
                    width: "100%",
                    height: "40px"
                }
                }>
                    Top Gainer
                </DashboardCoinsBlock>
                <DashboardCoinsBlock
                    styles={{
                        maxWidth: "119px",
                        width: "100%",
                        height: "40px",
                        background: " #354052",
                        color: "#F2F2F2"
                    }
                    } >
                    Top Loser
                </DashboardCoinsBlock>
            </Box>
            <Box sx={{
                display: "flex"
            }}>
                <DashboardCoinsBlock styles={{ position: "absalute", width: "37px", height: "37px", marginRight: "14px" }}>
                    <Image src={skullIcon} alt="skull֊icon" />
                </DashboardCoinsBlock>
                <Box>
                    <Typography
                        sx={{
                            fontweight: 400,
                            fontSize: "13.8909px",
                            lineHeight: "20px",
                            color: "#FFFFFF"
                        }}
                    >
                        Apecoin
                    </Typography>
                    <Typography
                        sx={{
                            fontweight: 300,
                            fontSize: "10.8909px",
                            lineHeight: "16px",
                            color: "#FFFFFF"

                        }}
                    >
                        Coin’s name</Typography>
                </Box>
            </Box>

            <Box sx={{
                display: "flex"
            }}>
                <DashboardCoinsBlock styles={{ position: "absalute", width: "37px", height: "37px", marginRight: "14px" }}>
                    <Image src={scaleIcon} alt="Scale֊icon" />
                </DashboardCoinsBlock>
                <Box>
                    <Typography
                        sx={{
                            fontweight: 400,
                            fontSize: "13.8909px",
                            lineHeight: "20px",
                            color: "#FFFFFF"
                        }}
                    >
                        0.74%
                    </Typography>
                    <Typography
                        sx={{
                            fontweight: 300,
                            fontSize: "10.8909px",
                            lineHeight: "16px",
                            color: "#FFFFFF"

                        }}
                    >
                        Coin’s nameCoin’s nameCoin’s
                    </Typography>
                </Box>
            </Box>

            <Box sx={{
                display: "flex"
            }}>
                <DashboardCoinsBlock styles={{ position: "absalute", width: "37px", height: "37px", marginRight: "14px" }}>
                    <Image src={graphIcon} alt="Scale֊icon" />
                </DashboardCoinsBlock>
                <Box>
                    <Typography
                        sx={{
                            fontweight: 400,
                            fontSize: "13.8909px",
                            lineHeight: "20px",
                            color: "#FFFFFF"
                        }}
                    >
                        $0.000
                    </Typography>
                    <Typography
                        sx={{
                            fontweight: 300,
                            fontSize: "10.8909px",
                            lineHeight: "16px",
                            color: "#FFFFFF"

                        }}
                    >
                        Current balanceCurrent balanceCu
                    </Typography>
                </Box>
            </Box>
            <Box>
                <DashboardCoinsBlock
                    styles={{
                        width: "100%",
                        height: "40px",
                        background: " #354052",
                        color: "#F2F2F2"
                    }
                    } >
                    Price Now: $0.000
                </DashboardCoinsBlock>
            </Box>
            <SelectedTimeLineList />
        </Box >
    )
}
export default DashboardCoins

