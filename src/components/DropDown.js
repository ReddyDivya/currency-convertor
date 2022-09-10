import React, { useState } from 'react'

export default function DropDown(props) {


    return (
        <select name={props.name} className="m-4 font-bold border-2 border-gray-800 text-black" onChange={props.currencyList} value={props.selectedValue}>
            {
                props.options.map(currency => <option key={currency} value={currency} className="text-black">{currency}</option>)
            }
        </select>

    )
}
