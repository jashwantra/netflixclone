import React, { useEffect, useState } from "react";
import './Nav.css';

function Nav() {
    const [show, handleShow] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY>100){
                handleShow(true);
            } else{
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll", ()=>{;});
        };
    },[]);
    return (<div className={`nav ${show && "nav_black"}`}>
        <img
            className="nav_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png"
            alt="netflix-logo" />
        <img 
        className="nav_avatar"
        src="https://lh3.googleusercontent.com/a/AAcHTtc2_mqeL1VoTiawtHJKxiAd2D-suorEydalBP4nK3T1=s96-c-rg-br100" 
        alt="netflix-avatar" />
    </div>);
}
export default Nav;