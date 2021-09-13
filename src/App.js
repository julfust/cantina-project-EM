import './App.css';
import { useState, useEffect } from 'react'

function App() {

  const [recettes, setRecettes] = useState(null);

  useEffect(() => {
    fetch('http://localhost:9000/api/recipes')
    .then(res => res.json())
    .then(recipes => {
      setRecettes(recipes);
    })
  }, []);

  return (
    <div className="App">
      <h1>Liste des recettes</h1>

      {recettes && recettes.map(recette => <p key={recette.id}>{recette.titre}</p>)}
    </div>
  );
}

export default App;
