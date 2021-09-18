import React from 'react';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const RecipeCard = ({ recipe, mapIndex, deleteRecipe }) => {

    const timeFormat = (time) => {
        if(time >= 60) {
            const hoursNumber = time / 60;
            const minuteNumber = time % 60;

            let formatedTime = `${Math.trunc(hoursNumber)} ${(Math.trunc(hoursNumber) > 1) ? "heures" : "heure"}`;
            
            if(minuteNumber > 1) {
                formatedTime += ` et ${minuteNumber} ${(minuteNumber > 1) ? "minutes" : "minute"}`;
            }

            return formatedTime;
        }

        return `${time} minutes`
    }

    return (
        <Card
            hoverable
            cover={
                <img
                    alt="Plat"
                    src={recipe.photo}
                />
            }
            actions={[
                    <NavLink to={`/detail/${recipe.id}`} key="detail"><EyeOutlined /></NavLink>,
                    <NavLink to={`/edit/${recipe.id}`} key="edit"><EditOutlined /></NavLink>,
                    <DeleteOutlined onClick={(e) => deleteRecipe(recipe.id, mapIndex)} />
                ]}
            className="recipe-card"
            >
            <Meta
                title={<h3>{recipe.titre}</h3>}
                description={
                    <>
                        <p>Niveau de difficulté: {recipe.niveau}</p>
                        <p>Pour {recipe.personnes} { recipe.personnes > 1 ? ("personnes") : ("personne") }</p>
                        <p>Temps de préparation: {timeFormat(recipe.tempsPreparation)}</p>
                    </>
                }
            />
        </Card>
    );
};

export default RecipeCard;