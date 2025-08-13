import { BrowserRouter } from "react-router";
import { AdminRoutes } from "./components/routes/AdminRoutes";
import { ResidentRoutes } from "./components/routes/CitizenRoutes";
import { HomePageRouting } from "./components/routes/HomePageRouting";

function App() {
  return (
    <BrowserRouter>
      {/* 
        / - landing page 
      */}
      <HomePageRouting />

      {/* 
        /admin - admin routes 
          - /admin/login -> admin login page
          - /admin/dashboard -> admin dashboard
          - /admin/profile -> admin profile
          - /admin/residents -> admin residents management
          - /admin/diseases -> admin diseases management
          - /admin/clinics -> admin clinics management
          - /admin/users -> manage admin users
          - /admin/households - manage households
      */}
      <AdminRoutes />

      {/* 
        /resident - resident routes 
          -  /resident/login - resident login
          -  /resident/dashboard - resident dashboard
      */}
      <ResidentRoutes />
    </BrowserRouter>
  );
}

export default App;
