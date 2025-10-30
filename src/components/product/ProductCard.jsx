import { Box, Card, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import { bool, shape, string } from "prop-types";

const ProductCard = ({ 
    product,
    isLoading = false
}) => {
    return(
        <Card 
            sx={{
                backgroundColor: "background.paper",
                padding: 3,
                borderRadius: 3,
            }}
        >
            {isLoading ? (
                <Skeleton 
                    height={210}
                    width={228}
                    animation="wave"
                    variant="rectangular"
                    sx={{
                        objectFit: "contain",
                        display: "flex",
                        flexDirection: "column",
                        mx: "auto"
                    }}
                />
            ) : (
                <CardMedia
                    height={210}
                    width="100%"
                    component="img"
                    image={product.imgUrl}
                    alt={`${product.brand}: ${product.model}`}
                    sx={{
                        objectFit: "contain",
                        display: "flex",
                        flexDirection: "column",
                    }}
                />
            ) }
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 2, "&:last-child": { paddingBottom: 0 } }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={3}
                    justifyContent="space-between"
                >
                    <Box display="flex" flexDirection="column" gap={0}>
                        <Typography
                            align="left"
                            variant="subtitle1"
                            fontWeight="bold"
                        >
                            {isLoading ? <Skeleton /> : product.brand}
                        </Typography>
                        <Typography
                            align="left"
                            variant="subtitle2"
                            noWrap
                        >
                            {isLoading ? <Skeleton /> : product.model}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        color="secondary"
                        sx={{ marginTop: 1 /* o gap entre bloques */ }}
                        align="right"
                    >
                        {isLoading ? <Skeleton /> : (product.price ? `${product.price}€` : "-")}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
};

ProductCard.propTypes = {
    product: shape({
        id: string.isRequired,
        brand: string.isRequired,
        model: string.isRequired,
        price: string,
        imgUrl: string.isRequired,
    }),
    isLoading: bool
};

export default ProductCard;