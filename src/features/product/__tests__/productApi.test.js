import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { setupStore } from '../../../app/store';
import { productApi } from '../productApi';

const sv = setupServer(
    http.get('http://localhost:3000/product', () =>
        HttpResponse.json([
            { id: '1', brand: 'Brand', model: 'Model', price: '100', imgUrl: 'url' },
        ])
    ),
    http.get('http://localhost:3000/product/:id', ({ params }) =>
        HttpResponse.json({ id: params.id, brand: 'Brand', model: 'Model', price: '100', imgUrl: 'url' })
    )
);

beforeAll(() => sv.listen());
afterEach(() => sv.resetHandlers());
afterAll(() => sv.close());

it('fetches the product list successfully', async () => {
    const store = setupStore();

    const result = await store
        .dispatch(productApi.endpoints.getProductList.initiate())
        .unwrap();

    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe('Brand')
    const cached = productApi.endpoints.getProductList.select()(store.getState());
    expect(cached.data).toEqual(result);
});

it('gets response from cache despite unsuccessfull fetch', async () => {
    const store = setupStore();
    sv.use(
        http.get('http://localhost:3000/product', () =>
            HttpResponse.json(null, { status: 500 })
        ));

    const result = await store
        .dispatch(productApi.endpoints.getProductList.initiate())
        .unwrap();

    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe('Brand')
    const cached = productApi.endpoints.getProductList.select()(store.getState());
    expect(cached.data).toEqual(result);
});

it('fails on fetching the product list', async () => {
    localStorage.clear();

    const store = setupStore();
    sv.use(
        http.get('http://localhost:3000/product', () =>
            HttpResponse.json(null, { status: 500 })
        ));

    const result = store.dispatch(productApi.endpoints.getProductList.initiate())

    await expect(result.unwrap()).rejects.toEqual(expect.objectContaining({ status: 500 }));
});



it('fetches the product detail successfully', async () => {
    const id = '1';
    const store = setupStore();

    const result = await store
        .dispatch(productApi.endpoints.getProductById.initiate(id))
        .unwrap();

    expect(result.id).toBe(id);
    const cached = productApi.endpoints.getProductById.select(id)(store.getState());
    expect(cached.data).toEqual(result);
});

it('fails on fetching the product detail', async () => {
    const id = '1';
    const store = setupStore();
    sv.use(
        http.get('http://localhost:3000/product/:id', () =>
            HttpResponse.json(null, { status: 500 })
        ));

    const result = await store
        .dispatch(productApi.endpoints.getProductById.initiate(id))
        .unwrap();

    expect(result.id).toBe(id);
    const cached = productApi.endpoints.getProductById.select(id)(store.getState());
    expect(cached.data).toEqual(result);
});

it('fails on fetching the product detail', async () => {
    localStorage.clear();

    const id = '1';
    const store = setupStore();
    sv.use(
        http.get('http://localhost:3000/product/:id', () =>
            HttpResponse.json(null, { status: 500 })
        ));

    const result = store.dispatch(productApi.endpoints.getProductById.initiate(id))

    await expect(result.unwrap()).rejects.toEqual(expect.objectContaining({ status: 500 }));
});