import { Box, Typography } from "@mui/material"
import { useGetProductListQuery } from "../../features/product/productApi";
import ProductGrid from "../product/ProductGrid";

const ProductPage = ({}) => {
    const { data: productList, isLoading, isError, isSuccess } = useGetProductListQuery();
    return(
        <Box>
            <Typography variant="h4" mb={3}>
                Productos
            </Typography>
            {!isLoading && isSuccess && <ProductGrid productList={productList}/>}
        </Box>
    )
}

export default ProductPage;