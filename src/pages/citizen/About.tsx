import React from "react";
import { LandingHeader } from "../../components/features/landing-page/LandingHeader";
import Footer from "../../components/common/Footer";

const AboutPage: React.FC = () => {
  return (
    // Main container for the About page
    <div className="w-screen min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header - full width */}
      <LandingHeader className="w-full" />
      
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">About GovConnect</h1>
        <p className="text-lg md:text-xl max-w-3xl">
          GovConnect is a platform designed to help citizens manage government services,
          appointments, and notifications efficiently. Our mission is to simplify access
          to government resources while keeping you informed in real-time.
        </p>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
        
        {/* Feature 1 */}
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 flex flex-col items-center text-center hover:scale-105 transform transition-transform duration-300">
          <div
            className="w-16 h-16 mb-4 flex items-center justify-center bg-blue-600 text-white rounded-full text-2xl"
            aria-label="Appointments"
          >
            📅
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Appointments</h2>
          <p className="text-gray-600">
            Easily book, view, and manage your appointments with government offices.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 flex flex-col items-center text-center hover:scale-105 transform transition-transform duration-300">
          <div
            className="w-16 h-16 mb-4 flex items-center justify-center bg-indigo-600 text-white rounded-full text-2xl"
            aria-label="Notifications"
          >
            🔔
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Notifications</h2>
          <p className="text-gray-600">
            Receive instant notifications for upcoming appointments and updates.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 flex flex-col items-center text-center hover:scale-105 transform transition-transform duration-300">
          <div
            className="w-16 h-16 mb-4 flex items-center justify-center bg-green-600 text-white rounded-full text-2xl"
            aria-label="Government Services"
          >
            💼
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Government Services</h2>
          <p className="text-gray-600">
            Access a variety of government services and resources directly from one place.
          </p>
        </div>
      </section>

      {/* Footer - full width */}
      <Footer className="w-full" />
    </div>
  );
};

export default AboutPage;
