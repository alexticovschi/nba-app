import React, { Component } from 'react';
import styles from './layout.css';
import Header from '../../components/Header/header';
import Footer from "../../components/Footer/footer";


class Layout extends Component {
    state = {
        showNav: false
    }

    toggleSidenav = (action) => {
        this.setState({
            showNav: action
        })
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Header
                    user={this.props.user}
                    showNav={this.state.showNav}
                    onHideNav={() => this.toggleSidenav(false)}
                    onOpenNav={() => this.toggleSidenav(true)}
                />
                {this.props.children}
                <Footer/> 
            </div>
        )
    }
}


export default Layout;