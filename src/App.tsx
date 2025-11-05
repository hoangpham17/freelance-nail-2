import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import HostAParty from "./pages/HostAParty/HostAParty";
import Gallery from "./pages/Gallery/Gallery";
import AboutUs from "./pages/AboutUs/AboutUs";
import OurPolicies from "./pages/OurPolicies/OurPolicies";
import { PATHS } from "./routes/Routes";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path={PATHS.home} element={<Home />} />
            <Route path={PATHS.services} element={<Services />} />
            <Route path={PATHS.hostAParty} element={<HostAParty />} />
            <Route path={PATHS.gallery} element={<Gallery />} />
            <Route path={PATHS.aboutUs} element={<AboutUs />} />
            <Route path={PATHS.ourPolicies} element={<OurPolicies />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
