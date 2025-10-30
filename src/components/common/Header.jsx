import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Header = ({
    children
}) => {
    return(
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit"}}>
                    ITX-SHOP
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;