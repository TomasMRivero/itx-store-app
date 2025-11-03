import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { setupStore } from '../../../app/store';
import { cartApi } from '../cartApi';
import { cartSlice } from '../cartSlice';
import { TOAST_ERROR, TOAST_SUCCESS, toastSlice } from '../../toast/toastSlice';
import labels from '../../../i18n/es.json';

/**
 * @jest-environment node
 */

const sv = setupServer(
    http.post('http://localhost:3000/cart', () =>
        HttpResponse.json({ count: 3 })
    ));

beforeAll(() => sv.listen());
afterEach(() => sv.resetHandlers());
afterAll(() => sv.close());

it('updates store and dispatches setToast on success', async () => {
    const store = setupStore();

    const result = store.dispatch(
        cartApi.endpoints.addToCart.initiate({ id: '0001', colorCode: 1, storageCode: 2 })
    );

    await result.unwrap();

    const { [cartSlice.reducerPath]: cart, [toastSlice.reducerPath]: toast } = store.getState();
    expect(cart.count).toBe(3);
    expect(toast.message).toBe(labels.cart.addToCart.success);
    expect(toast.type).toBe(TOAST_SUCCESS);
});

it('updates toast with error status on failure', async () => {
    const store = setupStore();
    sv.use(
        http.post('http://localhost:3000/cart', () =>
            HttpResponse.json(null, { status: 500 })
        ));

    const payload = { id: '0001', colorCode: 1, storageCode: 2 };
    const response = store.dispatch(cartApi.endpoints.addToCart.initiate(payload));


    await expect(response.unwrap()).rejects.toEqual(expect.objectContaining({ status: 500 }));
    
    const { [toastSlice.reducerPath]: toast } = store.getState();

    expect(store.getState().toast.message).toBe(labels.cart.addToCart.error);
    expect(toast.type).toBe(TOAST_ERROR);
})