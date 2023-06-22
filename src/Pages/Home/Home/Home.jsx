import React from 'react';
import Slider from '../Slider/Slider';
import PopularClassSection from '../PopularClassSection/PopularClassSection';
import { Fade, Slide } from "react-awesome-reveal";
import LearnSection from '../LearnSection/LearnSection';

const Home = () => {
    return (
        <>
            <Slider></Slider>
            <PopularClassSection></PopularClassSection>
            <Slide>
                <h1 className='text-center my-10 font-bold text-4xl px-10'> Online Sports Academy is an online platform for physical <span className='text-pink-500'>Education</span>, <br /> coaches & trainers, sports associations and clubs that offers support in training..... </h1>
            </Slide>
            <LearnSection></LearnSection>
        </>
    );
};

export default Home;