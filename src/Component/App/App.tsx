import React, { Fragment } from 'react';
import { Navbar } from 'react-bootstrap';
import Search from '../Search/Search';

const App: React.FC = () => {
    
    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand >
                    Github User Details
            </Navbar.Brand>
            </Navbar>
            <Search />
        </Fragment>
    )
};

export default App;