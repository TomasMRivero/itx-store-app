import { string } from "prop-types";
import { useGetProductByIdQuery } from "../../features/product/productApi";
import { Box, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetail from "../product/ProductDetail";
import ProductActions from "../product/ProductActions";
import ProductImage from "../product/ProductImage";
import { useAddToCartMutation } from "../../features/cart/cartApi";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { data: product, isLoading: isProductFetching, isError } = useGetProductByIdQuery(id);
    const [ addToCart, {isLoading: isAddToCartLoading} ] = useAddToCartMutation();

    const handleAddToCart = async (values) => {
        const { colors: colorCode, storages: storageCode } = values;
        try{
            await addToCart({
                id,
                colorCode,
                storageCode,
            }).unwrap()
        } catch ( err ) {
            console.log(err)
        }
    }

    if (isProductFetching) return <>Cargando</>
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
                    <ProductImage {...product} isLoading={isProductFetching} />
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ width: '100%', boxSizing: 'border-box', mb:3}}>
                        <ProductDetail product={product} />
                    </Box>
                    <Box sx={{ width: '100%', boxSizing: 'border-box'}}>
                        <ProductActions options={product.options} onAddToCart={ handleAddToCart } cartLoading={isAddToCartLoading} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ProductDetailPage;