import cartReducer, { setCart, clearCart } from '../cartSlice';

describe ('cartSlice', () => {
    const initialState = { count: 0, updatedAt: null };

    beforeEach(() => {
        jest.spyOn(Date, 'now').mockReturnValue(1741917908)
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('setCart updates count', () => {
        const nextState = cartReducer(initialState, setCart(5));
        expect(nextState.count).toBe(5);
        expect(nextState.updatedAt).toBe(1741917908)
    });

    it('clearCart goes back to 0', () => {
        const state = { count: 10, updatedAt: 111 };
        const nextState = cartReducer(state, clearCart());
        expect(nextState.count).toBe(0);
        expect(nextState.updatedAt).toBe(1741917908);
    });

});