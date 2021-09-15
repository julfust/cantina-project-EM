import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const RecipeDetail = () => {

    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {

        axios.get(
            `http://localhost:9000/api/recipe/${recipeId}`
        )
        .then(res => setRecipe(res.data));
    }, [])
    
    return (
        <>
            {recipe && (
                <div className="recipe-detail">
                    <header>
                        <h1 className="recipe-title">{recipe.titre}</h1>
                        <p className="recipe-subtitle"><em>{recipe.description}</em></p>
                        <hr className="header-division" />
                    </header>

                    <section className="recipe-informations">

                        <article className="recipe-main">
                            
                            <div className="img-container">
                                <img src={recipe.photo} alt="Plat" />
                            </div>

                            <div className="step-section">

                                <h2 className="step-section-title">Etapes</h2>

                                <ol className="step-list">
                                    {recipe.etapes.map((step) => (
                                        <li className="step">{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </article>

                        <aside className="recipe-secondary">

                            <div className="button-container">
                                <Button className="update-button modify-button"><EditOutlined /> Modifier</Button>
                                <Button className="update-button delete-button"><DeleteOutlined /> Supprimer</Button>
                            </div>

                            <p className="aside-rubrique">Niveau : {recipe.niveau}</p>

                            <p className="aside-rubrique">Nombre de personnes : {recipe.personnes}</p>

                            <p className="aside-rubrique">Temps de préparation : {recipe.tempsPreparation} min</p>

                            <div className="ingredient-rubrique">
                                <h3 className="ingredient-rubrique-title">Ingredients :</h3>
                                
                                <ul className="ingredient-list">
                                    
                                    {recipe.ingredients.map((ingredient) => (
                                        <li className="ingredient">{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </section>
                </div>
            )}
        </>
    );
};

export default RecipeDetail;