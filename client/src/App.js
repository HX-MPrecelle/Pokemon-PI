import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import Detail from './components/Detail/Detail';
import Error404 from './components/Error404/Error404';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/create' component={PokemonCreate} />
      <Route exact path='/pokemon/:id' component={Detail} />
      <Route path='*' component={Error404}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
