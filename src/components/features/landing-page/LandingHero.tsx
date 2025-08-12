import { Shield, UserCheck } from "lucide-react"
import { Link } from "react-router"

export const LandingHero = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Government Services
                            <span className="block text-blue-600">Simplified!</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Access all government services from one convenient platform. Apply for documents,
                            pay bills, track applications, and connect with government departments seamlessly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/resident/login"
                                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <UserCheck className="w-5 h-5" />
                                <span>Citizen Portal</span>
                            </Link>
                            <Link
                                to="/admin/login"
                                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <Shield className="w-5 h-5" />
                                <span>Officer Portal</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <img
                            src="/images/landing-cover.svg"
                            alt="Government Services Illustration"
                            className="w-full h-auto max-w-lg object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
