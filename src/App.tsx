import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FixedButtons from "./components/FixedButtons";
import { routes } from "./routes";
import "./App.css";

// Loading component for lazy loaded routes
const PageLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
    <p className="text-secondary-light text-lg">Loading...</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app min-h-screen flex flex-col">
        <Header />
        <FixedButtons />
        <div className="main flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {routes.map((route) => {
                const Component = route.element;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<Component />}
                  />
                );
              })}
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
