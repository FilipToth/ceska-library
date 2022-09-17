import SearchPage from './SearchPage/SearchPage';
import SearchResultsPage from './SearchResults/SearchResultsPage';
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 

const App = () => {
    return (
        <Router>
            <div className='App-Container'>
                <Switch>
                    <Route exact path='/'>
                        <SearchPage />
                    </Route>
                    <Route path='/results'>
                        <SearchResultsPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;