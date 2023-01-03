import { Box, Typography } from "@mui/material"
import SelectedTimeLineList from "../../../../shared/components/selectedTimeLineList"
import Image from "next/image"

interface IDashoardAnaliticsBlock{
    title:string,
    currency:string,
    img:any
}

const DashoardAnaliticsBlock = ({title,currency,img}:IDashoardAnaliticsBlock) => {
    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                justifyContent:"space-between",
                flexDirection:"column",
                background: "#232A36",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.14)",
                borderRadius: "2.39405px",
                width: "206px",
                height: "89px"

            }}
        >

            <Box>
                <Typography
                    sx={{
                        textAlign:"end",
                        fontweight: 300,
                        fontSize: "12.8909px",
                        lineHeight: "150%",
                        color: "#F2F2F2",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        textAlign:"end",
                        fontweight: 500,
                        fontSize: "16.8909px",
                        lineHeight: "150%",
                        color: "#F2F2F2",
                    }}
                >
                    {currency}
                </Typography>
            </Box>
            <Box
                sx={{
                    position:"absolute",
                    top:"-10px",
                    left:"11px"
                }}
            >
                <Image src={img} alt = "analyticsBlockIcon"/>
            </Box>

            <SelectedTimeLineList 
            ItemStyle={{
                fontWeight: 400,
                fontSize: "7.70044px",
                lineHeight: "148%",
                
                '&:hover': {
                    background: "#FFFFFF",
                    color:"#1F201F"
                },
            }}
            blockStyle={{
                width:"60%"
            }}
            />
        </Box>
    )
}

export default DashoardAnaliticsBlock
