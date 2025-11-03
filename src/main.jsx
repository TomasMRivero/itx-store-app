import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store.js'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import SectionSpinner from './components/common/SectionSpinner.jsx'

const theme = createTheme({
	palette: {
		mode: "light",
		primary: { main: "#F4BF96" },
		secondary: { main: "#CE5A67" },
		background: {
			default: "#f5f5f5",
			paper: "#ffffff",
		}
	},
	typography: {
		fontFamily: "Roboto, sans-serif"
	}
})

if (!globalThis.importMeta) {
  globalThis.importMeta = { env: import.meta.env };
}

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={<SectionSpinner noMessage/>} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<CssBaseline />
						<App />
					</BrowserRouter>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</StrictMode>
)
