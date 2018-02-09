import React from 'react';
import SideNav from 'react-simple-sidenav';


const SideNavigation = (props) => {
    return (
        <div>
            <SideNav
                showNav={props.showNav}
                onHideNav={props.onHideNav}
                navStyle={{
                    background: '#242424',
                    maxWidth: '220px'
                }}
            >
                Menu Options
            </SideNav>
        </div>
    )
}

export default SideNavigation;