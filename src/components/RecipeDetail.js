import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const RecipeDetail = () => {

    const { recipeId } = useParams();
    let history = useHistory();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {

        axios.get(
            `http://localhost:9000/api/recipe/${recipeId}`
        )
        .then(res => setRecipe(res.data));
    }, [recipeId])

    const deleteRecipe = () => {

        if(window.confirm("Cette opération supprimera la recette de facon définitive. Etes-vous sûrs de vouloir faire ceci ?"))
        {

            axios.delete(
                `http://localhost:9000/api/recipe/${recipeId}`
            )
            .then((res) => history.push("/"))
            .catch((err) => console.log(err));
        }
    }
    
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
                                        <li className="step" key={uuidv4()}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </article>

                        <aside className="recipe-secondary">

                            <div className="button-container">
                                <NavLink to={`/edit/${recipeId}`}><Button className="update-button modify-button"><EditOutlined /> Modifier</Button></NavLink>
                                <Button className="update-button delete-button" onClick={(e) => deleteRecipe()}><DeleteOutlined /> Supprimer</Button>
                            </div>

                            <p className="aside-rubrique">Niveau : {recipe.niveau}</p>

                            <p className="aside-rubrique">Nombre de personnes : {recipe.personnes}</p>

                            <p className="aside-rubrique">Temps de préparation : {recipe.tempsPreparation} min</p>

                            <div className="ingredient-rubrique">
                                <h3 className="ingredient-rubrique-title">Ingredients :</h3>
                                
                                <ul className="ingredient-list">
                                    
                                    {recipe.ingredients.map((ingredient) => (
                                        <li className="ingredient" key={uuidv4()}>{`${ingredient[0] !== "" ? ingredient[0] + " " : ""}` + ingredient[1]}</li>
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