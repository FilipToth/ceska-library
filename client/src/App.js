import 'assets/App.css'
import SearchPage from 'pages/SearchPage';
import SearchResultsPage from 'pages/SearchResultsPage';
import LoginPage from 'pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from 'pages/AdminPage';
import { RequireAuth } from 'react-auth-kit';

const App = () => {
    console.log(process.env.PUBLIC_URL);
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
            <Routes>
                <Route exact path='/' element={
                    <SearchPage />
                }></Route>
                <Route path='/results' element={
                    <SearchResultsPage />
                }></Route>
                <Route path='/login' element={
                    <LoginPage />
                }></Route>
                <Route path='/admin' element={
                    <RequireAuth loginPath={'/login'}>
                        <AdminPage />
                    </RequireAuth>
                }> </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;