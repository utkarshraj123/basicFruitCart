import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateSum, updateValue } from "../redux/slices/cartSlice";

function Cart() {
    const [eachCount, setEachCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");

    const cart = useSelector((state) => state.cartReducer.cart);
    const finalPrice = useSelector((state) => state.cartReducer.totalAmounts);
    const finalQuant = useSelector((state) => state.cartReducer.totalQuants);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateSum());
    }, [cart]);

    function handleAdd(id) {
        const index = id;
        const item = cart[index];

        const count = eachCount + 1;
        // setEachCount(count);
        // setPrice(price + 10);

        const editedItem = {
            name: item.name,
            eachCount: item.eachCount + 1,
            price: item.price + 10,
        };

        const tempArr = [...cart];
        tempArr[index] = editedItem;
        dispatch(updateValue(tempArr));
    }

    function handleSubtract(id) {
        const index = id;
        const item = cart[index];

        if (item.eachCount > 0) {
            const count = eachCount - 1;
            // setEachCount(count);
            if (item.price >= 10) {
                // setPrice(price - 10);

                const editedItem = {
                    name: item.name,
                    eachCount: item.eachCount - 1,
                    price: item.price - 10,
                };
                const tempArr = [...cart];
                tempArr[index] = editedItem;
                dispatch(updateValue(tempArr));
            }
        }
    }

    function handleSubmit() {
        if (name.trim().length !== 0) {
            dispatch(
                addItem({
                    name,
                    eachCount: 0,
                    price: 0,
                })
            );
        }
        setName("");
    }

    return (
        <div className="content">
            <header>
                <div className="nav-content">
                    <p>Total Quantity: {finalQuant}</p>
                    <p>Total Amount: {finalPrice}</p>
                </div>
            </header>
            <main>
                <div className="input-div">
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Add Item"
                    />
                    <button onClick={handleSubmit}>Add Item</button>
                </div>
                <p className="your-items">Your Items</p>
                <div className="item-list">
                    {cart.map((item, id) => {
                        return (
                            <div key={`${id}`} className="individual">
                                <div className="item">
                                    <p>{item.name}</p>
                                    <div
                                        className="reds"
                                        onClick={() => handleAdd(id)}
                                    >
                                        ➕
                                    </div>
                                    <p>{item.eachCount}</p>
                                    <div
                                        className="greens"
                                        onClick={() => handleSubtract(id)}
                                    >
                                        ➖
                                    </div>
                                </div>
                                <p>{item.price}</p>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default Cart;
