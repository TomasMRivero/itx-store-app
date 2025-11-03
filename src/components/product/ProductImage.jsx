import { Box, Skeleton } from "@mui/material";
import { string } from "prop-types"

const ProductImage = ({ imgUrl = null, brand = null, model = null, isLoading = true }) => {

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                p: 0,

            }}
        >
            {isLoading ? (
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        borderRadius: 2,
                        boxShadow: 3,
                        p: 4,
                        backgroundColor: "background.paper",
                    }}
                >
                    <Skeleton variant="rectangular"
                        sx = {{
                            width: '100%',
                            maxWidth: '100%',
                            height: 530,
                            objectFit: 'contain',
                            display: 'block',
                            boxShadow: 3,
                        }}>
                    </Skeleton>
                </Box>
            ) : (
                <Box
                    component="img"
                    src={imgUrl}
                    alt={`${brand} ${model}`}
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        borderRadius: 2,
                        boxShadow: 3,
                        p: 4,
                        backgroundColor: "background.paper",
                    }}
                />
            )}
        </Box>
    )
}

ProductImage.propTypes = {
    imgUrl: string,
    brand: string,
    model: string
};

export default ProductImage;