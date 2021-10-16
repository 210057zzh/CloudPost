import './css/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Posts from './components/Posts'
import MakePosts from './components/MakePost';
import ContextProvider from './components/contexts/authContext'

function App() {

  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Posts}></Route>
            <Route exact path='/MakePost' component={MakePosts}></Route>
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
