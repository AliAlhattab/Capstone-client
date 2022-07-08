import './Apps.scss';
import SignupPage from './pages/SignupPage';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PostsPage from './pages/PostsPage';

function App() {

  const token = sessionStorage.getItem('token')
  

  return (
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route path='/' exact component={Homepage}/>
        <Route path='/signup' component={SignupPage}/>
        {/* {token != undefined ? <Redirect from='/login' to='/profile'/> : ''} */}
        <Route path='/login' component={LoginPage}/>
        <Route path='/profile/' exact component={ProfilePage}/>
        <Route path='/profile/:id' render={(rProps) => {return <ProfilePage {...rProps}/>}}/>
        <Route path='/posts' component={PostsPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
