import { Box, Container } from "@mui/material";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import AppBreadcrumbs from "../common/AppBreadcrumbs";

const MainLayout = ({
    children
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container sx={{ mt: 4, flexGrow: 1 }} maxWidth="xl">
                <AppBreadcrumbs />
                <Outlet />
            </Container>
        </Box>
    );
}

export default MainLayout;