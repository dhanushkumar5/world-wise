import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import City from "./components/City";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/LogAuthContext";
import ProtectRoute from "./pages/ProtectRoute";

export default function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="Login" element={<Login />} />
            <Route
              path="/app"
              element={
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            {/* <Route path='*' element={<PageNotFound />}/> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}
