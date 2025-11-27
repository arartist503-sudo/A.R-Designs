import React from 'react';

interface NavbarProps {
  currentView: 'home' | 'admin';
  setView: (view: 'home' | 'admin') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setView('home')}>
            <span className="font-serif text-3xl font-bold text-gray-900 tracking-tight">
              A.R <span className="text-primary">Designs</span>
            </span>
          </div>
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => setView('home')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentView === 'home'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setView('admin')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentView === 'admin'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Owner Portal
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;