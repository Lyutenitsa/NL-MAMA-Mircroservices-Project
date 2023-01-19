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
import User from './pages/users/User';
import Topic from "./pages/topics/Topic";
import Articles from "./pages/articles/Articles";
import Article from "./pages/articles/Article";


// Components
import Menubar from './components/Menubar';

// Toast
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewArticle from "./pages/articles/NewArticle";


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

            <Route path='/user/:id?'>
              <User/>
            </Route>


            <Route path='/articles'>
              <Articles/>
            </Route>

            <Route path='/article/:id?'>
              <Article/>
            </Route>

            <Route path='/newArticle'>
              <NewArticle/>
            </Route>

            <Route path='/newTopic'>
              <Topic/>
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