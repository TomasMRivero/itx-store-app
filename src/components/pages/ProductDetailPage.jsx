import { string } from "prop-types";
import { useGetProductByIdQuery } from "../../features/product/productApi";
import { Box, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetail from "../product/ProductDetail";
import ProductActions from "../product/ProductActions";
import ProductImage from "../product/ProductImage";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
    if (isLoading) return <>Cargando</>
    return (
        <Box sx={{ width: '100%', boxSizing: 'border-box', p:4}}>
            <Grid 
                container spacing={2}
                alignItems="flex-start"
                sx={{
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <ProductImage {...product} isLoading={isLoading} />
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ width: '100%', boxSizing: 'border-box', mb:3}}>
                        <ProductDetail product={product} />
                    </Box>
                    <Box sx={{ width: '100%', boxSizing: 'border-box'}}>
                        <ProductActions options={product.options} onAddToCart={(values) => { console.log(values) }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ProductDetailPage;