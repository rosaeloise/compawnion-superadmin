import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
    HashRouter,
    Route,
    Routes
} from 'react-router-dom';

import './css/global.css';

import Login from './pages/Login';
import AddAdminUser from './pages/AddAdminUser';
import Admins from './pages/Admins';

class App extends
    React.Component {
    render() {
        return (
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/login' element={<Login />} />
					<Route path='/admin/add' element={<AddAdminUser />} />
					<Route path='/admins' element={<Admins />} />
                </Routes>
            </HashRouter>
        );
    };
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);