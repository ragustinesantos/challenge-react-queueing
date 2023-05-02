import React from "react";

export default function Cart(props) {

    return (

        <div className="queue--cart">
            {props.items > 0 ? props.items : ""}
        </div>

    )
}