import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import FilterBar from "../common/FilterBar";
import SearchBar from "../common/Searchbar";
import labels from '../../i18n/es.json';

const SORT_OPTIONS = [
    { value: "", label: labels.product.filters.any},
    { value: "price", label: labels.product.filters.price },
    { value: "brand", label: labels.product.filters.brand },
    { value: "model", label: labels.product.filters.model },
];

const ProductFilterBar = ({search, sortBy, sortOrder, setSearch, setSortBy, setSortOrder}) => {

    return(
        <FilterBar>
            <Grid size={{xs: 12, sm:12, md: 12, lg: 12}}>
                <SearchBar search={search} setSearch={setSearch} label={labels.product.actions.searchProduct}/>
            </Grid>
            <Grid size={{xs: 12, sm:6, md: 7, lg: 8}}>
                <InputLabel id="product-filter-bar-sort-by">{labels.common.orderBy}</InputLabel>
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
                    <MenuItem value="asc">{labels.common.asc}</MenuItem>
                    <MenuItem value="desc">{labels.common.desc}</MenuItem>
                </Select>
            </Grid>
        </FilterBar>
    )
}

export default ProductFilterBar;