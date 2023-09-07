import React, { useState } from "react";
import axios from "axios";
import './Menu.css'
import SideBar from '../sidenav/SideNav'

export default function (props){
    return (
        <div className="Menu-container">
            {<SideBar />}
        </div>
    )
}