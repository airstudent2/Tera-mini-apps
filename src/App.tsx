import React, { useState, useEffect } from 'react';
import { Play, Share2, Info, Search } from 'lucide-react';
import { AdPlaceholder } from './components/AdPlaceholder';

function App() {
  // ডিফল্ট আইডি হিসেবে একটা রাখা হয়েছে, কিন্তু URL এ আইডি থাকলে সেটা লোড হবে
  const [videoId, setVideoId] = useState('106bJ88wXH93-jzVJFuljSw');
  const [inputVideoId, setInputVideoId] = useState('');

  // URL থেকে আইডি চেক করার লজিক
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setVideoId(id);
      setInputVideoId(id);
    }
  }, []);

  const handlePlay = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVideoId.trim()) {
      setVideoId(inputVideoId.trim());
      // URL আপডেট করে দেয় যাতে রিফ্রেশ করলে ভিডিও না হারায়
      window.history.pushState({}, '', `?id=${inputVideoId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Play size={20} fill="currentColor" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">TeraPlayer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="w-full flex justify-center">
          <AdPlaceholder className="w-full max-w-[728px] h-[90px]" label="Top Banner Ad" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  src={`https://terabox.beer/watch/${videoId}`}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title="Video Player"
                />
              </div>
              
              <div className="p-4 sm:p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">Video ID: {videoId}</h2>
                <form onSubmit={handlePlay} className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Search size={18} />
                    </div>
                    <input
                      type="text"
                      value={inputVideoId}
                      onChange={(e) => setInputVideoId(e.target.value)}
                      placeholder="Paste Video ID here..."
                      className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                    Play
                  </button>
                </form>
              </div>
            </div>
            <AdPlaceholder className="w-full h-[250px]" label="Content Ad" />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 text-center">
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase">Sponsored Content</h3>
              <AdPlaceholder className="w-full h-[250px] mb-4" label="Sidebar Ad 1" />
              <AdPlaceholder className="w-full h-[400px]" label="Sidebar Ad 2" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;