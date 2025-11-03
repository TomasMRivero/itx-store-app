import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import labels from '../../i18n/es.json';
import { useGetCartQuery } from "../../features/cart/cartApi";
import AppBreadcrumbs from "./AppBreadcrumbs";
import { useSelector } from "react-redux";

const Header = () => {
    const { count } = useSelector((state) => state.cart)

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
                    {labels.common.title}
                </Typography>

                <IconButton color="inherit">
                    <Badge badgeContent={count || null} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;