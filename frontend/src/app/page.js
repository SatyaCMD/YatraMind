'use client';
import SearchContainer from '../components/search/SearchContainer';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section Container */}
      <div className="relative w-full text-center pt-12 pb-32 rounded-b-[40px] overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-900 z-0 mt-[-20px]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay -z-10"></div>
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
            Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Adventure</span>
          </h1>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto font-medium drop-shadow">
            Book flights, hotels, and experiences with AI-powered personalized recommendations.
          </p>
        </div>
      </div>

      {/* Search Modules Container */}
      <div className="w-full mt-[-80px] z-20">
         <SearchContainer />
      </div>
    </div>
  );
}
