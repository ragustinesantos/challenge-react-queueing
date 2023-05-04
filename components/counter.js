import React from "react";
import Cart from "./cart";
import cashier from "../static files/cashier.png"


export default function Counter(props) {


    const renderCart = props.cart.map(cart => 
        <Cart
            items={cart}
    />)


    return (

        <div className="counter--container">
            <div className="counter--counter">
                <div className="counter--number">{props.counter}</div>
                <img className="counter--cashier" src={cashier} alt="Cashier" />
            </div>
            <div className="counter--cart">
                {renderCart}
            </div>
        </div>

    )
}