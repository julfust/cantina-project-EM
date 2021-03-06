import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import RecipeForm from '../components/RecipeForm';

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