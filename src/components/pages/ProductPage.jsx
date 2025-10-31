import { Box, Typography } from "@mui/material"
import { useGetProductListQuery } from "../../features/product/productApi";
import ProductGrid from "../product/ProductGrid";
import { useMemo, useState } from "react";
import ProductFilterBar from "../product/ProductFilterBar";

const ProductPage = ({}) => {
    const { data: productList = [], isLoading, isError } = useGetProductListQuery();
    
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const filteredProducts = useMemo(()=>{
        let result = [...productList];
        
        if(search) {
            result = searchProducts(result, search)
        }

        if (sortBy) {
            result = sortProducts(result, sortBy, sortOrder)
        }

        return result
    }, [search, productList, sortBy, sortOrder]);
    return(
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" mb={3}>
                Productos
            </Typography>
            <ProductFilterBar
                search={search}
                sortBy={sortBy}
                sortOrder={sortOrder}
                setSearch={setSearch}
                setSortBy={setSortBy}
                setSortOrder={setSortOrder}
            />
            {!isError && <ProductGrid productList={filteredProducts} isLoading={isLoading}/>}
        </Box>
    )
}

const searchProducts = (productList, criteria) => {
    const lowercaseCriteria = criteria.toLowerCase();
    return [...productList].filter(
            product => 
                product.brand.toLowerCase().includes(lowercaseCriteria) ||
                product.model.toLowerCase().includes(lowercaseCriteria)
            );
}

const sortProducts = (productList, criteria, sortOrder) => 
    [...productList].sort((izq, der) => {
    let valIzq = izq[criteria];
    let valDer = der[criteria];

    if(typeof valIzq === "string") valIzq = valIzq.toLowerCase()
    if(typeof valDer === "string") valDer = valDer.toLowerCase()

    if (!valIzq) return 1;
    if (!valDer) return -1;

    if (valIzq < valDer) return sortOrder === "asc" ? 1 : -1;
    if (valIzq > valDer) return sortOrder === "asc" ? -1 : 1;
    return 0;
});

export default ProductPage;