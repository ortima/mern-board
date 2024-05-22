import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './pages/Home';
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./utils/ProtectedRoutes";
import Registration from "./pages/Registration";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}
export default App;
