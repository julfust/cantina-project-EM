import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Button } from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const RecipeForm = ({type}) => {
    
    const { recipeId } = useParams();
    let history = useHistory();

    const [formData, setFormData] = useState({
        titre: "", 
        description: "", 
        photo: "",
        niveau: "padawan",
        personnes: 1,
        tempsPreparation: 1,
        ingredients: [{id: uuidv4(), quantity: 1, unity: "", name: ""}],
        etapes: [{id: uuidv4(), content: ""}]
    })

    useEffect(() => {

        if(recipeId) {
            axios.get(
                `http://localhost:9000/api/recipe/${recipeId}`
            )
            .then(res => {
                
                const ingredients = res.data.ingredients.map((ingredient) => {
                    return {
                        id: uuidv4(), 
                        quantity: ingredient[0] !== "" ? parseInt(ingredient[0].replace(/[A-Za-z]/g, "").replace("½", "1")) : 1,
                        unity: ingredient[0].replace("½", "").replace(/[0-9.]/g, ""), 
                        name: ingredient[1]
                    }
                });

                const etapes = res.data.etapes.map((etape) => {
                    return {id: uuidv4(), content: etape}
                });

                setFormData({
                    titre: res.data.titre, 
                    description: res.data.description, 
                    photo: res.data.photo,
                    niveau: res.data.niveau,
                    personnes: res.data.personnes,
                    tempsPreparation: res.data.tempsPreparation,
                    ingredients: ingredients,
                    etapes: etapes
                })
            });
        }
    }, [recipeId])

    const handleSubmitForm = (e) => {
        e.preventDefault();

        console.log("Debug");
        
        const titre = formData.titre;
        const description = formData.description;
        const niveau = formData.niveau;
        const personnes = formData.personnes;
        const tempsPreparation = formData.tempsPreparation;
        const photo = formData.photo;
        const ingredients = formData.ingredients.map((ingredient) => [ingredient.quantity + "" + ingredient.unity, ingredient.name]);
        const etapes = formData.etapes.map((etape) => etape.content);

        if(type === "create")
        {
            axios.post("http://localhost:9000/api/recipes", {
                titre,
                description,
                niveau,
                personnes,
                tempsPreparation,
                ingredients,
                etapes,
                photo
            })
            .then(() => {
                setFormData({
                    titre: "", 
                    description: "", 
                    photo: "",
                    niveau: "padawan",
                    personnes: 1,
                    tempsPreparation: 5,
                    ingredients: [{id: uuidv4(), quantity: 1, unity: "", name: ""}],
                    etapes: [{id: uuidv4(), content: ""}]
                })
                
                history.push("/");
            })
            .catch((err) => console.log(err))

            return;
        }

        axios.put(`http://localhost:9000/api/recipe/${recipeId}`, {
            titre,
            description,
            niveau,
            personnes,
            tempsPreparation,
            ingredients,
            etapes,
            photo
        })
        .then((res) => {
            history.push("/");
        })
        .catch((err) => console.log(err))
    }

    const addIngredient = () => {

        let ingredients = [...formData.ingredients];
        ingredients.push({id: uuidv4(), quantity: 1, unity: "", name: ""});

        setFormData({...formData, ingredients});
    }

    const modifieIngredient = (ingredientData) => {

        let ingredients = [...formData.ingredients];
        const indexTarget = ingredients.findIndex(ingredient => ingredient.id === ingredientData.id);

        ingredients[indexTarget] = ingredientData;

        setFormData({...formData, ingredients});
    }

    const deleteIngredient = (deletedIngredientId) => {

        if(formData.ingredients.length === 1) {
            return;
        }
        
        let ingredients = [...formData.ingredients];
        const indexTarget = ingredients.findIndex(ingredient => ingredient.id === deletedIngredientId);
        
        ingredients.splice(indexTarget, 1);

        setFormData({...formData, ingredients});
    }

    const addStep = () => {

        let etapes = [...formData.etapes];
        etapes.push({id: uuidv4(), content: ""});

        setFormData({...formData, etapes});
    }

    const modifieStep = (stepData) => {

        let etapes = [...formData.etapes];
        const indexTarget = etapes.findIndex(step => step.id === stepData.id);

        etapes[indexTarget] = stepData;

        setFormData({...formData, etapes});
    }

    const deleteStep = (deletedStepId) => {

        if(formData.etapes.length === 1) {
            return;
        }

        let etapes = [...formData.etapes];
        const indexTarget = etapes.findIndex(step => step.id === deletedStepId);

        etapes.splice(indexTarget, 1);

        setFormData({...formData, etapes});
    }

    return (
        <div className="recipe-form">
            <h1 className="form-title">{type === "create" ? "Création d'une recette" : "Modification d'une recette"}</h1>

            <form onSubmit={(e) => handleSubmitForm(e)} className="main-form">

                <div className="form-section">

                    <input
                        value={formData.titre}
                        type="text"
                        required="required"
                        placeholder="titre"
                        className="main-form-input"
                        onChange={(e) => {
                            const titre = e.target.value;

                            setFormData({...formData, titre});
                        }} />

                    <input
                        value={formData.description}
                        type="text"
                        required="required"
                        placeholder="description" 
                        className="main-form-input"
                        onChange={(e) => {
                            const description = e.target.value;
                            
                            setFormData({...formData, description});
                        }} />

                    <input
                        value={formData.photo}
                        type="text"
                        pattern="(http|https)://.+"
                        title="Url commencant par http:// ou https://"
                        placeholder="photo" 
                        className="main-form-input"
                        onChange={(e) => {
                            const photo = e.target.value;
                            
                            setFormData({...formData, photo});
                        }} />
                    
                </div>

                <div className="form-section">

                    <h2 className="form-section-title">Niveau de difficulté:</h2>

                    <select
                        value={formData.niveau}
                        name="difficulty-level" 
                        className="main-form-input"
                        onChange={(e) => {
                            const niveau = e.target.value;
                            
                            setFormData({...formData, niveau});
                        }}>
                        <option value="padawan">padawan</option>
                        <option value="jedi">jedi</option>
                        <option value="maitre">maitre</option>
                    </select>
                </div>

                <div className="form-section">

                    <h2 className="form-section-title">Nombre de personne:</h2>
                    <input
                        value={formData.personnes}
                        type="number" 
                        min="1" 
                        placeholder="1" 
                        className="main-form-input"
                        onChange={(e) => {
                            const personnes = +e.target.value;
                            
                            setFormData({...formData, personnes});
                        }} />
                </div>

                <div className="form-section">

                    <h2 className="form-section-title">Temps de préparation: {formData.tempsPreparation} min</h2>
                    <input
                        value={formData.tempsPreparation}
                        type="range" 
                        min="1" 
                        max="120" 
                        className="range-input" 
                        onChange={(e) => {
                            const tempsPreparation = +e.target.value;

                            setFormData({...formData, tempsPreparation});
                        }} />
                </div>

                <div className="form-section">

                    <h2 className="form-section-title">Ingrédients:</h2>

                    {formData.ingredients.map((ingredient) => (
                        
                        <div key={ingredient.id} className="ingredient-input-container">

                            <input
                                value={ingredient.quantity}
                                type="number" 
                                min="1" 
                                placeholder="1" 
                                className="ingredient-input ingredient-number"
                                onChange={(e) => {
                                    const ingredientData = {
                                        id: ingredient.id,
                                        quantity: +e.target.value,
                                        unity: ingredient.unity,
                                        name: ingredient.name
                                    };

                                    modifieIngredient(ingredientData);
                                }} />

                            <input
                                value={ingredient.unity}
                                type="text"
                                placeholder="unité"
                                className="ingredient-input ingredient-name"
                                onChange={(e) => {
                                    const ingredientData = {
                                        id: ingredient.id,
                                        quantity: ingredient.quantity,
                                        unity: e.target.value,
                                        name: ingredient.name
                                    };

                                    modifieIngredient(ingredientData);
                                }} />

                            <input
                                value={ingredient.name}
                                type="text"
                                required="required"
                                placeholder="nom" 
                                className="ingredient-input ingredient-name"
                                onChange={(e) => {
                                    const ingredientData = {
                                        id: ingredient.id,
                                        quantity: ingredient.quantity,
                                        unity: ingredient.unity,
                                        name: e.target.value
                                    };

                                    modifieIngredient(ingredientData);
                                }} />

                            <Button onClick={(e) => deleteIngredient(ingredient.id)} className="delete-control-button"><CloseOutlined /></Button>
                        </div>
                    ))}

                    <Button onClick={(e) => addIngredient()} className="add-control-button"><PlusOutlined /> Ajouter un ingrédient</Button>
                </div>

                <div className="form-section step-section">

                    <h2 className="form-section-title">Liste d'étapes:</h2>

                    {formData.etapes.map((step) => (
                        <div key={step.id} className="step-input-container">
                            <textarea
                                value={step.content}
                                required="required"
                                name="step-input" 
                                className="main-form-input step-input"
                                onChange={(e) => {
                                    const stepData = {
                                        id: step.id,
                                        content: e.target.value
                                    }

                                    modifieStep(stepData);
                                }}>
                            </textarea>
                            <Button onClick={(e) => deleteStep(step.id)} className="delete-control-button"><CloseOutlined /></Button>
                        </div>
                    ))}

                    <Button onClick={(e) => addStep()} className="add-control-button"><PlusOutlined /> Ajouter un ingrédient</Button>
                </div>

                <input type="submit" className="main-form-submit" />
            </form>
        </div>
    );
};

export default RecipeForm;