import { Box, Container } from "@mui/material";
import Header from "../common/Header";

const MainLayout = ({
    children
}) => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Container sx={{ flex:1, py: 4}}>
                {children}
            </Container>
        </Box>
    );
}

export default MainLayout;