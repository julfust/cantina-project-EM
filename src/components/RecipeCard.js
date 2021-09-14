import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const RecipeCard = ({ recipe }) => {

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
                    <EditOutlined key="edit" />,
                    <DeleteOutlined key="delete" />,
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