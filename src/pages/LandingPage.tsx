import { LandingHeader } from "../components/features/landing-page/LandingHeader";
import { LandingHero } from "../components/features/landing-page/LandingHero";
import { LandingGovServices } from "../components/features/landing-page/LandingGovServices";
import { LandingStatictics } from "../components/features/landing-page/LandingStatictics";
import { LandingContact } from "../components/features/landing-page/LandingContact";
import { LandingFooter } from "../components/features/landing-page/LandingFooter";

/**
 * Landing page component for GovConnect
 * This component serves as the main entry point for the application, showcasing government services, statistics,
 * @returns Landing page component for GovConnect
 */
function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <LandingHeader />
      <LandingHero />
      <LandingGovServices />
      <LandingStatictics />
      <LandingContact />
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
