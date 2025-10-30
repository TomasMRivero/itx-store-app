import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#F4BF96"},
    secondary: { main: "#CE5A67"},
    background: {
      default: "#f5f5f5",
      paper: "#ffffff", 
    }
  },
  typography: {
    fontFamily: "Roboto, sans-serif"
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
