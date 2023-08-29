import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cart: [],
        totalQuants: 0,
        totalAmounts: 0,
    },

    reducers: {
        addItem: (state, action) => {
            state.cart.push({
                name: action.payload.name,
                eachCount: action.payload.eachCount,
                price: action.payload.price,
            });
        },
        updateValue: (state, action) => {
            state.cart = action.payload;
        },
        updateSum: (state) => {
            let quant = 0;
            let amount = 0;
            state.cart.map((item) => {
                quant += item.eachCount;
                amount += item.price;
            });
            state.totalQuants = quant;
            state.totalAmounts = amount;
        },
    },
});

export default cartSlice.reducer;

export const { addItem, updateValue, updateSum } = cartSlice.actions;
