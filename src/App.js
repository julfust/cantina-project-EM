import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Create from './pages/Create';
import Edit from './pages/Edit';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/detail/:recipeId" exact component={Detail} />
          <Route path="/create" exact component={Create} />
          <Route path="/edit/:recipeId" exact component={Edit} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
