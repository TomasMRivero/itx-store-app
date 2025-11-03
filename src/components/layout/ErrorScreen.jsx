import { Box, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { func, string } from "prop-types";
import labels from '../../i18n/es.json';

const ErrorScreen = ({
    message,
    onRetry
}) => {
    return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3,
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />

      <Typography variant="h5" sx={{ mb: 1 }}>
        {labels.error.pages.title}
      </Typography>

      {message && <Typography variant="body1" sx={{ mb: 3, maxWidth: 400 }}>
        {message}
      </Typography>}

      {onRetry && (
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          sx={{ borderRadius: 3, px: 4 }}
        >
          {labels.common.retry}
        </Button>
      )}
    </Box>
  );
}

ErrorScreen.propTypes = {
    message: string,
    onRetry: func,
}

export default ErrorScreen