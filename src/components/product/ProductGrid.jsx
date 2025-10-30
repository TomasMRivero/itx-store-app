import { Grid } from "@mui/material"
import { arrayOf, number, shape, string } from "prop-types"
import ProductCard from "./ProductCard";

const ProductGrid = ({ productList }) => {
    return (
        <Grid container spacing={2}>
            {
                productList.map(product => (
                    <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

ProductGrid.propTypes = {
    productList: arrayOf(
        shape({
            id: string.isRequired,
            brand: string.isRequired,
            model: string.isRequired,
            price: number.isRequired,
            imgUrl: string.isRequired,
        })
    ),
};

ProductGrid.defaultProps = {
    productList: []
};

export default ProductGrid;