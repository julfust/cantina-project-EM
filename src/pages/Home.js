import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import RecipeList from '../components/RecipeList';

const Home = () => {

    return ( 
        <div className="home">
          <Logo />
          <Navigation />
          <RecipeList />
        </div>
    );
}
 
export default Home;