import { Box, Container } from "@mui/material";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";

const MainLayout = ({
    children
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container sx={{ mt: 4, flexGrow: 1 }} maxWidth="xl">
                <Outlet />
            </Container>
        </Box>
    );
}

export default MainLayout;