import React from "react";
import { LandingHeader } from "../components/features/landing-page/LandingHeader";
import Footer from "../components/common/Footer";

const AboutPage: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="w-full bg-gray-100 text-gray-900 py-28 px-4 flex flex-col items-center text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            About GovConnect
          </h1>
          <p className="text-lg md:text-xl mb-4">
            GovConnect is your one-stop platform for managing all government
            interactions efficiently. Whether it’s booking appointments,
            tracking notifications, or accessing public services, we aim to make
            government resources accessible to everyone.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto">
        {/* Feature 1 */}
        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transform transition-transform duration-300">
          <div className="w-20 h-20 mb-5 flex items-center justify-center bg-blue-600 text-white rounded-full text-3xl">
            📅
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">
            Appointments
          </h2>
          <p className="text-gray-600">
            Schedule, view, and manage appointments with government offices
            easily. Get reminders so you never miss an important date.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transform transition-transform duration-300">
          <div className="w-20 h-20 mb-5 flex items-center justify-center bg-indigo-600 text-white rounded-full text-3xl">
            🔔
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">
            Notifications
          </h2>
          <p className="text-gray-600">
            Receive real-time alerts for appointments, deadlines, or service
            updates. Stay informed without the hassle.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transform transition-transform duration-300">
          <div className="w-20 h-20 mb-5 flex items-center justify-center bg-green-600 text-white rounded-full text-3xl">
            💼
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">
            Government Services
          </h2>
          <p className="text-gray-600">
            Access a variety of public services, download official documents,
            and track applications—all in one secure platform.
          </p>
        </div>
      </section>

      {/* Why GovConnect Section */}
      <section className="w-full bg-gray-50 py-20 px-4 flex flex-col items-center text-center">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
          Why Choose GovConnect?
        </h2>
        <p className="text-lg md:text-xl max-w-4xl mb-6 text-gray-700">
          GovConnect is designed with citizens in mind. Our intuitive interface
          ensures everyone, regardless of tech experience, can access government
          resources effortlessly. We prioritize security, transparency, and
          efficiency.
        </p>
        <div className="flex flex-col md:flex-row gap-8 mt-8 max-w-5xl">
          <div className="bg-white p-6 rounded-xl shadow-md flex-1">
            <h3 className="text-2xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">
              All your data is encrypted and handled with utmost privacy and
              care.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md flex-1">
            <h3 className="text-2xl font-semibold mb-2">Time-Saving</h3>
            <p className="text-gray-600">
              No more waiting in long queues. Manage everything online.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md flex-1">
            <h3 className="text-2xl font-semibold mb-2">User-Friendly</h3>
            <p className="text-gray-600">
              Clean, simple interface designed for all age groups and abilities.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
