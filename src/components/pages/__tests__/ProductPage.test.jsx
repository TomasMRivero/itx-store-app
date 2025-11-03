import { screen } from '@testing-library/react';
import { renderWithProviders } from "../../../test/test-utils";
import ProductPage from "../ProductPage";
import labels from '../../../i18n/es.json';

jest.mock('../../../features/product/productApi', () => {
    const actualModule = jest.requireActual('../../../features/product/productApi');
    return {
        __esModule: true,
        ...actualModule,
        useGetProductListQuery: jest.fn(),
    };
});

const { useGetProductListQuery } = jest.requireMock('../../../features/product/productApi');

const products = [
    { id: '1', brand: 'AAAAA', model: 'BBBBB', price: 100, imgUrl: 'a.jpg' },
    { id: '2', brand: 'XXXXX', model: 'YYYYY', price: 200, imgUrl: 'b.jpg' },
];

afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
});

it('shows skeletons while loading', () => {
    useGetProductListQuery.mockReturnValue({ data: [], isLoading: true });
    renderWithProviders(<ProductPage />);

    expect(screen.getAllByTestId('card-skeleton')).not.toHaveLength(0);
});

it('show ErrorScreen on error = true', () => {
    useGetProductListQuery.mockReturnValue({
        data: [],
        isLoading: false,
        isError: true,
        refetch: jest.fn(),
    });

    renderWithProviders(<ProductPage />);

    expect(screen.getByText(labels.error.pages.fetchProductList)).toBeInTheDocument();
});

it('shows products successfully', async () => {
    useGetProductListQuery.mockReturnValue({
        data: products,
        isLoading: false,
        isError: false,
        refetch: jest.fn(),
    });

    renderWithProviders(<ProductPage />);

    expect(screen.getByText("AAAAA")).toBeInTheDocument();
    expect(screen.getByText("XXXXX")).toBeInTheDocument();
});
