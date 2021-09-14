import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';

const RecipeList = () => {

    const [recipes, setRecipes] = useState(null);

    useEffect(() => {

        axios.get(
            'http://localhost:9000/api/recipes'
        )
        .then(res => setRecipes(res.data));
    }, []);

    return (
        <div className="recipe-list">
            
            {recipes ? (
                <div className="list-container">
                    {recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe.id} />
                    ))}
                </div>
            ) : (
                <div className="loading-view">Chargement...</div>
            )}
        </div>
    );
};

export default RecipeList;