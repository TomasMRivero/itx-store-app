import { Box, Container } from "@mui/material";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";

const MainLayout = ({
    children
}) => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Container sx={{ flex:1, py: 4}}>
                <Outlet />
            </Container>
        </Box>
    );
}

export default MainLayout;