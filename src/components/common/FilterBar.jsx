import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

const FilterBar = ({ children }) => {
    const theme = useTheme();
    const isExpandible = useMediaQuery(theme.breakpoints.down("sm"))
    
    const gridBox = 
        <Grid container spacing={2} alignItems="flex-end" justifyContent="space-evenly">
            {children}
        </Grid>

    return(
        <Box width="100%" mb={2}>
            {isExpandible ? (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="filter-handler"
                    >
                        <Typography>
                            Filtrar productos
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {gridBox}
                    </AccordionDetails>
                </Accordion>
            ) : (
                <Box>
                    {gridBox}
                </Box>
            )}
        </Box>
    );
};

export default FilterBar;