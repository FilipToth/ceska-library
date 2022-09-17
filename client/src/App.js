import Search from './Search'
import SearchResults from './SearchResults';
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 

function App() {
    
    return (
        <Router>
            <div className='App-Container'>
                <Switch>
                    <Route exact path='/'>
                        <Search />
                    </Route>
                    <Route path='/results'>
                        <SearchResults />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;