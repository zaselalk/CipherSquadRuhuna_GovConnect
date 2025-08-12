import { Link } from "react-router";
import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  MapPin,
  Activity,
  UserCheck,
  Shield,
  Heart,
  Phone,
  Mail,
} from "lucide-react";

interface Stats {
  residents: number;
  households: number;
  divisions: number;
  diseases: number;
}

function LandingPage() {
  const [stats, setStats] = useState<Stats>({
    residents: 0,
    households: 0,
    divisions: 0,
    diseases: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {

        setStats({
          residents: 0,
          households: 0,
          divisions: 0,
          diseases: 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Set default values if API fails
        setStats({
          residents: 1250,
          households: 340,
          divisions: 8,
          diseases: 25,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Katugahahena Hospital
                </h1>
                <p className="text-sm text-gray-600">
                  Sri Lankan Symbol of Rural Health
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Healthcare
                <span className="block text-cyan-500">Innovation..!</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Comprehensive resident health management system providing Access
                your health records and stay connected with our hospital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/resident/login"
                  className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:bg-cyan-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Resident Portal</span>
                </Link>
                <Link
                  to="/admin/login"
                  className="px-8 py-4 bg-white text-cyan-600 font-semibold rounded-xl shadow-lg border-2 border-cyan-500 hover:bg-cyan-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/login_cover.svg"
                alt="Healthcare Illustration"
                className="w-full h-auto max-w-lg object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600">
              Serving our community with comprehensive healthcare management
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-cyan-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {loading ? "..." : stats.residents.toLocaleString()}
              </div>
              <div className="text-gray-600">Registered Residents</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {loading ? "..." : stats.households.toLocaleString()}
              </div>
              <div className="text-gray-600">Households Served</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {loading ? "..." : stats.divisions}
              </div>
              <div className="text-gray-600">Service Divisions</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {loading ? "..." : stats.diseases}
              </div>
              <div className="text-gray-600">Health Conditions Tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions about our services or need assistance? Our team
                is here to help you 24/7.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Emergency Hotline
                    </div>
                    <div className="text-gray-600"> 034 245 576</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Email Support
                    </div>
                    <div className="text-gray-600">help@rhms.live</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Access Your Portal</h3>
              <p className="mb-8 opacity-90">
                Choose your portal to access personalized healthcare services
                and manage your medical information.
              </p>
              <div className="space-y-4">
                <Link
                  to="/resident/login"
                  className="block w-full px-6 py-4 bg-white text-cyan-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-center"
                >
                  <UserCheck className="w-5 h-5 inline mr-2" />
                  Resident Login
                </Link>
                <Link
                  to="/admin/login"
                  className="block w-full px-6 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-colors text-center"
                >
                  <Shield className="w-5 h-5 inline mr-2" />
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Development Team
            </h2>
            <p className="text-lg text-gray-600">
              The talented developers behind this healthcare management system
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Developer 1 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Asela Priyadarshana{" "}
              </h3>
              <p className="text-cyan-600 font-medium mb-3">
                Full Stack Developer
              </p>
              <p className="text-gray-600 text-sm">
                Focused on deployment, infrastructure, and system optimization
              </p>
            </div>

            {/* Developer 2 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">D</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dilukshi Nimasha
              </h3>
              <p className="text-green-600 font-medium mb-3">
                Full Stack Developer
              </p>
              <p className="text-gray-600 text-sm">
                Expert in server-side development and database management
              </p>
            </div>

            {/* Developer 3 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">R</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ravindu Harshana
              </h3>
              <p className="text-purple-600 font-medium mb-3">
                Full Stack Developer
              </p>
              <p className="text-gray-600 text-sm">
                Specialized in frontend development and user experience design
              </p>
            </div>

            {/* Developer 4 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">N</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ashfa Nistar
              </h3>
              <p className="text-orange-600 font-medium mb-3">
                Full Stack Developer
              </p>
              <p className="text-gray-600 text-sm">
                Creating intuitive interfaces and seamless user experiences
              </p>
            </div>
          </div>

          {/* Team Stats */}
          <div className="mt-12 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-600 mb-2">
                  Team CipherSquad
                </div>
                <div className="text-gray-600">Development Team</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  University of Ruhuna
                </div>
                <div className="text-gray-600">Educational Institution</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  2025
                </div>
                <div className="text-gray-600">Project Year</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Katugahahena Hospital</span>
              </div>
              <p className="text-gray-400">
                Providing comprehensive healthcare solutions and resident
                management services for a healthier community.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#services" className="hover:text-white transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <Link
                    to="/resident/login"
                    className="hover:text-white transition"
                  >
                    Resident Portal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Support: 034 245 576</li>
                <li>Email: help@rhms.live</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Katugahahena Hospital. | Developed by
              <a
                href="https://www.example.com"
                className="text-gray-400 hover:text-white transition"
              >
                {" "}
                Team CipherSquad Ruhuna
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
