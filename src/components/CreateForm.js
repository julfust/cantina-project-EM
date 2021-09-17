import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const CreateForm = () => {
    
    const [formData, setFormData] = useState({
        name: "", 
        description: "", 
        photo: "",
        difficulty: "padawan",
        numberPerson: 1,
        coockTime: 5,
        ingredients: [{id: uuidv4(), quantity: 1, unity: "", name: ""}],
        steps: [{id: uuidv4(), content: ""}]
    })

    const handleSubmitForm = (e) => {
        e.preventDefault();

        console.log(e.target.value);
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

        let steps = [...formData.steps];
        steps.push({id: uuidv4(), content: ""});

        setFormData({...formData, steps});
    }

    const modifieStep = (stepData) => {

        let steps = [...formData.steps];
        const indexTarget = steps.findIndex(step => step.id === stepData.id);

        steps[indexTarget] = stepData;

        setFormData({...formData, steps});
    }

    const deleteStep = (deletedStepId) => {

        if(formData.steps.length === 1) {
            return;
        }

        let steps = [...formData.steps];
        const indexTarget = steps.findIndex(step => step.id === deletedStepId);

        steps.splice(indexTarget, 1);

        setFormData({...formData, steps});
    }

    return (
        <div className="create-form">
            <h1 className="form-title">Création d'une recette</h1>

            <form onSubmit={(e) => handleSubmitForm(e)} className="main-form">

                <div className="form-section">

                    <input
                        value={formData.name}
                        type="text"
                        placeholder="nom" 
                        className="main-form-input"
                        onChange={(e) => {
                            const name = e.target.value;

                            setFormData({...formData, name});
                        }} />
                    <input
                        value={formData.description}
                        type="text" 
                        placeholder="description" 
                        className="main-form-input"
                        onChange={(e) => {
                            const description = e.target.value;
                            
                            setFormData({...formData, description});
                        }} />
                    <input
                        value={formData.photo}
                        type="text" 
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
                        value={formData.difficulty}
                        name="difficulty-level" 
                        className="main-form-input"
                        onChange={(e) => {
                            const difficulty = e.target.value;
                            
                            setFormData({...formData, difficulty});
                        }}>
                        <option value="padawan">padawan</option>
                        <option value="jedi">jedi</option>
                        <option value="maitre">maitre</option>
                    </select>
                </div>

                <div className="form-section">

                    <h2 className="form-section-title">Nombre de personne:</h2>
                    <input
                        value={formData.numberPerson}
                        type="number" 
                        min="1" 
                        placeholder="1" 
                        className="main-form-input"
                        onChange={(e) => {
                            const numberPerson = +e.target.value;
                            
                            setFormData({...formData, numberPerson});
                        }} />
                </div>

                <div className="form-section">

                    <h2 className="form-section-title">Temps de préparation: {formData.coockTime} min</h2>
                    <input
                        value={formData.coockTime}
                        type="range" 
                        min="5" 
                        max="120" 
                        className="range-input" 
                        onChange={(e) => {
                            const coockTime = +e.target.value;

                            setFormData({...formData, coockTime});
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

                            <select
                                value={ingredient.unity} 
                                name="ingredient-unity" 
                                className="ingredient-input ingredient-unity"
                                onChange={(e) => {
                                    const ingredientData = {
                                        id: ingredient.id,
                                        quantity: ingredient.quantity,
                                        unity: e.target.value,
                                        name: ingredient.name
                                    };

                                    modifieIngredient(ingredientData);
                                }}>
                                <option value=""></option>
                                <option value="cl">cl</option>
                                <option value="mg">mg</option>
                            </select>

                            <input
                                value={ingredient.name}
                                type="text" 
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

                    {formData.steps.map((step) => (
                        <div key={step.id} className="step-input-container">
                            <textarea
                                value={step.content}
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

export default CreateForm;