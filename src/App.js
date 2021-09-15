import Home from './pages/Home';
import Detail from './pages/Detail';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/detail" exact component={Detail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
