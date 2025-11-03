import { Box, CircularProgress, Typography } from '@mui/material';
import { bool, string } from 'prop-types';
import labels from '../../i18n/es.json';

const SectionSpinner = ({ message = labels.common.loading, noMessage = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        width: '100%',
      }}
    >
      <CircularProgress color="primary" thickness={4} size={48} sx={{ mb: 2 }} />
      {!noMessage && <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>}
    </Box>
  );
}

SectionSpinner.propTypes = {
    message: string,
    noMessage: bool
}

export default SectionSpinner;