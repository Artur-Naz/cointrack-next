import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import ResponsiveAppBar from "./components/AppBar";
import Footer from "./components/Footer";

interface MainLayoutProps {
    children: JSX.Element,
    disableLayout: boolean
}

function MainLayout({children, disableLayout = false}: MainLayoutProps) {
    return (<Box display={'flex'} flexDirection={'column'} className="app" minHeight={'100vh'}>

        {!disableLayout && <ResponsiveAppBar/>}

        <Container component="main" sx={{mt: 8, mb: 2}} maxWidth={'xl'}>
            {children}
        </Container>

        {!disableLayout && <Footer/>}

    </Box>)
}

export default MainLayout
