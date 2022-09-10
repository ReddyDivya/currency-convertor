import axios from 'axios';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import React, { useEffect, useState } from 'react';
import Dropdown from './DropDown';

export default function CurrencyConvertor() {

    const [amount, setAmount] = useState(0);//amount
    const [fromCurrency, setFromCurrency] = useState("USD");//fromCurrency
    const [toCurrency, setToCurrency] = useState("INR");//toCurrency
    const [options, setOptions] = useState([]);//options for dropdown
    const [result, setResult] = useState(0);//Result

    //getting Currencies list and filling in the From & To currencies dropdowns
    useEffect(() => {
        axios.get(`https://api.exchangerate.host/symbols`)
            .then(response => response.data)
            .then(data => setOptions(Object.keys(data.symbols)))
    }, []);

    //getting results while changing from and to curriencies
    useEffect(() => {
        Convert();
    }, [fromCurrency, toCurrency]);

    const Convert = () => {

        //validating
        if (toCurrency == fromCurrency) {
            alert("Change your converted currency");
            return false;
        }
        else {
            getResult();
        }
    }

    //get result
    const getResult = () => {
        console.log(`https://v6.exchangerate-api.com/v6/6f8a08216183e273ab7f380e/pair/${fromCurrency}/${toCurrency}/${amount}`)
        axios.get(`https://v6.exchangerate-api.com/v6/6f8a08216183e273ab7f380e/pair/${fromCurrency}/${toCurrency}/${amount}`)
            .then((response) => response.data)
            .then(data => setResult(data.conversion_result))
    }

    //console.log('result ' + result)
    const flip = () => {
        var temp = fromCurrency;
        setToCurrency(temp);
        setFromCurrency(toCurrency);
    }

    //currency list in To and From
    const handleCurrencyList = (e) => {

        if (e.target.name == "ToCList") {
            setToCurrency(e.target.value);
        }
        else if (e.target.name == "FromCList") {
            setFromCurrency(e.target.value);
        }
    }

    return (
        <div className="border-2 border-gray-600 rounded p-4 w-30 h-50 ">

            <h1 className="text-3xl font-bold underline">Currency Convertor</h1>
            <div>
                Amount : <input type="number"
                    className="border-2 border-solid m-4 text-black" required
                    placeholder="Enter the amount" onChange={(e) => { setAmount(e.target.value); }} onBlur={getResult} />
                From : <Dropdown name="FromCList" options={options} selectedValue={fromCurrency} currencyList={handleCurrencyList} />
                <CompareArrowsIcon onClick={flip} className="m-4 ml-70" />
                To : <Dropdown name="ToCList" options={options} selectedValue={toCurrency} currencyList={handleCurrencyList} />
            </div>
            <div>
                {
                    ((toCurrency != fromCurrency) && result) ? <h3 className="font-bold text-3xl "><span className="text-sky-400">{amount} {fromCurrency}</span> to <span className="text-sky-400">{result} {toCurrency}</span></h3> : ""
                }
            </div>
        </div>
    )
}