import { TextField } from "@mui/material";
import labels from '../../i18n/es.json';

const SearchBar = ({ search, setSearch, label = labels.common.search}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      fullWidth
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
}
 export default SearchBar;