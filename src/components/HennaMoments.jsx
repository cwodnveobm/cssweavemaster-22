import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HennaMoments = () => {
  const imageUrls = [
    "https://i.ibb.co/C1cFHfH/Whats-App-Image-2024-12-07-at-23-45-16-d0897369.jpg",
    "https://i.ibb.co/ZhwWrbk/IMG-7475.jpg",
    "https://i.ibb.co/CVwqgwf/IMG-7693.jpg"
    
  ];
  const totalImages = 3;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
      }
    }, 3000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [isHovering]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">Henna Moments</h2>
        <p className="text-center mb-8 sm:mb-12 text-sm sm:text-base text-gray-600">
          Follow our instagram page{' '}
          <a 
            href="https://www.instagram.com/hennabyfathima__/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-green-800 hover:text-green-600 transition-colors font-semibold"
          >
            @hennabyfathima__
          </a>
        </p>
        <div 
          className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-lg"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              className="absolute top-0 left-0 w-full h-full flex"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(isMobile ? 3 : 6)].map((_, index) => (
                <img
                  key={index}
                  src={imageUrls[(currentIndex + index) % imageUrls.length]}
                  alt={`Henna Moment ${currentIndex + index + 1}`}
                  className={`h-full ${isMobile ? 'w-1/3' : 'w-1/6'} object-cover`}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2 transition-opacity duration-300 opacity-0 hover:opacity-100 focus:opacity-100 z-10"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-green-800" />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2 transition-opacity duration-300 opacity-0 hover:opacity-100 focus:opacity-100 z-10"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-green-800" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HennaMoments;
