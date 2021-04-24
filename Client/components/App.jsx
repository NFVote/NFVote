import React, { Component } from 'react';
import Login from './Login.jsx';

class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <main>
                <div className="AppComponent">
                    <h1 className="header">NFVote</h1>
                    <Login />
                </div>
            </main>
        )
    }
}

export default App;