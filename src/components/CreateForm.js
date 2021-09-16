import React, { useState } from 'react';
import { Button } from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const CreateForm = () => {
    
    const [coockTime, setCoockTime] = useState(5);

    return (
        <div className="create-form">
            <h1 className="form-title">Création d'une recette</h1>

            <form className="main-form">

                <div className="form-section">

                    <input type="text" placeholder="nom" className="main-form-input" />
                    <input type="text" placeholder="description" className="main-form-input" />
                    <input type="text" placeholder="photo" className="main-form-input" />
                </div>

                <div className="form-section">

                    <h2 className="form-section-title">Niveau de difficulté:</h2>

                    <select name="difficulty-level" className="main-form-input">
                        <option value="padawan">padawan</option>
                        <option value="jedi">jedi</option>
                        <option value="maitre">maitre</option>
                    </select>
                </div>

                <div className="form-section">

                    <h2 className="form-section-title">Nombre de personne:</h2>
                    <input type="number" min="1" placeholder="1" className="main-form-input" />
                </div>

                <div className="form-section">

                    <h2 className="form-section-title">Temps de préparation: {coockTime} min</h2>
                    <input
                        value={coockTime}
                        type="range" 
                        min="5" 
                        max="120" 
                        className="range-input" 
                        onChange={(e) => setCoockTime(e.target.value)} />
                </div>

                <div className="form-section">

                    <h2 className="form-section-title">Ingrédients:</h2>
                    <div className="ingredient-input-container">

                        <input type="number" min="1" placeholder="1" className="ingredient-input ingredient-number" />

                        <select name="ingredient-unity" className="ingredient-input ingredient-unity">
                            <option value="cl">cl</option>
                            <option value="mg">mg</option>
                            <option value=""></option>
                        </select>

                        <input type="text" placeholder="nom" className="ingredient-input ingredient-name" />

                        <Button className="delete-control-button"><CloseOutlined /></Button>
                    </div>

                    <Button className="add-control-button"><PlusOutlined /> Ajouter un ingrédient</Button>
                </div>

                <div className="form-section step-section">

                    <h2 className="form-section-title">Liste d'étapes:</h2>

                    <div className="step-input-container">
                        <textarea name="step-input" className="main-form-input step-input"></textarea>
                        <Button className="delete-control-button"><CloseOutlined /></Button>
                    </div>

                    <Button className="add-control-button"><PlusOutlined /> Ajouter un ingrédient</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateForm;