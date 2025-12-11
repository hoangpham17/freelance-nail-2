import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConfigProvider } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FixedButtons from "./components/FixedButtons";
import RouteWrapper from "./components/RouteWrapper";
import { routes } from "./routes";
import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <ConfigProvider>
        <Router>
          <div className="app min-h-screen flex flex-col">
            <Header />
            <FixedButtons />
            <div className="main flex-1">
              <Routes>
                {routes.map((route) => {
                  const Component = route.element;
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <RouteWrapper>
                          <Component />
                        </RouteWrapper>
                      }
                    />
                  );
                })}
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
