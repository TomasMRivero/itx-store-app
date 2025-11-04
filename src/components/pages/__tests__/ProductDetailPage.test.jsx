import { setupServer } from 'msw/node';
import labels from '../../../i18n/es.json';
import { http, HttpResponse } from 'msw';
import { renderWithProviders } from '../../../test/test-utils';
import ProductDetailPage from '../ProductDetailPage';
import Toast from '../../common/Toast';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../../../features/product/productApi', () => {
    const actualModule = jest.requireActual('../../../features/product/productApi');
    return {
        __esModule: true,
        ...actualModule,
        useGetProductByIdQuery: jest.fn(),
    };
});


const { useGetProductByIdQuery } = jest.requireMock('../../../features/product/productApi');

const product = {
    id: '1',
    brand: 'AAAAA',
    model: 'BBBBB',
    price: 100,
    imgUrl: 'a.jpg',
    options: {
        colors: [
            {
                code: 1000,
                name: 'Black'
            },
            {
                code: 2000,
                name: 'White'
            }
        ],
        storages: [
            {
                code: 2000,
                name: '32 GB'
            }
        ]
    }
};

const server = setupServer(
    http.post('http://localhost:3000/cart', () => {
        return HttpResponse.json({ count: 3 });
    })
);


beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
    localStorage.clear();
});
afterAll(() => server.close());

const renderDetailPage = (route = '/products/1') =>
    renderWithProviders(
        <>
            <ProductDetailPage />
            <Toast />
        </>
        , { route });

it('shows loader while fetching product', async () => {
    useGetProductByIdQuery.mockReturnValue({ data: {}, isLoading: true });
    renderDetailPage();

    expect(
        screen.getByText(labels.product.loadingDetail)
    ).toBeInTheDocument();
});

it('shows ErrorScreen on error', async () => {
    useGetProductByIdQuery.mockReturnValue({ data: {}, isError: true, isLoading: false });
    renderDetailPage();

    expect(
        await screen.findByText(labels.error.pages.fetchProduct)
    ).toBeInTheDocument();
});

it('shows product detail on successfull fetch', async () => {
    useGetProductByIdQuery.mockReturnValue({ data: product, isError: false, isLoading: false });
    renderDetailPage();

    expect(await screen.findByText('BBBBB')).toBeInTheDocument();
    expect(
        screen.getByText(`${labels.product.options.colors}:`)
    ).toBeInTheDocument();
    expect(
        screen.getByText(`${labels.product.options.storages}:`)
    ).toBeInTheDocument();
});

it('fails when validating options on add to cart', async () => {
    useGetProductByIdQuery.mockReturnValue({ data: product, isError: false, isLoading: false });
    renderDetailPage();

    const user = userEvent.setup();

    const submit = await screen.findByRole('button', {
        name: labels.product.actions.addToCart,
    });
    await user.click(submit);

    const errors = await screen.findAllByText(
        labels.product.errors.options.notSelected
    );
    //  Si no tiene errores estaría mal
    //  Si tiene dos errores también estaría mal porque almacenamiento tiene una sola opción
    //  por lo que debería estar seleccionada por defecto.
    expect(errors).toHaveLength(1);
});


it('successfully validates options on add to cart', async () => {
    useGetProductByIdQuery.mockReturnValue({ data: product, isError: false, isLoading: false });
    const { store } = renderDetailPage();
    const user = userEvent.setup();

    await screen.findByText(`${labels.product.options.colors}:`);

    await user.click(screen.getByText('Black'));

    const submit = screen.getByRole('button', {
        name: labels.product.actions.addToCart,
    });
    await user.click(submit);

    await waitFor(() =>
        expect(store.getState().cart.count).toBe(3)
    );

    expect(
        await screen.findByText(labels.cart.addToCart.success)
    ).toBeInTheDocument();
});

it('displays error toast on failed request to cart', async () => {
    useGetProductByIdQuery.mockReturnValue({ data: product, isError: false, isLoading: false });
    renderDetailPage();

    server.use(
        http.post('http://localhost:3000/cart', () =>
            HttpResponse.json({}, { status: 500 })
        )
    );


    const user = userEvent.setup();

    await screen.findByText(`${labels.product.options.colors}:`);
    await user.click(screen.getByText('Black'));

    const submit = screen.getByRole('button', {
        name: labels.product.actions.addToCart,
    });
    await user.click(submit);

    expect(
        await screen.findByText(labels.cart.addToCart.error)
    ).toBeInTheDocument();
});