import React from 'react';

import Navbar from '../components/Navbar';
import UploadForm from '../components/uploadForm';


const Home = () => {

    return (
        <div>
            <Navbar activelink="/report" />
            <h1 className='mb-5'>Report Lost and Found</h1>
            <UploadForm />
        </div>
    );
};

export default Home