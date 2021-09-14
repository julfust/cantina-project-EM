import { useState, useEffect } from 'react'
import Logo from '../components/Logo';

const Home = () => {

    // const [recettes, setRecettes] = useState(null);

    // useEffect(() => {
    //     fetch('http://localhost:9000/api/recipes')
    //     .then(res => res.json())
    //     .then(recipes => {
    //       setRecettes(recipes);
    //     })
    //   }, []);

    return ( 
        <div className="home">
          <Logo />

          {/* {recettes && recettes.map(recette => <p key={recette.id}>{recette.titre}</p>)} */}
        </div>
    );
}
 
export default Home;