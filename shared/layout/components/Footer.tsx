import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";

function Footer() {
    return ( <Box
        component="footer"
        sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) => theme.palette.background.paper,
        }}
    >
        <Container maxWidth="sm">
            <Typography variant="body1">
                My sticky footer can be found here.
            </Typography>
        </Container>
    </Box>)
}

export default Footer
