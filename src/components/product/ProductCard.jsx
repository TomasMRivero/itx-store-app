import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { shape, string } from "prop-types";

const ProductCard = ({ product, }) => {
    return(
        <Card 
            sx={{
                backgroundColor: "background.paper",
                padding: 3,
                borderRadius: 3,
            }}
        >
            <CardMedia
                component="img"
                image={product.imgUrl}
                alt={`${product.brand}: ${product.model}`}
                sx={{
                    width: "100%", 
                    objectFit: "contain",
                    display: "flex",
                    flexDirection: "column",
                }}
            />
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
                            {product.brand}
                        </Typography>
                        <Typography
                            align="left"
                            variant="subtitle2"
                        >
                            {product.model}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        color="secondary"
                        sx={{ marginTop: 1 /* o gap entre bloques */ }}
                        align="right"
                    >
                        {product.price ? `${product.price}€` : "-"}
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
    }).isRequired,
};
ProductCard.defaultProps = {
    product: {
        price: null, //Tenemos casos de productos sin precio
    }
}

export default ProductCard;