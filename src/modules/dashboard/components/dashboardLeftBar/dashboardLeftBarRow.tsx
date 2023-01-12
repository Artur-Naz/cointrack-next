import { Box, Typography } from "@mui/material"
import Image from "next/image"
import analyticsBlockIcon from "../../assets/analyticsBlockIcon.svg"
import chartIcon from "../../assets/chart-icon.svg"
import editeIcon from "../../assets/edite-icon.svg"
import deleteIcon from "../../assets/delete-icon.svg"


const dashboardLeftBarRow = ()=>{
    return(
        <Box>
            <Box>
            <Image src={analyticsBlockIcon} alt="analyticsBlockIcon" />
            <Typography>Metamask</Typography>

            </Box>
            <Box>
            <Typography>4.85%</Typography>

            <Image src={chartIcon} alt="chartIcon" />

                </Box>      
                <Box>
                    </Box>    
            <Image src={editeIcon} alt="editeIcon" />
            <Image src={deleteIcon} alt="deleteIcon" />


        </Box>
        )
}

export default dashboardLeftBarRow