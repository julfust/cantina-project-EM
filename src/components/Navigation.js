import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            <NavLink exact to="/add" activeClassName="nav-active">
                Ajout
            </NavLink>
            <NavLink exact to="/update" activeClassName="nav-active">
                Modification
            </NavLink>
        </div>
    );
};

export default Navigation;