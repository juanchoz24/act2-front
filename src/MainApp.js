import React from 'react';
import { AppRouter } from './router/AppRouter.js';
import { Header } from './components/Header.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Home } from './components/Home.js';
import { Footer } from './components/Footer.js';

export const MainApp = () => {
    return(<>
    <Header/>
    <Footer/>
    
    </>
        
    )
};