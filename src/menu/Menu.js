import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css'
import SideBar from '../sidenav/SideNav'

export default function (props){
    return (
        <div className="Menu-container">
            {<SideBar />}
        </div>
    )
}