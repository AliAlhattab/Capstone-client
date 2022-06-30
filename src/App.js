import './Apps.scss';
import SignupPage from './pages/SignupPage';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route path='/' exact component={Homepage}/>
        <Route path='/signup' component={SignupPage}/>
        <Route path='/login' component={LoginPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
