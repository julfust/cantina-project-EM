import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import RecipeForm from '../components/RecipeForm';

const Edit = () => {
    return (
        <div className="edit">
            <Logo />
            <Navigation />
            <RecipeForm type={"update"} />
        </div>
    );
};

export default Edit;