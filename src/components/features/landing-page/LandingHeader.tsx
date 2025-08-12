import { Link } from "react-router"

/**
 * Header component for the landing page of GovConnect
 * @returns Header component for the landing page
 */
export const LandingHeader = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">G</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    GovConnect
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Your Gateway to Government Services
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
