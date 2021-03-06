import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';

const RecipeList = () => {

    const [recipes, setRecipes] = useState(null);
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [numberPerson, setNumberPerson] = useState(1);
    const [coockTime, setCoockTime] = useState(1);
    
    const radios = ['padawan', 'jedi', 'maitre'];

    useEffect(() => {

        axios.get(
            'http://localhost:9000/api/recipes'
        )
        .then(res => setRecipes(res.data));
    }, []);

    const deleteRecipe = (recipeId, mapIndex) => {

        if(window.confirm("Cette opération supprimera la recette de facon définitive. Etes-vous sûrs de vouloir faire ceci ?"))
        {

            axios.delete(
                `http://localhost:9000/api/recipe/${recipeId}`
            )
            .then((res) => {
                
                let recipesCopy = [...recipes];

                recipesCopy.splice(mapIndex, 1);

                setRecipes([...recipesCopy]);
            })
            .catch((err) => console.log(err));
        }
    }

    return (
        <div className="recipe-list">
            <div className="sort-container">
                <div className="input-container">
                    <h2 className="input-name">Nom</h2>
                    <input 
                        type="text" 
                        className="search-bar"
                        onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="input-container">
                    <h2 className="input-name">Difficulté</h2>
                    <ul className="radio-list">
                        {radios.map((radio) => {
                            return (
                                <li 
                                    key={radio}
                                    className="input-radio">
                                    <input
                                        type="radio" 
                                        value={radio} 
                                        id={radio} 
                                        checked={radio === difficulty}
                                        onChange={(e) => setDifficulty(e.target.value)} />
                                    <label htmlFor={radio}>{radio}</label>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="input-container">
                    <h2 className="input-name">Nombre de personne</h2>
                        <input
                            value={numberPerson}
                            type="number" 
                            min="1" 
                            className="select-number"
                            onChange={(e) => setNumberPerson(parseInt(e.target.value))} />
                </div>

                <div className="input-container">
                    <h2 className="input-name">Temps de préparation :</h2>

                    <p className="time-coocking">{coockTime} minutes</p>

                    <input
                        value={coockTime}
                        type="range" 
                        min="1" 
                        max="120"
                        className="select-range"
                        onChange={(e) => setCoockTime(parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className="cancel">
                {difficulty && (
                    <h4 onClick={() => setDifficulty("")}>Annuler la recherhe</h4>
                )}
            </div>
            
            {recipes ? (
                <div className="list-container">
                    {recipes
                    .filter((recipe) => recipe.titre.includes(name) && recipe.niveau.includes(difficulty) && recipe.personnes >= numberPerson && recipe.tempsPreparation >= coockTime)
                    .map((recipe, index) => (
                        <RecipeCard recipe={recipe} mapIndex={index} deleteRecipe={deleteRecipe} key={recipe.id} />
                    ))}
                </div>
            ) : (
                <div className="loading-view">Chargement...</div>
            )}
        </div>
    );
};

export default RecipeList;