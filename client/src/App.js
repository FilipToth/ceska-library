import SearchPage from './SearchPage';
import SearchResultsPage from './SearchResultsPage';
import './App.css'
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