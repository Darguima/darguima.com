"use client";

import React, { useState, useEffect } from 'react';
import ArrowUp from '@mui/icons-material/KeyboardArrowUp';

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 1.5; // 1.5vh
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null; // Don't render the button if not visible
  }

  return (
    <button
      className='fixed bottom-4 right-4 bg-primary rounded-full p-0.5 shadow-lg cursor-pointer hover:bg-primary-hover transition duration-300 ease-in-out'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp fontSize='large' />
    </button>
  );
}
