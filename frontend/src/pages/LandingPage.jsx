
import React from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            {/* Navbar */}
            <nav className='navbar'>
                <div className='navHeader'>
                    <h2>Instant Meet</h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => router("/abcd12")} className='nav-item'>Join as Guest</p>
                    <p onClick={() => router("/auth")} className='nav-item'>Register</p>
                    <div onClick={() => router("/auth")} role='button' className='nav-button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="landingMainContainer">
                <div className='hero-text'>
                    <h1><span className="highlight">Bring </span> your family and friends together with just one click</h1>
                    <p className="subtext">Distance doesn’t matter, stay connected anytime, anywhere.</p>
                    <div role='button' className='get-started'>
                        <Link to="/auth">Get Started</Link>
                    </div>
                </div>
                <div className='hero-image'>
                    <img src="/mobile.png" alt="Instant Meet" />
                </div>
            </div>
        </div>
    );
}

