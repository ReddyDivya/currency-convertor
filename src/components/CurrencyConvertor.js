import axios from 'axios';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import React, { useEffect, useState } from 'react';
import Dropdown from './DropDown';

export default function CurrencyConvertor() {

    const [fromCurrency, setFromCurrency] = useState();//FromCurrency
    const [toCurrency, setToCurrency] = useState();//ToCurrency
    const [fromSelectedCurrency, setFromSelectedCurrency] = useState("USD");//fromSelectedCurrency
    const [toSelectedCurrency, setToSelectedCurrency] = useState("INR");//toSeletedCurrency
    const [options, setOptions] = useState([]);//options for dropdown

    //getting Currencies list and filling in the From & To currencies dropdowns
    useEffect(() => {
        axios.get(`https://api.exchangerate.host/symbols`)
            .then(response => response.data)
            .then(data => setOptions(Object.keys(data.symbols)))
    }, []);

    //getting results while changing from currency input field
    useEffect(() => {
        if (!toCurrency && fromCurrency !== "")
            Convert(fromSelectedCurrency, toSelectedCurrency, fromCurrency, setToCurrency);

        return;
    }, [fromCurrency, toCurrency]);

    //getting results while changing to currency input field
    useEffect(() => {
        if (!fromCurrency && toCurrency !== "")
            Convert(toSelectedCurrency, fromSelectedCurrency, toCurrency, setFromCurrency);
        return;
    }, [fromCurrency, toCurrency]);

    //getting results while changing fromSelectedCurrency field
    useEffect(() => {
        Convert(fromSelectedCurrency, toSelectedCurrency, fromCurrency, setToCurrency);
        return;
    }, [fromSelectedCurrency]);

    //getting results while changing toSelectedCurrency field
    useEffect(() => {
        Convert(fromSelectedCurrency, toSelectedCurrency, fromCurrency, setToCurrency);
        return;
    }, [toSelectedCurrency]);

    const Convert = (vFromCurrency, vToCurrency, vAmount, setResultField) => {
        axios.get(`https://api.exchangerate.host/convert?from=${vFromCurrency}&to=${vToCurrency}&amount=${vAmount}`)
            .then((response) => response)
            .then((data) => { console.log(data.data.result); setResultField(data.data.result != null ? data.data.result.toFixed(2) : '') })
    }

    //currency list in To and From
    const handleCurrencyList = (e) => {

        if (e.target.name == "ToCList") {
            setToSelectedCurrency(e.target.value);
        }
        else if (e.target.name == "FromCList") {
            setFromSelectedCurrency(e.target.value);
        }
    }

    return (
        <div className="w-full h-screen bg-gradient-to-b from-pink-500 to-yellow-500 font-mono">
            <div className="p-6">
                <h1 className="text-3xl m-10 underline font-bold text-white text-center">Currency Convertor</h1>
                <div className="flex items-center w-3/4 border-b border-teal-500 py-2 m-20">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" required
                        value={fromCurrency} onChange={(e) => { setFromCurrency(e.target.value); setToCurrency(""); }} />

                    <Dropdown name="FromCList" options={options} selectedValue={fromSelectedCurrency} currencyList={handleCurrencyList} />
                </div>
                <div className="flex items-center w-3/4 border-b border-teal-500 py-2 m-20">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" required
                        value={toCurrency} onChange={(e) => { setToCurrency(e.target.value); setFromCurrency(""); }} />

                    <Dropdown name="ToCList" options={options} selectedValue={toSelectedCurrency} currencyList={handleCurrencyList} />
                </div>
            </div>
        </div >
    )
}