import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";



// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import slider1 from '../../../assets/slider/slider1.jpg';
import slider2 from '../../../assets/slider/slider2.jpg';
import slider3 from '../../../assets/slider/slider3.jpg';
import slider4 from '../../../assets/slider/slider4.jpg';
import { Link } from "react-router-dom";

const Slider = () => {

    return (
        <>
            <div className="mt-32 h-96">

                <Swiper
        slidesPerView={1}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        scrollbar={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="mt-30">
           <div className="relative">
            <img src={slider4} />
                <div className="absolute left-10 top-20 p-10">
                        <h1 className="font-bold text-4xl text-blue-400">EXCLUSIVE Pre-season Tryout in Second Division RFEFPRE-SEASON IN SECOND DIVISION RFEF OR PREFERRED OF SPAIN</h1>
                        <p className="text-gray-500">In addition, if you were born in 2005/2006/2007 you could be able to make a pre-season with UD Alzira Youth Team in Division de Honor League (highest category of the youth league in Spain).</p>
                </div>
           </div>
        </SwiperSlide>
        
        <SwiperSlide>
        <div className="relative">
            <img src={slider3} />
                <div className="absolute right-20 bottom-20">
                       <Link className=" bg-black text-white py-3 px-5 rounded-lg hover:bg-pink-400">Join Now</Link>
                </div>
           </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider1}/>
        </SwiperSlide>
      </Swiper>
            </div>
        </>
    );
};

export default Slider;