import { Box, Typography } from "@mui/material"
import Image from "next/image"
import  searchIcon  from "../../assets/search-icon.svg";

const SearchComponent = () =>{
    return (
        <Box
            sx={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                background: "#1A202C",
                border: "1px solid #2B3548",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "7px",
                marginTop:"8px",
                height:"40px"
                
            }}
        >
            <Image src={searchIcon} alt="searchIcon"/>
            <Typography>Search your exchange</Typography>
        </Box>  
    )
}

export default SearchComponent