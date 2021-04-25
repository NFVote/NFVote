import React, { Component } from 'react';
import Login from './Login.jsx';
import Questions from './Questions.jsx';
import Memo from './Memo.jsx';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <main>
                <div className="AppComponent">
                    <h1 className="header">NFVote</h1>
                    <Switch>
                    <Route
                        exact
                        path="/"
                        component={() => <Login />}
                    />
                    <Route
                        exact
                        path="/questions"
                        component={() => <Questions />}
                    />
                    <Route
                        exact
                        path="/memo"
                        component={() => <Memo />}
                    />
                    </Switch>
                </div>
            </main>
        )
    }
}

export default App;