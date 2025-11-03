import toastReducer, { setToast, clearToast, TOAST_INFO } from '../toastSlice';

describe ('cartSlice', () => {
    const initialState = {
        message: null,
        type: null,
        open: false,
    };

    it('setCart updates count', () => {
        const nextState = toastReducer(initialState, setToast({message: "test", type: TOAST_INFO}));
        expect(nextState.message).toBe("test");
        expect(nextState.type).toBe(TOAST_INFO);
        expect(nextState.open).toBe(true);
    });

    it('clearCart goes back to 0', () => {
        const state = { message: "test", type: TOAST_INFO, open: true };
        const nextState = toastReducer(state, clearToast());
        expect(nextState.message).toBe(null);
        expect(nextState.type).toBe(null);
        expect(nextState.open).toBe(false);
    });

});