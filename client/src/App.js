import 'assets/App.css'
import SearchPage from 'pages/SearchPage';
import SearchResultsPage from 'pages/SearchResultsPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <SearchPage />
                </Route>
                <Route path='/results'>
                    <SearchResultsPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;