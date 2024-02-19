import React from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { Button } from '@aws-amplify/ui-react'



const Home = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/report");
    }

    return (
        <>
            <Navbar activelink="/" />
            <div className="home-section-wrapper">
                <div className='home-section'>
                    <div className='home-section-title'>
                        <p style={{ fontWeight: '700' }}>LOST AND FOUND</p>
                        <Button variation="primary" onClick={handleClick} className='form-button'>Report Lost Item</Button>
                    </div>
                    <img className="home-section-image" src="/finding.svg" />
                </div>
            </div>
        </>
    );
};

export default Home