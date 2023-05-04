import React from "react";
import cart from "../static files/carts.png"

export default function Cart(props) {

    return (

        <div className="queue--cart">
            <div className="cart--quantity">{props.items > 0 ? props.items : ""}</div>
            <img className="cart--cart"src={cart} alt="Cart" />
        </div>

    )
}