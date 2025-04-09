// const Hero = () => {
//     return (
//       <section className="bg-blue-50 py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-9xl font-bold text-blue-800 mb-4">
//             Welcome to Assetosphere
//           </h1>
//           <p className="text-lg text-gray-700 mb-6">
//             The ultimate platform for organizing and managing your digital assets.
//           </p>
//           <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
//             Get Started
//           </button>
//         </div>
//       </section>
//     )
//   }

//   export default Hero
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-400"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-300"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-purple-400"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Never Lose Track of Your <span className="text-blue-300">Assets</span> Again
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
            Assetosphere helps you manage warranties, service dates, and insurance for all your valuable items in one place.
          </p>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
            <Link to="/signup" className="bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-100 transition-colors duration-200 shadow-lg">
              Get Started
            </Link>
            <Link to="/about" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors duration-200">
              Learn More
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-xl font-medium mb-2">Track Warranties</h3>
              <p className="text-blue-100">Upload bills and track warranty periods for all your household items.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="text-xl font-medium mb-2">Timely Reminders</h3>
              <p className="text-blue-100">Get notifications before warranties expire or service dates approach.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-xl font-medium mb-2">Insurance Options</h3>
              <p className="text-blue-100">Explore extended coverage options when your warranties expire.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;