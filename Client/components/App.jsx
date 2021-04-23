const React = require('react');


class App extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <main>
                <div className="AppComponent">
                    <h1 className="header">Am I saying it right?</h1>
                </div>
            </main>
        )
    }
}

export default App;