import React from "react";
import Cart from "./cart";

export default function Counter(props) {


    const renderCart = props.cart.map(cart => 
        <Cart
            items={cart}
    />)


    return (

        <div className="counter--container">
            <div className="counter--counter">
                {props.counter}
            </div>
            <div className="counter--cart">
                {renderCart}
            </div>
        </div>

    )
}