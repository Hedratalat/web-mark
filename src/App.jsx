import { lazy, Suspense } from "react";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));

const PortfolioDash = lazy(() => import("./pages/PortfolioDash"));
const MessageDash = lazy(() => import("./pages/MessageDash"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const DashboardLayout = lazy(
  () => import("./components/DashboardLayout/DashboardLayout"),
);

//loading
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-accent-light">
    <div className="w-16 h-16 border-4 border-accent-soft border-t-accent-30 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <>
      <HashRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio/:catId" element={<ProjectsPage />} />
            {/* <Route path="admin-login11" element={<AdminLogin />} /> */}{" "}
            <Route
              path="/dashboard"
              element={
                // <ProtectedRoute>
                <DashboardLayout />
                // </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="portfolio" replace />} />
              <Route path="portfolio" element={<PortfolioDash />} />
              <Route path="messages" element={<MessageDash />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
