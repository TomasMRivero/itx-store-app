import { string } from "prop-types";
import { useGetProductByIdQuery } from "../../features/product/productApi";
import { Box, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetail from "../product/ProductDetail";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { data: product, isLoading, isError} = useGetProductByIdQuery(id);
    
    if (isLoading) return <CircularProgress />;
    return(
        <Box sx={{ p: 4 }}>
            {!isLoading && !isError && <ProductDetail product={product} />}
        </Box>
    )
};

export default ProductDetailPage;