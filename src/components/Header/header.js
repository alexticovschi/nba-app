import React from 'react';
import style from './header.css';
import { Link } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';
import SideNav from './SideNav/sideNav';

const Header = (props) => {
    //console.log('from header',props.user);
    const navBars = () => {
        return (
            <div className={style.bars}>
                <FontAwesome name="bars" 
                    onClick={props.onOpenNav}
                    style={{
                        color: '#dfdfdf',
                        padding: '10px',
                        fontSize: '20px',
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
            {/* pass Header components props to SideNav */}
            <SideNav {...props}/>
            <div className={style.headerOptions}>
                {navBars()}
                {logo()}
            </div>
        </header>
    )
}


export default Header; 