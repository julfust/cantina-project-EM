import React from 'react';
import Logo from '../components/Logo';
import RecipeList from '../components/RecipeList';

const Home = () => {

    return ( 
        <div className="home">
          <Logo />
          <RecipeList />
        </div>
    );
}
 
export default Home;