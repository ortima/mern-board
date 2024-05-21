import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './pages/Home';
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
        </Route>
        <Route path="/registration" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
