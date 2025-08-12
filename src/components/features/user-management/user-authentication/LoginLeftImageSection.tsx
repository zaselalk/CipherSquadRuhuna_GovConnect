import { FC } from "react";
import { Link } from "react-router";

export const LoginLeftImageSection: FC = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br "></div>

      <div className="relative p-8 lg:p-12">
        {/* Image */}
        <div className="text-center mb-8">
          <img
            src="/images/admin-login.svg"
            alt="Login Cover"
            className="w-full h-auto max-w-md mx-auto"
          />
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Welcome to
            </h2>
            <h3 className="text-xl lg:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Katugahahena Hospital
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Resident Health Monitoring System - Secure staff portal for
              comprehensive healthcare management
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium transition-colors group"
          >
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
