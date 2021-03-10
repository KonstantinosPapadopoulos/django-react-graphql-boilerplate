import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Users from './views/Users';

class App extends React.Component {
    public render() {
        return (
            <Router>
                <Route exact={true} path="/" component={Users} />
            </Router>
        );
    }
}

export default App;
