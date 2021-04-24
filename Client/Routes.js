import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from './Client/App.jsx';
import Login from './Client/components/Login.jsx'
import Memo from './Client/components/Memo.jsx';
import Questions from './Client/components/Questions.jsx';

export default () => {
    return(
        
        <Switch>
            {/* <Route exact path='/' component={App} /> */}
            <Route path='/questions' component={Questions} />
            <Route path='/memo' component={Memo} />
        </Switch>
    )
}