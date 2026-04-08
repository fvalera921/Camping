import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute.jsx";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AccommodationDetailPage from "./pages/AccommodationDetailPage.jsx";
import AccommodationsPage from "./pages/AccommodationsPage.jsx";
import ActivitiesPage from "./pages/ActivitiesPage.jsx";
import AlberguePage from "./pages/AlberguePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ApartamentosPage from "./pages/ApartamentosPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LocationPage from "./pages/LocationPage.jsx";
import ParcelasPage from "./pages/ParcelasPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ReservasPage from "./pages/ReservasPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/parcelas" element={<ParcelasPage />} />
        <Route path="/apartamentos" element={<ApartamentosPage />} />
        <Route path="/albergue" element={<AlberguePage />} />
        <Route path="/actividades" element={<ActivitiesPage />} />
        <Route path="/localizacion" element={<LocationPage />} />
        <Route path="/reservas" element={<ReservasPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/alojamientos" element={<AccommodationsPage />} />
        <Route path="/alojamientos/:id" element={<AccommodationDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
