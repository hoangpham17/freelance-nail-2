import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConfigProvider } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FixedButtons from "./components/FixedButtons";
import RouteWrapper from "./components/RouteWrapper";
import { routes } from "./routes";
import NotFound from "./pages/NotFound";
import "./App.css";
import { useCampaignStore } from "./shared/store/campaignStore";
import { useScreen } from "./hooks/useScreen";
import { useMemo } from "react";

function App() {
  const { isDesktop } = useScreen();
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );

  const baseOffset = isDesktop ? 100 : 64;
  const mainMarginTop = useMemo(() => {
    if (showCampaignBar) {
      return baseOffset + campaignBarHeight;
    }
    return baseOffset;
  }, [showCampaignBar, baseOffset, campaignBarHeight]);

  return (
    <HelmetProvider>
      <ConfigProvider>
        <Router>
          <div className="app min-h-screen flex flex-col">
            <Header />
            <FixedButtons />
            <div
              className="main flex-1"
              style={{ marginTop: `${mainMarginTop}px` }}
            >
              <Routes>
                {routes
                  .filter((route) => route.path !== "*")
                  .map((route) => {
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
                {/* 404 Route - must be last */}
                <Route
                  path="*"
                  element={
                    <RouteWrapper>
                      <NotFound />
                    </RouteWrapper>
                  }
                />
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
