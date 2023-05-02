import React from "react";
import Cart from "./cart";

export default function Queue(props) {

    const renderCart = props.cart.map(items => 
        <Cart
            items={items}
    />)

    return (
        
        <div>
            {renderCart}
        </div>

    )
}