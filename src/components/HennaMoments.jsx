import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HennaMoments = () => {
  const images = Array.from({ length: 50 }, (_, index) => `https://picsum.photos/seed/${index}/300/200`);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [isHovering]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-4">Henna Moments</h2>
        <p className="text-center mb-8">Follow our instagram page for more @hennabyfathima</p>
        <div 
          className="relative h-0 pb-[20%] overflow-hidden"
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
              {images.slice(currentIndex, currentIndex + 6).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Henna Moment ${currentIndex + index + 1}`}
                  className="h-full w-1/6 object-cover"
                />
              ))}
            </motion.div>
          </AnimatePresence>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 transition-opacity duration-300 opacity-0 hover:opacity-100"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-6 h-6 text-green-800" />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 transition-opacity duration-300 opacity-0 hover:opacity-100"
            onClick={handleNext}
          >
            <ChevronRight className="w-6 h-6 text-green-800" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HennaMoments;