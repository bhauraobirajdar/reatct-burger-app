import React from 'react';
import Hoc from '../../hoc/Hoc';
import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
const Layout = ( props ) => ( 
    <Hoc>
        <Toolbar></Toolbar>
            <main className={classes.Content}>
                {props.children}
            </main>
    </Hoc>
)

export default Layout;

