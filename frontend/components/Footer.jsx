import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between items-center gap-2'>
        <p>© All Rights Reserved 2024.</p>
        <div className='flex items-center gap-4 text-2xl'>
          <a href='https://facebook.com/yourpage' aria-label='Facebook' target='_blank' rel='noopener noreferrer' className='hover:text-blue-500 transition'>
            <FaFacebook />
          </a>
          <a href='https://instagram.com/yourprofile' aria-label='Instagram' target='_blank' rel='noopener noreferrer' className='hover:text-pink-500 transition'>
            <FaInstagram />
          </a>
          <a href='https://linkedin.com/in/yourprofile' aria-label='LinkedIn' target='_blank' rel='noopener noreferrer' className='hover:text-blue-700 transition'>
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
