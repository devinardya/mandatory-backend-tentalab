import React from 'react';
import logoicon from '../Image/toodo-logo.svg';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {Link} from 'react-router-dom';
import './home.scss';

const Home = () => {
    
    return <HelmetProvider>
                <Helmet>
                    <title>Welcome to Toodo</title>
                </Helmet>
                <div className="home-block">
                    <figure className="home-block-logo">
                            <img src={logoicon} alt="toodo logo" />
                        </figure>
                        <div className="home-block-text">
                            <h1>organize,</h1>
                            <h1>prioritize,</h1>
                            <h1>and get more done</h1>
                        </div>
                        <Link to="/login" className="home-block-link">Get started</Link>
                </div>
           </HelmetProvider>
}

export default Home;