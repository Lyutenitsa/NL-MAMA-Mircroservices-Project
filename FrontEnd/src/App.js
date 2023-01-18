// React
import React from 'react';

// Router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Error from './pages/Error';
import Logout from './pages/Logout';
import HomeScreen from './pages/homescreen/homeScreen';
import Register from './pages/Register';


// Components
import Menubar from './components/Menubar';

// Toast
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Article from "./pages/articles/Article";


const App = () => {

  return (
      <Router>
        <ToastContainer/>
        <Menubar/>

        <div className='container mt-6'>
          <Switch>
            <Route exact path='/'>
              <Login/>
            </Route>

            <Route path='/login'>
              <Login/>
            </Route>

            <Route path='/articles'>
              <Article/>
            </Route>

            <Route path='/register'>
              <Register/>
            </Route>

            <Route path='/homescreen'>
              <HomeScreen/>
            </Route>

            <Route path='/logout'>
              <Logout/>
            </Route>

            <Route path='*'>
              <Error/>
            </Route>

          </Switch>
        </div>
      </Router>
  )
}

export default App;