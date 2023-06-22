import React from 'react';
import logo from '../../../../public/logo.png'
const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-base-200 text-base-content">
  <div>
    <img src={logo} alt="logo" className='h-16 w-16 rounded-full' />
    <p>Sports Academies <br/>Providing reliable tech since 1992</p>
  </div> 
  <div>
    <span className="footer-title">Contact Info</span> 
    <a className="link link-hover">Phone: +88 018 785 4589</a> 
    <a className="link link-hover">Email:  devitems@email.com</a> 
    <a className="link link-hover">Address: ur address goes here,street.</a> 
    


  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <a className="link link-hover">About us</a> 
    <a className="link link-hover">Contact</a> 
    <a className="link link-hover">Jobs</a> 
    <a className="link link-hover">Press kit</a>
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <a className="link link-hover">Terms of use</a> 
    <a className="link link-hover">Privacy policy</a> 
    <a className="link link-hover">Cookie policy</a>
  </div>
</footer>
<div className="footer footer-center p-4 bg-base-300 text-base-content">
  <div>
    <p>Copyright © 2023 - All right reserved by Rakib Molla</p>
  </div>
</div>
        </div>
    );
};

export default Footer;