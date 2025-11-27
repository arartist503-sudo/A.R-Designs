import React from 'react';
import { Design } from '../types';

interface DesignCardProps {
  design: Design;
  onOrder: (design: Design) => void;
}

const DesignCard: React.FC<DesignCardProps> = ({ design, onOrder }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        <img
          src={design.imageUrl}
          alt={design.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-gray-800 shadow-sm">
          {design.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-bold text-gray-900 leading-tight">
            {design.title}
          </h3>
          <span className="text-lg font-semibold text-primary">
            ${design.price}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
          {design.description}
        </p>
        
        <button
          onClick={() => onOrder(design)}
          className="w-full py-3 bg-gray-900 text-white font-medium text-sm tracking-wider uppercase rounded-lg hover:bg-primary transition-colors focus:ring-4 focus:ring-primary/20"
        >
          Customize & Order
        </button>
      </div>
    </div>
  );
};

export default DesignCard;