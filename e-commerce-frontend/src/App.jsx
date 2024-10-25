import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import AdminLayout from './pages/AdminDashboard';
import AdminDashboard from './pages/AdminDashboard/Home';
import AdminCategories from './pages/AdminDashboard/Categories';
import AdminOrders from './pages/AdminDashboard/Orders';
import RequireAuth from './components/RequireAuth';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import { useAuth } from './context/AuthContext';
import Loader from './components/Loader';
import WildCard from './pages/WildCard';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import AdminLogin from './pages/AdminLogin';

function App() {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loader />;
  }
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <UserLogin />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace /> : <UserSignup />}
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          } />
          <Route path="/user" element={user && user.role === "user" ?
            <RequireAuth>
              <UserProfile />
            </RequireAuth> : <Navigate to="/" replace />
          } />

          <Route
            path="/admin"
            element={
              user && user.role === "admin" ? (
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/admin/categories"
            element={
              user && user.role === "admin" ? (
                <AdminLayout>
                  <AdminCategories />
                </AdminLayout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/admin/orders"
            element={
              user && user.role === "admin" ? (
                <AdminLayout>
                  <AdminOrders />
                </AdminLayout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route path="/admin/login" element={user ? <Navigate to="/" replace /> : <AdminLogin />} />

          <Route path="*" element={<WildCard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
