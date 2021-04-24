const React = require('react');
import Login from './Login.jsx';


class App extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <main>
                <div className="AppComponent">
                    <h1 className="header">Am I saying it right?</h1>
                    <Login />
                </div>
            </main>
        )
    }
}

export default App;