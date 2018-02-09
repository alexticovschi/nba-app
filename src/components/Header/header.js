import React from 'react';
import style from './header.css';
import { Link } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';


const Header = () => {

    const navBars = () => {
        return (
            <div className={style.bars}>
                <FontAwesome name="bars" 
                    style={{
                        color: '#dfdfdf',
                        padding: '10px',
                        cursor: 'pointer'
                    }}
                />
            </div>
        )
    }
    
    
    const logo = () => {
        return (
            <Link to="/" className={style.logo}>
                <img src="/images/nba_logo.png" alt="nba logo"/>
            </Link>
        )
    }

    return (
        <header className={style.header}>
            <div className={style.headerOptions}>
                {navBars()}
                {logo()}
            </div>
        </header>
    )
}


export default Header; 