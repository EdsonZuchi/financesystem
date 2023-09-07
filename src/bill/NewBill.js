import React, { useState } from "react";
import axios from "axios";
import './NewBill.css';
import {BsX} from 'react-icons/bs';

const Newbill = (props) => {
    
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [referenceDate, setReferenceDate] = useState();
    const [value, setValue] = useState();
    const [installments, setInstallments] = useState();

    const clearInputs = () => {
        setTitle();
        setDescription();
        setReferenceDate();
        setValue();
        setInstallments();
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleOpen = () => {
        setShow(true);
    }

    const handleSave = () => {
        axios.post("http://localhost:9090/finance/v1/bill",
        {
            title: title,
            description: description,
            referenceDate: referenceDate, 
            value: value,
            installments: installments,
            user:{
                id: localStorage.getItem("user_id")
            }
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            console.log(response);
            let data = response.data;
            if(data.error == null){
                handleClose();
                clearInputs();
            }else{
                console.log("erro server => "+data.error);
            }
        })
        .catch((error) => {
            console.log("error => "+error);
        })
    }
    
    return (
        <>
            <button 
                type="button" 
                className="btn btn-primary bill-button"
                onClick={handleOpen}>
                New bill
            </button>
            {show && (
                <div className="bill-modal-overlay">
                    <div className="bill-modal-container bg-light">
                        <div className="modal-header bill-modal-header">
                            <h4 className="modal-title">New bill</h4>
                        </div>
                        <div className="bill-modal-body">
                            <div className="bill-body-group">
                                <div className="form-group mt-2">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control mt-1"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div className="bill-body-group">
                                <div className="form-group mt-2">
                                    <label>Date reference</label>
                                    <input
                                        type="date"
                                        className="form-control mt-1"
                                        placeholder="Enter date"
                                        value={referenceDate}
                                        onChange={(event) => setReferenceDate(event.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Value</label>
                                    <input
                                        type="number"
                                        className="form-control mt-1"
                                        placeholder="Enter value"
                                        value={value}
                                        onChange={(event) => setValue(event.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Installments</label>
                                    <input
                                        type="number"
                                        className="form-control mt-1"
                                        placeholder="Enter installments"
                                        value={installments}
                                        onChange={(event) => setInstallments(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bill-modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleSave}>
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}>
                                Close    
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Newbill;