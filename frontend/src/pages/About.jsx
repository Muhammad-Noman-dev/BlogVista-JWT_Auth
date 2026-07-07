import React from 'react';
import about from '../assets/about.png';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Full Image Section with All Content */}
      <div className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <img
          src={about}
          alt="About BlogVista"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/75"></div>

        {/* Content Container */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            About BlogVista
          </h1>

          <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto mb-10">
            BlogVista is a modern blogging platform built to share ideas, knowledge, 
            and creativity in one place. Whether you’re a developer, writer, or learner, 
            BlogVista gives you a clean and simple space to express yourself without distractions.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 text-left max-w-3xl mx-auto mb-12">
            <div className="flex items-start gap-3 text-gray-100">
              <span className="text-xl mt-1">◆</span>
              <p>Simple and clean user experience</p>
            </div>
            <div className="flex items-start gap-3 text-gray-100">
              <span className="text-xl mt-1">◆</span>
              <p>Fast and responsive design</p>
            </div>
            <div className="flex items-start gap-3 text-gray-100">
              <span className="text-xl mt-1">◆</span>
              <p>Easy blog creation and sharing</p>
            </div>
            <div className="flex items-start gap-3 text-gray-100">
              <span className="text-xl mt-1">◆</span>
              <p>Secure authentication system</p>
            </div>
            <div className="flex items-start gap-3 text-gray-100 sm:col-span-2 justify-center">
              <span className="text-xl mt-1">◆</span>
              <p>Modern interface for better reading experience</p>
            </div>
          </div>

          {/* Our Mission - Now Inside Image */}
          <div className="max-w-3xl mx-auto pt-6 border-t border-white/30">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-100 leading-relaxed">
              We believe everyone has a story worth sharing. BlogVista was created to 
              remove barriers between writers and readers — making blogging fast, 
              beautiful, and enjoyable for all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;