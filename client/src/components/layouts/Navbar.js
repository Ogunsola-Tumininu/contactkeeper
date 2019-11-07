import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/Contact/contactContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { logout, user, isAuthenticated } = authContext;
    const { clearContacts } = contactContext

    const onLogout = () => {
        logout();
        clearContacts()
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout </span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /><Link to="/">{title}</Link>
            </h1>

            <ul>
                {isAuthenticated ? authLinks : guestLinks}
                <li><Link to="/about">About </Link></li>
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Contact keeper',
    icon: 'fas fa-id-card-alt'
}
export default Navbar