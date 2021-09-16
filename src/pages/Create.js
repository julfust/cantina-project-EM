import React from 'react';
import CreateForm from '../components/CreateForm';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Create = () => {
    return (
        <div className="create">
            <Logo />
            <Navigation />
            <CreateForm />
        </div>
    );
};

export default Create;