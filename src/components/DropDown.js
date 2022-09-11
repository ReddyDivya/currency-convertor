import React from 'react'

export default function DropDown(props) {


    return (
        <select name={props.name} className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" onChange={props.currencyList} value={props.selectedValue}>
            {
                props.options.map(currency => <option key={currency} value={currency} className="text-black">{currency}</option>)
            }
        </select>

    )
}
