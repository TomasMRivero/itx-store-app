import { TextField } from "@mui/material";

const SearchBar = ({ search, setSearch }) => {
  return (
    <TextField
      label="Buscar producto"
      variant="outlined"
      size="small"
      fullWidth
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
}
 export default SearchBar;