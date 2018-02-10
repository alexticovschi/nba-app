import React from 'react';
import style from './footer.css';
import { Link } from 'react-router-dom';

import { CURRENT_YEAR } from '../../config';

const Footer = () => {
    return (
        <div className={style.footer}>
            <Link to="/" className={style.logo}>
                <img src="/images/nba_logo.png" alt="nba logo"/>
            </Link>
            <div className={style.right}>
                @NBA {CURRENT_YEAR} All rigths reserved.
            </div>
        </div>
    )
}


export default Footer;
