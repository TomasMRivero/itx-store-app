import { string } from "prop-types";
import { useGetProductByIdQuery } from "../../features/product/productApi";
import { Box, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetail from "../product/ProductDetail";
import ProductActions from "../product/ProductActions";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { data: product, isLoading, isError} = useGetProductByIdQuery(id);
    
    if (isLoading) return <CircularProgress />;
    return(
        <Box sx={{ p: 4 }}>
            {!isLoading && !isError &&
                <>
                    <ProductDetail product={product} />
                    <ProductActions options={product.options} onAddToCart={(values) => {console.log(values)}} />
                </>
            }
        </Box>
    )
};

export default ProductDetailPage;