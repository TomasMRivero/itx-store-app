import { string } from "prop-types";
import { useGetProductByIdQuery } from "../../features/product/productApi";
import { Box, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetail from "../product/ProductDetail";
import ProductActions from "../product/ProductActions";
import ProductImage from "../product/ProductImage";
import { useAddToCartMutation } from "../../features/cart/cartApi";
import labels from '../../i18n/es.json';
import ErrorScreen from "../layout/ErrorScreen";
import SectionSpinner from "../common/SectionSpinner";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { data: product, isLoading: isProductFetching, isError } = useGetProductByIdQuery(id);
    const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation();
    const handleAddToCart = async (values) => {
        const { colors: colorCode, storages: storageCode } = values;
        try {
            await addToCart({
                id,
                colorCode,
                storageCode,
            }).unwrap()
        } catch (err) {
            console.log(err)
        }
    }

    if(isError) return <ErrorScreen message={labels.error.pages.fetchProduct} onRetry={() => {console.log("hola")}}/>
    return (
        <Box sx={{ width: '100%', boxSizing: 'border-box', p: 4 }}>
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
                    <Box sx={{ width: '100%', boxSizing: 'border-box', mb: 3 }}>
                        {isProductFetching
                            ? <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    p: 3,
                                    backgroundColor: "background.paper",
                                }}
                                >
                                    <SectionSpinner message={labels.product.loadingDetail} />
                                </Box>
                            : <ProductDetail product={product} />
                        }
                    </Box>
                    <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
                        {isProductFetching
                            ? <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    p: 3,
                                    backgroundColor: "background.paper",
                                }}
                                >
                                    <SectionSpinner noMessage />
                                </Box>
                            : <ProductActions options={product.options} onAddToCart={handleAddToCart} cartLoading={isAddToCartLoading} />
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ProductDetailPage;