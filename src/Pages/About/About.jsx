import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {

    return (
        <div>
            <Helmet>
                <title>About</title>
            </Helmet>
            <h1 className='text-5xl'>about page</h1>
        </div>
    );
};

export default About;