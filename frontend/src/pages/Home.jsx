import React from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={home}
        alt="BlogVista"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h3 className="text-xl md:text-2xl font-medium text-gray-200 tracking-widest mb-4">
          Effective Blogs • New Blogs Everyday
        </h3>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
          Welcome To <span className="text-blue-400">BlogVista</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto mb-10">
          Share your thoughts, discover amazing stories, and connect with a community of writers and readers.
        </p>

        <button
          onClick={() => navigate('/blogs')}
          className="bg-white text-gray-900 font-semibold text-lg px-10 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-95"
        >
          VISIT BLOGS
        </button>
      </div>
    </div>
  );
};

export default Home;