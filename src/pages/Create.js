import React from 'react';
import RecipeForm from '../components/RecipeForm';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Create = () => {
    return (
        <div className="create">
            <Logo />
            <Navigation />
            <RecipeForm type={"create"} />
        </div>
    );
};

export default Create;