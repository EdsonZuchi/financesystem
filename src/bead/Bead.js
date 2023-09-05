import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Bead.css';
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
            <div className="bead-container bg-light">
                <div className="bead-build bg-light">
                    <div className="bead-div-button">
                        <button type="button" className="btn btn-primary bead-button">New bead</button>
                    </div>
                    <div className="bead-selector">
                        <div className="bead-selector-date">
                            <BsFillCalendarFill/>
                            <label className="bead-text-selector">Select month and year:</label>
                            <div className="input-group bead-select-group">
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm" 
                                    id="seletorDate" 
                                    placeholder="MM/AAAA" 
                                    value={dateSelect}
                                    onChange={(event) => setDateSelect(event.target.value)}
                                />
                                <button className="btn btn-outline-secondary btn-sm" type="button" id="btnData" onClick={selectDate}>Select</button>
                            </div>
                        </div>
                        <div className="bead-month-total">
                            <label>Total in the month: R$&nbsp;</label>
                            <label id="value-final-month">{valueAmount}</label>
                        </div>
                    </div>
                    <div className="bead-table">
                        <table className="table table-striped table-hover">
                            <thead className="thead-fixo">
                                <tr>
                                    <th className="table-left">Title</th>
                                    <th className="table-left">Installment</th>
                                    <th className="table-left">Date</th>
                                    <th className="table-right">Value</th>
                                </tr>
                            </thead>
                            <tbody id="bead-tbody">
                                {tableData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="table-left">{item.bead.title}</td>
                                        <td className="table-left">{item.installment}</td>
                                        <td className="table-left">{mask(new Date(item.referenceDate))}</td>
                                        <td className="table-right">{format(item.value)}</td>
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