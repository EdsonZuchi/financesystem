import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate} from "react-router-dom";
import { BsXSquare } from 'react-icons/bs';
import { BsFolderFill } from 'react-icons/bs';
import './SideNav.css'


const SideNav = (props) => {

    const ClearLocalStorage = (event) => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className='d-flex flex-column flex-shrink-0 bg-light p-3 side-bar'>
            <a className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none cursor-pointer'>
                Finance System
            </a>
            <hr></hr>
            <ul className='nav nav-pills flex-column mb-auto side-bar-ul-list'>
                <li className='nav-item side-bar-li-list cursor-pointer'>
                    <a className='nav-link bar-black' aria-current='page'>
                        <BsFolderFill/>
                        <span className='side-bar-list-margin'></span>
                        <span>Beads</span>
                    </a>
                </li>
            </ul>
            <hr></hr>
            <div className='dropdown side-user'>
                <label>{localStorage.getItem("username").toUpperCase()}</label>
                <BsXSquare className='cursor-pointer side-rigth' title='Close' onClick={ClearLocalStorage}/>
            </div>
        </div>
    );
};

export default SideNav;