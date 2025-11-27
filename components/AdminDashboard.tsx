import React, { useState, useEffect } from 'react';
import { Design, Order } from '../types';
import { generateCardDescription } from '../services/geminiService';

interface AdminDashboardProps {
  orders: Order[];
  onAddDesign: (design: Design) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, onAddDesign }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'upload'>('upload');
  
  // Upload Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Design['category']>('Wedding');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Stores base64 or URL
  const [description, setDescription] = useState('');
  const [isProcessingAI, setIsProcessingAI] = useState(false);

  // File handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDescription = async () => {
    if (!title) {
      alert("Please enter a title first.");
      return;
    }
    setIsProcessingAI(true);
    // If imageUrl starts with data:, it's base64, suitable for Gemini vision
    const isBase64 = imageUrl.startsWith('data:');
    const desc = await generateCardDescription(
      title, 
      category, 
      isBase64 ? imageUrl : undefined
    );
    setDescription(desc);
    setIsProcessingAI(false);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !imageUrl) return;

    const newDesign: Design = {
      id: Date.now().toString(),
      title,
      category,
      price: parseFloat(price),
      imageUrl,
      description: description || "Exclusive design by A.R Designs",
      createdAt: Date.now(),
    };
    
    onAddDesign(newDesign);
    alert('Design published successfully!');
    // Reset form
    setTitle('');
    setPrice('');
    setImageUrl('');
    setDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Owner Dashboard</h1>
        <div className="mt-4 flex md:mt-0 md:ml-4 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'upload' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Upload New Design
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'orders' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            View Orders ({orders.length})
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1 bg-gray-50 p-6 border-r border-gray-100">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Design Preview</h3>
              <p className="mt-1 text-sm text-gray-500">
                This is how your design will appear in the gallery.
              </p>
              
              <div className="mt-6">
                {imageUrl ? (
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img src={imageUrl} alt="Preview" className="w-full h-auto object-cover" />
                  </div>
                ) : (
                  <div className="h-48 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                    No image selected
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2 p-6">
              <form onSubmit={handlePublish}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">Design Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    >
                      <option>Wedding</option>
                      <option>Birthday</option>
                      <option>Corporate</option>
                      <option>Party</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Design Image</label>
                    <div className="mt-1 flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      />
                      <span className="text-xs text-gray-500">OR</span>
                      <input 
                        type="text" 
                        placeholder="Paste Image URL"
                        value={imageUrl.startsWith('data:') ? '' : imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <button
                        type="button"
                        onClick={handleGenerateDescription}
                        disabled={isProcessingAI || !title}
                        className="text-xs text-primary font-bold hover:text-orange-600 disabled:opacity-50 flex items-center"
                      >
                         {isProcessingAI ? 'Generating...' : '✨ Generate with AI'}
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Publish Design
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No orders received yet.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li key={order.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{order.customerName}</h4>
                      <p className="text-sm text-gray-500">{order.customerEmail}</p>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Design:</span> {order.designTitle} | 
                        <span className="font-semibold ml-2">Date:</span> {order.eventDate}
                      </div>
                      <div className="mt-2 bg-gray-100 p-2 rounded text-sm text-gray-700 italic">
                        "{order.customMessage}"
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">${order.totalPrice}</div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;