import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import FilterBar from "../common/FilterBar";
import SearchBar from "../common/Searchbar";

const SORT_OPTIONS = [
    { value: "", label: "Cualquiera"},
    { value: "price", label: "Precio" },
    { value: "brand", label: "Marca" },
    { value: "model", label: "Modelo" },
];

const ProductFilterBar = ({search, sortBy, sortOrder, setSearch, setSortBy, setSortOrder, children}) => {

    return(
        <FilterBar>
            <Grid size={{xs: 12, sm:12, md: 12, lg: 12}}>
                <SearchBar search={search} setSearch={setSearch} />
            </Grid>
            <Grid size={{xs: 12, sm:6, md: 7, lg: 8}}>
                <InputLabel id="product-filter-bar-sort-by">Ordenar por...</InputLabel>
                <Select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    displayEmpty
                    labelId="product-filter-bar-sort-by"
                    sx={{width: "100%"}}
                >
                    {SORT_OPTIONS.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid size={{xs: 12, sm:6, md: 5, lg: 4}}>
                <Select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                    displayEmpty
                    sx={{width: "100%"}}
                >
                    <MenuItem value="asc">Ascendente</MenuItem>
                    <MenuItem value="desc">Descendente</MenuItem>
                </Select>
            </Grid>
        </FilterBar>
    )
}

export default ProductFilterBar;