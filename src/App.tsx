import { BrowserRouter } from "react-router";
import { AdminRoutes } from "./components/routes/AdminRoutes";
import { CitizenRoutes } from "./components/routes/CitizenRoutes";
import { HomePageRouting } from "./components/routes/HomePageRouting";

function App() {
  return (
    <BrowserRouter>
      <HomePageRouting />
      <AdminRoutes />
      <CitizenRoutes />
    </BrowserRouter>
  );
}

export default App;
