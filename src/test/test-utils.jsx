import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { setupStore } from '../app/store';

export const renderWithProviders = (
	ui, extendedRenderOptions = {}
) => {
	const {
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = setupStore(preloadedState),
		...renderOptions
	} = extendedRenderOptions

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


	const Wrapper = ({ children }) => (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<MemoryRouter initialEntries={[route]}>
					{children}
				</MemoryRouter>
			</ThemeProvider>
		</Provider>
	)

	// Return an object with the store and all of RTL's query functions
	return {
		store,
		...render(ui, { wrapper: Wrapper, ...renderOptions })
	}
}