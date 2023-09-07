import React, { useState } from "react";
import axios from "axios";
import './Bill.css';
import NewBill from './NewBill';
import SideBar from '../sidenav/SideNav';
import { BsFillCalendarFill } from 'react-icons/bs';

function format(number){
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function mask(date){
    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };
    return date.toLocaleString('pt-BR', options);
}

export default function (props){

    let [dateSelect, setDateSelect] = useState("");
    let [valueAmount, setValueAmount] = useState("");
    let [tableData, setTableData] = useState([]);

    const handleInputChange = (event) => {
        const { value }  = event.target;

        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 2) {
            setDateSelect(numericValue);
        } else {
            const month = numericValue.slice(0, 2);
            const year = numericValue.slice(2);
            setDateSelect(`${month}/${year}`);
        }
    }

    const selectDate = () => {
        let arrayDate = dateSelect.split("/"); 
        let month = arrayDate[0];
        let year = arrayDate[1];

        axios.get("http://localhost:9090/finance/v1/launch/"+year+"/"+month)
        .then((response) => {
            let data = response.data;
            if(data.error != null){
                console.log(data.error);
            }else{  
                setTableData(data.launches);
            }
        })
        .catch((error) => {
            console.log(error);
        }); 

        axios.get("http://localhost:9090/finance/v1/launch/"+year+"/"+month+"/total")
        .then((response) => {
            let data = response.data;
            if(data.error != null){
                console.log(data.error);
            }else{  
                setValueAmount(format(data.value));
            }
        })
        .catch((error) => {
            console.log(error);
        }); 
    }

    return (
        <div className="app-container">
            {<SideBar />}
            <div className="bill-container bg-light">

                <div className="bill-build bg-light">
                    <div className="bill-div-button">
                        <NewBill/>
                    </div>
                    <div className="bill-selector">
                        <div className="bill-selector-date">
                            <BsFillCalendarFill/>
                            <label className="bill-text-selector">Select month and year:</label>
                            <div className="input-group bill-select-group">
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm" 
                                    id="seletorDate" 
                                    placeholder="MM/AAAA" 
                                    value={dateSelect}
                                    onChange={handleInputChange}
                                />
                                <button className="btn btn-outline-secondary btn-sm" type="button" id="btnData" onClick={selectDate}>Select</button>
                            </div>
                        </div>
                        <div className="bill-month-total">
                            <label>Total in the month: R$&nbsp;</label>
                            <label id="value-final-month">{valueAmount}</label>
                        </div>
                    </div>
                    <div className="bill-table">
                        <table className="table table-striped table-hover">
                            <thead className="thead-fixo">
                                <tr>
                                    <th className="table-left">Title</th>
                                    <th className="table-left">Installment</th>
                                    <th className="table-left">Date</th>
                                    <th className="table-right">Value</th>
                                </tr>
                            </thead>
                            <tbody id="bill-tbody">
                                {tableData.map((item, index) => (
                                    <tr key={index} title={item.bill.description ? item.bill.description : ""}>
                                        <td className="table-left">{item.bill.title}</td>
                                        <td className="table-left">{item.installment}/{item.bill.installments}</td>
                                        <td className="table-left">{mask(new Date(item.referenceDate))}</td>
                                        <td className="table-right">R$ {format(item.value)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}