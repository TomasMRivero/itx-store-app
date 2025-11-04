import { matchPath, Link as RouterLink, useLocation } from "react-router-dom";
import labels from '../../i18n/es.json';
import { Breadcrumbs, Link as MUILink, Typography } from "@mui/material";


const AppBreadcrumbs = () => {
    const breadcrumbNameMap = {
        "/": labels.common.pages.home,
        "/products": labels.common.pages.products,
        "/products/:id": labels.common.pages.productDetails,
    };

    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    const crumbs = pathnames.map((_, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

        const label =
            Object.keys(breadcrumbNameMap).find((pattern) =>
                matchPath({ path: pattern, end: true }, routeTo)
            ) || routeTo;

        const labelText =
            breadcrumbNameMap[label] || routeTo.charAt(0).toUpperCase() + routeTo.slice(1);

        return {
            to: routeTo,
            label: labelText,
        };
    });

    return (
        <Breadcrumbs m={3}>
            <MUILink component={RouterLink} underline="hover" to="/" color="secondary">
                {breadcrumbNameMap["/"]}
            </MUILink>
            {
                crumbs.map((crumb, index) => {
                    return index === crumbs.length - 1 ? (
                        <Typography key={crumb.to}>
                            {crumb.label}
                        </Typography>
                    ) : (
                        <MUILink
                            key={crumb.to}
                            component={RouterLink}
                            underline="hover"
                            to={crumb.to}
                            color="secondary"
                        >
                            {crumb.label}
                        </MUILink>
                    )
                })
            }
        </Breadcrumbs>
    );
};

export default AppBreadcrumbs;
