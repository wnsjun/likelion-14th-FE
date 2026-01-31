import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import ColorTest from './components/common/ColorTest';
import Home from './pages/Home';
import Events from "./pages/Events";
import Archive from "./pages/Archive";
import Recruiting from "./pages/Recruiting";
import ApplyEnd from "./pages/ApplyEnd";
import ApplyCheckPage from "./pages/applycheck/ApplyCheckPage";
import FAQ from "./pages/FAQ";
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import PrivateRoute from './components/admin/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. 레이아웃이 필요한 페이지들 (그룹으로 묶음) */}
        <Route element={<Layout />}>
          <Route path="/color-test" element={<ColorTest />} />
          <Route path="/events" element={<Events />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/recruiting" element={<Recruiting />} />
          <Route path="/apply-end" element={<ApplyEnd />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>

        {/* 2. 레이아웃이 필요 없는 페이지 (그룹 밖으로 뺌) */}
        <Route path="/" element={<Home />} />
        <Route path="/apply-check" element={<ApplyCheckPage />} />
        <Route path="/admin">
          <Route path="login" element={<AdminLoginPage />} />
          <Route 
            path="dashboard" 
            element={
              <PrivateRoute>
                <AdminDashboardPage />
              </PrivateRoute>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
