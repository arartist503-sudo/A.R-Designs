import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DesignCard from './components/DesignCard';
import OrderModal from './components/OrderModal';
import AdminDashboard from './components/AdminDashboard';
import { Design, Order } from './types';
import { getDesigns, saveDesign, getOrders, saveOrder } from './services/storageService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [designs, setDesigns] = useState<Design[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Selection State
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Load initial data
  useEffect(() => {
    setDesigns(getDesigns());
    setOrders(getOrders());
  }, []);

  const handlePlaceOrder = (order: Order) => {
    saveOrder(order);
    setOrders(prev => [order, ...prev]);
    setSelectedDesign(null);
    alert(`Thank you, ${order.customerName}! Your order has been placed.`);
  };

  const handleAddDesign = (newDesign: Design) => {
    saveDesign(newDesign);
    setDesigns(prev => [newDesign, ...prev]);
  };

  const filteredDesigns = selectedCategory === 'All' 
    ? designs 
    : designs.filter(d => d.category === selectedCategory);

  const categories = ['All', 'Wedding', 'Birthday', 'Corporate', 'Party'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} />

      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            {/* Hero Section */}
            <div className="relative bg-secondary py-24 sm:py-32">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2000&auto=format&fit=crop"
                  alt="Background"
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Curated Invitations for Life's Moments
                </h1>
                <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                  Browse our exclusive collection of hand-crafted designs. 
                  Customize effortlessly with our AI assistant.
                </p>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Latest Collections</h2>
                
                <div className="mt-4 sm:mt-0 flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredDesigns.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDesigns.map((design) => (
                    <DesignCard 
                      key={design.id} 
                      design={design} 
                      onOrder={setSelectedDesign} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-lg border border-gray-100">
                  <p className="text-gray-500 text-lg">No designs found in this category.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <AdminDashboard orders={orders} onAddDesign={handleAddDesign} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-serif text-xl font-bold text-gray-900">A.R <span className="text-primary">Designs</span></span>
            <p className="text-sm text-gray-500 mt-1">© 2024 All rights reserved.</p>
          </div>
          <div className="text-sm text-gray-400">
            Powered by Google Gemini
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedDesign && (
        <OrderModal
          design={selectedDesign}
          onClose={() => setSelectedDesign(null)}
          onSubmit={handlePlaceOrder}
        />
      )}
    </div>
  );
};

export default App;