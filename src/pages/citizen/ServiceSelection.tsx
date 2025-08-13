 // adjust path

import CommonNav from "../../components/common/CommonNav";
import { LandingGovServices } from "../../components/features/landing-page/LandingGovServices";
//import { LandingHeader } from "../../components/features/landing-page/LandingHeader";

/**
 * Service Selection Page wrapper
 * This component serves as the page container for selecting government services.
 * @returns ServiceSelectionPage component inside a styled container
 */
function ServiceSelectionWrapper() {
  return (
    
    <div className="min-h-screen bg-gray-50">
        <CommonNav/>
      <LandingGovServices />
    </div>
  );
}

export default ServiceSelectionWrapper;
