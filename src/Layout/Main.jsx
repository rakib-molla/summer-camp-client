import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const Main = () => {
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <div>
            { noHeaderFooter || <NavBar></NavBar> }
            <Outlet></Outlet>
           { noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;