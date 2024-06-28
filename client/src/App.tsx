import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./utils/ProtectedRoutes";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import { Provider } from "react-redux";
import { store } from "./store";
import { AppLayout } from "./components/layout";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/signup" element={<Registration />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
